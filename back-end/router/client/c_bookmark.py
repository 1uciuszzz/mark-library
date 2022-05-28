

from typing import List
from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.orm import Session

from schema import BookmarkOut, BookmarkIn, DirectoryOut
from models import User, Directory, Bookmark
from database import get_db
from router.client.c_auth import get_current_user
from util.public import get_bookmark_by_id, get_dir_by_id, get_bookmark_by_dir_id_and_boomark_name, get_bookmark_by_dir_id_and_boomark_id
from util import error

router = APIRouter(prefix="/client/b", tags=["Client-Bookmark"])


@router.post("/", response_model=BookmarkOut)
async def create_bookmark_in_dir(payload: BookmarkIn, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  dir_in_db: Directory = await get_dir_by_id(id=payload.dir_id, db=db)
  if not dir_in_db:
    error.notfound_error(f"not found directory '{payload.dir_id}'")
  if dir_in_db.user_id != c_user.id:
    error.auth_failed(f"permission denied")
  dup = await get_bookmark_by_dir_id_and_boomark_name(dir_id=str(dir_in_db.id), b_name=payload.name, db=db)
  if dup:
    error.existed_error(f"bookmark '{payload.name}' existed")
  bookmark = Bookmark(name=payload.name,
                      url=payload.url,
                      description=payload.description)
  dir_in_db.bookmarks.append(bookmark)
  db.add(bookmark)
  db.commit()
  b_in_db = await get_bookmark_by_dir_id_and_boomark_name(dir_id=str(dir_in_db.id), b_name=payload.name, db=db)
  return b_in_db


@router.delete("/{d_id}/{b_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_bookmark_by_id(d_id: str, b_id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  dir: Directory = await get_dir_by_id(id=d_id, db=db)
  if not dir:
    error.notfound_error(f"not found directory '{d_id}'")
  if dir.user_id != c_user.id:
    error.auth_failed(f"permission denied")
  bookmark: Bookmark = await get_bookmark_by_dir_id_and_boomark_id(d_id=d_id, b_id=b_id, db=db)
  if not bookmark:
    error.notfound_error(f"not found bookmark '{b_id}'")
  db.delete(bookmark)
  db.commit()
  return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{b_id}", response_model=BookmarkOut)
async def update_bookmark(b_id: str, payload: BookmarkIn, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  dir: Directory = await get_dir_by_id(id=payload.dir_id, db=db)
  if not dir:
    error.notfound_error(f"not found directory '{payload.dir_id}'")
  if dir.user_id != c_user.id:
    error.auth_failed(f"permission denied")
  bookmarks = dir.bookmarks
  dup = None
  for bookmark in bookmarks:
    if bookmark.name is payload.name:
      dup: Bookmark = bookmark
  if dup:
    error.existed_error(
      f"bookmark '{dup.name}' in directory '{dir.name}' existed")
  bookmark: Bookmark = await get_bookmark_by_dir_id_and_boomark_id(d_id=payload.dir_id, b_id=b_id, db=db)
  if not bookmark:
    error.notfound_error(
      f"not found bookmark '{payload.name}' in dir '{dir.name}'")
  bookmark.name = payload.name
  bookmark.description = payload.description
  bookmark.url = payload.url
  db.commit()
  return bookmark


@router.get("/{b_id}/d", response_model=List[DirectoryOut])
async def get_bookmark_belongs(b_id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  bookmark: Bookmark = await get_bookmark_by_id(id=b_id, db=db)
  if not bookmark:
    error.notfound_error(f"not found bookmark '{b_id}'")
  directories = bookmark.directories
  res = []
  for d in directories:
    if d.user_id == c_user.id:
      res.append(d)
  return res
