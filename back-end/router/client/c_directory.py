
from typing import List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status, Response
from util.public import get_dirs_by_uid

from schema import DirectoryOut, DirectoryBase, BookmarkOut
from models import User, Directory
from database import get_db
from router.client.c_auth import get_current_user
from util.public import get_dir_by_name_and_uid, get_dir_by_id
from util import error

router = APIRouter(prefix="/client/d", tags=["Client-Directory"])


@router.post("/", response_model=DirectoryOut)
async def create_directory(payload: DirectoryBase, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  dir_in_db = await get_dir_by_name_and_uid(name=payload.name, uid=c_user.id, db=db)
  if dir_in_db:
    error.existed_error(f"directory '{payload.name}' existed")
  dir = Directory(name=payload.name,
                  description=payload.description,
                  user_id=c_user.id)
  db.add(dir)
  db.commit()
  res = await get_dir_by_name_and_uid(name=payload.name, uid=c_user.id, db=db)
  return res


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_dir_by_id(id: str, c_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  dir_in_db: Directory = await get_dir_by_id(id=id, db=db)
  if not dir_in_db:
    error.notfound_error(f"not found directory '{id}'")
  if dir_in_db.user_id != c_user.id:
    error.auth_failed(f"permission denied")
  db.delete(dir_in_db)
  db.commit()
  return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", response_model=DirectoryOut)
async def update_directory(id: str, payload: DirectoryBase, c_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  dir_in_db: Directory = await get_dir_by_id(id=id, db=db)
  if not dir_in_db:
    error.notfound_error(f"not found directory '{id}'")
  if dir_in_db.user_id != c_user.id:
    error.auth_failed(f"permission denied")
  dup = await get_dir_by_name_and_uid(name=payload.name, uid=c_user.id, db=db)
  if dup and str(dup.id) != id:
    error.existed_error(f"directory '{payload.name}' existed")
  dir_in_db.name = payload.name
  dir_in_db.description = payload.description
  db.commit()
  return await get_dir_by_id(id=id, db=db)


@router.get("/", response_model=List[DirectoryOut])
async def get_directories(c_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
  return await get_dirs_by_uid(uid=c_user.id, db=db)


@router.get("/{id}", response_model=List[BookmarkOut])
async def get_bookmarks_by_dir_id(id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  dir_in_db: Directory = await get_dir_by_id(id=id, db=db)
  if not dir_in_db:
    error.notfound_error(f"not found directory '{id}'")
  if dir_in_db.user_id != c_user.id:
    error.auth_failed(f"permission denied")
  return dir_in_db.bookmarks
