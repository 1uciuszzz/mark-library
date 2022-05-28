
from typing import List
from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session


from models import Role, User
from schema import RoleIn, RoleOut
from database import get_db
from router.admin.auth import get_current_user
from util import error

router = APIRouter(prefix="/admin/r", tags=["Admin-Role"])

"""
this section is finished
"""


@router.get("/", response_model=List[RoleOut])
async def get_role_all(db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  return db.query(Role).all()


@router.post("/", response_model=RoleOut)
async def create_role(payload: RoleIn, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  role_rows = db.query(Role).all()
  isRoleExisted = False
  for row in role_rows:
    if(row.name == payload.name):
      isRoleExisted = True
  if isRoleExisted:
    error.existed_error(f"role '{payload.name}' existed")
  role = Role(name=payload.name)
  db.add(role)
  db.commit()
  return db.query(Role).filter(Role.name == payload.name).first()


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_role(id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  role_rows = db.query(Role).all()
  role = None
  for row in role_rows:
    if(str(row.id) == id):
      role = row
  if not role:
    error.notfound_error(f"not found role '{id}'")
  db.delete(role)
  db.commit()
  return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", response_model=RoleOut)
async def update_role(id: str, payload: RoleIn, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  role_rows = db.query(Role).all()
  role = None
  isRoleExisted = False
  for row in role_rows:
    if(str(row.id) == id):
      role = row
    if(row.name == payload.name):
      isRoleExisted = True
  if not role:
    error.notfound_error(f"not found role '{id}'")
  if isRoleExisted:
    error.existed_error(f"role '{payload.name}' existed")
  role.name = payload.name
  db.commit()
  return db.query(Role).filter(Role.name == payload.name).first()


@router.get("/{id}", response_model=RoleOut)
async def get_role(id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  role_rows = db.query(Role).all()
  role = None
  for row in role_rows:
    if(str(row.id) == id):
      role = row
  if not role:
    error.notfound_error(f"not found role '{id}'")
  return role
