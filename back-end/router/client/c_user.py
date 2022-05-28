
from uuid import UUID
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from util.public import get_user_by_id
from models import User, Role

from schema import UserIn, UserOut, UserUpdate
from database import get_db
from router.client.c_auth import get_current_user
from util.public import get_role_by_id, get_user_by_email
from util import error
from util import hash

router = APIRouter(prefix="/client/u", tags=["Client-User"])


@router.post("/signup", response_model=UserOut)
async def create_user(payload: UserIn, db: Session = Depends(get_db)):
  user_in_db = await get_user_by_email(email=payload.email, db=db)
  if user_in_db:
    error.existed_error(f"user '{payload.email}' existed")
  user = User(email=payload.email, name=payload.name, password=hash.hash_password(
    payload.password), role_id=UUID("195c1a36-7ae2-48dc-800e-370151cd022e"))
  db.add(user)
  db.commit()
  res: User = await get_user_by_email(email=payload.email, db=db)
  if not res:
    error.notfound_error(f"not found user '{payload.email}'")
  role: Role = await get_role_by_id(id=str(res.role_id), db=db)
  if not role:
    error.notfound_error(f"data exception: not found role '{res.role_id}'")
  return UserOut(name=res.name,
                 email=res.email,
                 id=res.id,
                 role=role.name,
                 join_date=res.join_date)


@router.get("/{id}", response_model=UserOut)
async def get_user_info(id: str, db: Session = Depends(get_db)):
  user_in_db: User = await get_user_by_id(id=id, db=db)
  if not user_in_db:
    error.notfound_error(f"not found user '{id}'")
  role: Role = await get_role_by_id(str(user_in_db.role_id), db=db)
  if not role:
    error.notfound_error(
      f"user role exception: not found role '{user_in_db.role_id}'")
  return UserOut(id=user_in_db.id, name=user_in_db.name, email=user_in_db.email, role=role.name, join_date=user_in_db.join_date)


@router.put("/", response_model=UserOut)
async def update_user_info(payload: UserUpdate, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not hash.verify_password(payload.old_password, c_user.password):
    error.auth_failed(f"password wrong")
  user_in_db = await get_user_by_email(email=payload.email, db=db)
  if user_in_db and payload.email != c_user.email:
    error.existed_error(f"target email '{payload.email}' existed")
  c_user.email = payload.email
  c_user.name = payload.name
  c_user.password = hash.hash_password(password=payload.new_password)
  db.commit()
  role: Role = await get_role_by_id(id=str(c_user.role_id), db=db)
  if not role:
    error.notfound_error(f"data exception: not found role '{c_user.role_id}'")
  return UserOut(id=c_user.id, email=payload.email, name=payload.name, role=role.name, join_date=c_user.join_date)
