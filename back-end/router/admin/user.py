
from typing import List, Any
from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session
from database import get_db
from models import User, Role
from router.admin.auth import get_current_user
from util import error, hash
from schema import UserOut, AdminUserIn, UserSearch

router = APIRouter(prefix="/admin/u", tags=["Admin-User"])

"""
this section is finished
"""

# this api is finished👇


@router.post("/", response_model=UserOut)
async def sign_up(payload: AdminUserIn, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  user_email_rows = db.query(User.email).all()
  isEmailExisted = False
  for row in user_email_rows:
    if(row.email == payload.email):
      isEmailExisted = True
  if(isEmailExisted):
    error.existed_error(f"'{payload.email}' existed")
  isRoleExisted = False
  user = User(name=payload.name,
              email=payload.email,
              password=hash.hash_password(payload.password),
              )
  role_rows = db.query(Role).all()
  for row in role_rows:
    if(row.name == payload.role):
      isRoleExisted = True
      user.role_id = row.id
  if not isRoleExisted:
    error.notfound_error(f"not found role '{payload.role}'")
  db.add(user)
  db.commit()
  user_in_db = db.query(User).filter(User.email == payload.email).first()
  res = UserOut(id=user_in_db.id, name=user_in_db.name, email=user_in_db.email,
                join_date=user_in_db.join_date, role=payload.role)
  return res

# this api is finished👇


@router.get("/", response_model=List[UserOut])
async def get_all_users(db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  res = []
  user_rows = db.query(User).all()
  for user in user_rows:
    role = db.query(Role).filter(Role.id == user.role_id).first()
    user = UserOut(id=user.id, name=user.name, email=user.email,
                   role=role.name, join_date=user.join_date)
    res.append(user)
  return res

# this api is finished👇


@router.put("/{id}", response_model=UserOut)
async def update_user_info(id: str, payload: AdminUserIn, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  user_id_rows = db.query(User.id).all()
  isIdExisted = False
  for row in user_id_rows:
    if str(row.id) == id:
      isIdExisted = True
  if not isIdExisted:
    error.notfound_error(f"not found user '{id}'")
  user_query = db.query(User).filter(User.id == id)
  user_in_db = user_query.first()
  isRoleExisted = False
  role_rows = db.query(Role).all()
  for row in role_rows:
    if row.name == payload.role:
      isRoleExisted = True
      user_in_db.role_id = row.id
  if not isRoleExisted:
    error.notfound_error(f"not found role '{payload.role}'")
  user_in_db.name = payload.name
  user_in_db.email = payload.email
  user_in_db.password = hash.hash_password(payload.password)
  db.commit()
  user_in_db = user_query.first()
  res = UserOut(id=user_in_db.id, name=user_in_db.name, email=user_in_db.email,
                role=payload.role, join_date=user_in_db.join_date)
  return res


@router.get("/ss", response_model=List[UserOut])
async def get_users_by_any_props(payload: UserSearch = None, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  search_by = None
  for prop in payload:
    if(prop[1]):
      search_by: tuple[str, Any] = prop
      break
  if not search_by:
    error.notfound_error(f"none params")
  user_rows = None
  if (search_by[0] == "id"):
    user_rows = db.query(User).filter(str(User.id) == search_by[1]).all()
  elif (search_by[0] == "name"):
    user_rows = db.query(User).filter(User.name == search_by[1]).all()
  elif (search_by[0] == "email"):
    user_rows = db.query(User).filter(User.email == search_by[1]).all()
  elif (search_by[0] == "role"):
    role_rows = db.query(Role).all()
    isRoleExisted = False
    role = None
    for row in role_rows:
      if(row.name == search_by[1]):
        isRoleExisted = True
        role = row
    if not isRoleExisted:
      error.notfound_error(f"not found role '{search_by[1]}'")
    user_rows = db.query(User).filter(User.role_id == role.id).all()
  res = []
  if not user_rows:
    error.notfound_error(
      f"not found user prop '{search_by[0]}=={search_by[1]}'")
  for row in user_rows:
    role = db.query(Role).filter(Role.id == row.role_id).first()
    res.append(UserOut(id=row.id, name=row.name, email=row.email,
               role=role.name, join_date=row.join_date))
  return res

# this api is finished👇


@router.get("/{id}", response_model=UserOut)
async def get_user_by_id(id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  user_rows = db.query(User).all()
  user: User = None
  isUserExisted = False
  for row in user_rows:
    if(str(row.id) == id):
      isUserExisted = True
      user = row
  if not isUserExisted:
    error.notfound_error(f"not found user '{id}'")
  role_row = db.query(Role).filter(Role.id == user.role_id).first()
  return UserOut(id=user.id, name=user.name, email=user.email, role=role_row.name, join_date=user.join_date)

# this api is finished👇


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_by_id(id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  user_rows = db.query(User).all()
  user: User = None
  isUserExisted = False
  for row in user_rows:
    if(str(row.id) == id):
      isUserExisted = True
      user = row
  if not isUserExisted:
    error.notfound_error(f"not found user '{id}'")
  db.delete(user)
  db.commit()
  return Response(status_code=status.HTTP_204_NO_CONTENT)
