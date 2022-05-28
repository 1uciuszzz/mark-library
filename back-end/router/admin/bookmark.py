
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schema import BookmarkBase
from models import Bookmark, Directory, User
from router.admin.auth import get_current_user

from schema import BookmarkIn, BookmarkOut, DirectoryOut
from database import get_db
from util import error


router = APIRouter(prefix="/admin/b", tags=["Admin-Bookmark"])


@router.post("/", response_model=BookmarkOut)
async def create_bookmark(payload: BookmarkIn, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  dir_rows = db.query(Directory).all()
  isDirExisted = False
  dir = None
  for row in dir_rows:
    if str(row.id) == payload.dir_id:
      isDirExisted = True
      dir: Directory = row
  if not isDirExisted:
    error.notfound_error(f"not found directory '{payload.dir_id}'")
  bookmark = Bookmark(name=payload.name,
                      url=payload.url,
                      description=payload.description)
  dir.bookmarks.append(bookmark)
  db.add(dir)
  db.commit()
  res = db.query(Bookmark, Directory).filter(
    Bookmark.name == payload.name, Directory.id == payload.dir_id).first()
  return res[0]


@router.delete("/{id}", response_model=BookmarkOut)
async def delete_bookmark(id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  b_rows = db.query(Bookmark).all()
  isBookmarkExisted = False
  b = None
  for row in b_rows:
    if str(row.id) == id:
      isBookmarkExisted = True
      b = row
  if not isBookmarkExisted:
    error.notfound_error(f"not found bookmark '{id}'")
  db.delete(b)
  db.commit()
  return b


@router.put("/{id}", response_model=BookmarkOut)
async def update_bookmark(id: str, payload: BookmarkBase, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  b_rows = db.query(Bookmark).all()
  isBookmarkExisted = False
  b = None
  for row in b_rows:
    if str(row.id) == id:
      isBookmarkExisted = True
      b = row
  if not isBookmarkExisted:
    error.notfound_error(f"not found bookmark '{id}'")
  b.name = payload.name
  b.url = payload.url
  b.description = payload.description
  db.commit()
  return db.query(Bookmark).filter(Bookmark.id == id).first()


@router.get("/", response_model=List[BookmarkOut])
async def get_bookmarks(db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  return db.query(Bookmark).all()


@router.get("/{id}", response_model=BookmarkOut)
async def get_bookmark_by_id(id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  b_rows = db.query(Bookmark).all()
  isBookmarkExisted = False
  bookmark = None
  for row in b_rows:
    if str(row.id) == id:
      isBookmarkExisted = True
      bookmark = row
  if not isBookmarkExisted:
    error.notfound_error(f"not found bookmark '{id}'")
  return bookmark


@router.get("/{id}/d", response_model=List[DirectoryOut])
async def get_bookmark_belongs(id: str, db: Session = Depends(get_db), c_user: User = Depends(get_current_user)):
  if not str(c_user.role_id) == "eb61dc09-4cb6-459d-a7dd-ec42a3ea25fd":
    error.auth_failed("permission denied")
  isBookmarkExisted = False
  b = None
  b_rows = db.query(Bookmark).all()
  for row in b_rows:
    if str(row.id) == id:
      isBookmarkExisted = True
      b: Bookmark = row
  if not isBookmarkExisted:
    error.notfound_error(f"not found bookmark '{id}'")
  return b.directories
