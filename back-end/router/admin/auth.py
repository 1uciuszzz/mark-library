

from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from schema import Token
from models import User
from util import error, hash
from database import get_db

SECRET_KEY = "28ac48bbb7813016a8edd769ed93628160d5543896c1c2f2a32f61daf6d25ef4"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAY = 7

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/admin/auth/signin")

router = APIRouter(prefix="/admin/auth", tags=["Admin-Auth"])


def create_access_token(data: dict):
  to_encode = data.copy()
  expire = datetime.utcnow()+timedelta(days=ACCESS_TOKEN_EXPIRE_DAY)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(
    claims=to_encode, key=SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
  try:
    payload = jwt.decode(token=token, key=SECRET_KEY, algorithms=[ALGORITHM])
    id = payload.get("uid")
    if not id:
      error.auth_failed("invalid token")
  except JWTError:
    error.auth_failed("invalid token")
  user_rows = db.query(User).all()
  user = None
  for row in user_rows:
    if(str(row.id) == id):
      user = row
  if not user:
    error.notfound_error(f"not found user '{id}'")
  return user


@router.post("/signin", response_model=Token)
async def admin_sign_in(payload: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  user_rows = db.query(User.id, User.email, User.password).all()
  user = None
  for row in user_rows:
    if(row.email == payload.username):
      user = row
  if not user:
    error.notfound_error(f"not found user '{payload.username}'")
  if not hash.verify_password(payload.password, user.password):
    error.auth_failed("password not matched")
  token = create_access_token(data={"uid": str(user.id)})
  return Token(access_token=token, token_type="bearer")
