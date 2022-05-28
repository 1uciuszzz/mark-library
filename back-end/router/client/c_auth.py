

from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from util.public import get_role_by_id, get_user_by_email

from schema import SignIn, UserOut
from models import User, Role
from util import error, hash
from util.public import get_user_by_id
from database import get_db

SECRET_KEY = "7ed83a07d6e94c8d396314ebff55f0e8a4fe3dbf0f12c5454c735d7a88344915"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAY = 1

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/client/auth/signin")

router = APIRouter(prefix="/client/auth", tags=["Client-Auth"])


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
  user = await get_user_by_id(id=id, db=db)
  if not user:
    error.notfound_error(f"not found user '{id}'")
  return user


@router.get("/token", response_model=UserOut)
async def get_user_by_token(c_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  role: Role = await get_role_by_id(id=str(c_user.role_id), db=db)
  if not role:
    error.notfound_error(
      f"user role exception: not found role '{c_user.role_id}'")
  return UserOut(id=c_user.id, name=c_user.name, email=c_user.email, role=role.name, join_date=c_user.join_date)


@router.post("/signin", response_model=SignIn)
async def user_sign_in(payload: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  user: User = await get_user_by_email(email=payload.username, db=db)
  if not user:
    error.notfound_error(f"not found user '{payload.username}'")
  if not hash.verify_password(payload.password, user.password):
    error.auth_failed("password not matched")
  role: Role = await get_role_by_id(id=str(user.role_id), db=db)
  if not role:
    error.notfound_error(
      f"user role exception: not found role '{user.role_id}'")
  token = create_access_token(data={"uid": str(user.id)})
  res = SignIn(token={"access_token": token, "token_type": "bearer"}, user={
               "name": user.name, "email": user.email, "id": user.id,  "role": role.name, "join_date": user.join_date})
  return res
