from typing import List, Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import date


class Token(BaseModel):
  access_token: str
  token_type: str


class RoleBase(BaseModel):
  name: str


class RoleIn(RoleBase):
  pass


class RoleOut(RoleBase):
  id: UUID

  class Config:
    orm_mode = True


class UserBase(BaseModel):
  name: str
  email: EmailStr


class UserSearch(BaseModel):
  id: Optional[str]
  name: Optional[str]
  email: Optional[EmailStr]
  role: Optional[str]


class UserIn(UserBase):
  password: str


class AdminUserIn(UserBase):
  role: str
  password: str


class UserOut(UserBase):
  id: UUID
  role: str
  join_date: date


class SignIn(BaseModel):
  token: Token
  user: UserOut


class UserUpdate(UserBase):
  old_password: str
  new_password: str


class DirectoryBase(BaseModel):
  name: str
  description: str


class DirectoryIn(DirectoryBase):
  user_id: str
  pass


class DirectoryOut(DirectoryBase):
  id: UUID
  user_id: UUID

  class Config:
    orm_mode = True


class BookmarkBase(BaseModel):
  name: str
  url: str
  description: str


class BookmarkIn(BookmarkBase):
  dir_id: str
  pass


class BookmarkOut(BookmarkBase):
  id: UUID

  class Config:
    orm_mode = True


class DirectorySchema(DirectoryOut):
  bookmarks: List[BookmarkOut]


class BookmarkSchema(BookmarkOut):
  directories: List[DirectoryOut]
