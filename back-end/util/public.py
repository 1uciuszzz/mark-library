from fastapi import Depends
from pydantic import EmailStr
from sqlalchemy.orm import Session


from models import Role, User, Directory, Bookmark
from database import get_db


async def get_bookmark_by_id(id: str, db: Session):
  b_rows = db.query(Bookmark).all()
  b = None
  for row in b_rows:
    if str(row.id) == id:
      b = row
  return b


async def get_bookmark_by_dir_id_and_boomark_id(d_id: str, b_id: str, db: Session):
  dir = db.query(Directory).filter(Directory.id == d_id).first()
  bookmarks = dir.bookmarks
  bookmark = None
  for row in bookmarks:
    if str(row.id) == b_id:
      bookmark: Bookmark = row
  return bookmark


async def get_bookmark_by_dir_id_and_boomark_name(dir_id: str, b_name: str, db: Session):
  dir = db.query(Directory).filter(Directory.id == dir_id).first()
  bookmarks = dir.bookmarks
  bookmark = None
  for row in bookmarks:
    if row.name == b_name:
      bookmark: Bookmark = row
  return bookmark


async def get_role_by_id(id: str, db: Session = Depends(get_db)):
  role_rows = db.query(Role).all()
  role = None
  for row in role_rows:
    if str(row.id) == id:
      role = row
  return role


async def get_user_by_id(id: str, db: Session):
  user_rows = db.query(User).all()
  user = None
  for row in user_rows:
    if str(row.id) == id:
      user = row
  return user


async def get_user_by_email(email: EmailStr, db: Session):
  user_rows = db.query(User).all()
  user = None
  for row in user_rows:
    if row.email == email:
      user = row
  return user


async def get_dir_by_name_and_uid(name: str, uid: str, db: Session):
  user_dirs = db.query(Directory).filter(Directory.user_id == uid).all()
  dir = None
  for row in user_dirs:
    if row.name == name:
      dir = row
  return dir


async def get_dir_by_id(id: str, db: Session):
  dir_rows = db.query(Directory).all()
  dir = None
  for row in dir_rows:
    if str(row.id) == id:
      dir = row
  return dir


async def get_dirs_by_uid(uid: str, db: Session):
  dir_rows = db.query(Directory).all()
  res = []
  for row in dir_rows:
    if row.user_id == uid:
      res.append(row)
  return res
