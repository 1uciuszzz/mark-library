
from typing import List
from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session
from models import User, Directory
from schema import BookmarkOut, DirectoryIn, DirectoryOut
from database import get_db
from router.admin.auth import get_current_user
from util import error

router = APIRouter(prefix="/admin/d", tags=["Admin-Directory"])


@router.post("/", response_model=DirectoryOut)
async def create_directory(payload: DirectoryIn, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  dir_rows = db.query(Directory).all()
  isDirExisted = False
  for row in dir_rows:
    if(row.name == payload.name):
      isDirExisted = True
  if isDirExisted:
    error.existed_error(f"'{payload.name}' existed")
  isUserExisted = False
  user_rows = db.query(User).all()
  for row in user_rows:
    if(str(row.id) == payload.user_id):
      isUserExisted = True
  if not isUserExisted:
    error.notfound_error(f"not found user '{payload.user_id}'")
  dir = Directory(**payload.dict())
  db.add(dir)
  db.commit()
  res = db.query(Directory, User).filter(Directory.name == payload.name,
                                         Directory.user_id == payload.user_id).first()
  return res[0]


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_dir_by_id(id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  dir_rows = db.query(Directory).all()
  isDirExisted = False
  dir = None
  for row in dir_rows:
    if(str(row.id) == id):
      isDirExisted = True
      dir = row
  if not isDirExisted:
    error.notfound_error(f"not found dir '{id}'")
  db.delete(dir)
  db.commit()
  return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/", response_model=List[DirectoryOut])
async def get_all_directory(db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  return db.query(Directory).all()


@router.put("/{id}", response_model=DirectoryOut)
async def update_directory_by_id(id: str, payload: DirectoryIn, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  dir_rows = db.query(Directory).all()
  isDirExisted = False
  dir = None
  for row in dir_rows:
    if str(row.id) == id:
      isDirExisted = True
      dir = row
  if not isDirExisted:
    error.notfound_error(f"not found directory '{id}'")
  user_rows = db.query(User).all()
  isUserExisted = False
  for row in user_rows:
    if(str(row.id) == payload.user_id):
      isUserExisted = True
  if not isUserExisted:
    error.notfound_error(f"not found user '{payload.user_id}'")
  dir.name = payload.name
  dir.description = payload.description
  dir.user_id = payload.user_id
  db.commit()
  res = db.query(Directory, User).filter(Directory.name == payload.name,
                                         Directory.user_id == payload.user_id).first()
  return res[0]


@router.get("/{id}/b", response_model=List[BookmarkOut])
async def get_bookmarks_by_dir(id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  dir_rows = db.query(Directory).all()
  isDirExisted = False
  dir = None
  for row in dir_rows:
    if str(row.id) == id:
      isDirExisted = True
      dir = row
  if not isDirExisted:
    error.notfound_error(f"not found directory '{id}'")
  return dir.bookmarks
