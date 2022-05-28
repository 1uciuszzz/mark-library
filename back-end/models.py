from sqlalchemy import Column, Table, text, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from database import Base


class Role(Base):
  __tablename__ = "role"

  id = Column(UUID(as_uuid=True), primary_key=True,
              server_default=text("gen_random_uuid()"))
  name = Column(String)


class User(Base):
  __tablename__ = "user"

  id = Column(UUID(as_uuid=True), primary_key=True,
              server_default=text("gen_random_uuid()"))
  name = Column(String)
  email = Column(String)
  password = Column(String)
  join_date = Column(Date, server_default=text("CURRENT_DATE"))
  role_id = Column(UUID(as_uuid=True), ForeignKey("role.id", onupdate="cascade", ondelete="cascade"))


DirBookmark = Table("dirbookmark", Base.metadata,
                    Column("directory_id", ForeignKey(
                      "directory.id", onupdate="cascade", ondelete="cascade"), primary_key=True),
                    Column("bookmark_id", ForeignKey("bookmark.id", onupdate="cascade", ondelete="cascade"), primary_key=True))


class Directory(Base):
  __tablename__ = "directory"

  id = Column(UUID(as_uuid=True), primary_key=True,
              server_default=text("gen_random_uuid()"))
  name = Column(String)
  description = Column(String)
  user_id = Column(UUID(as_uuid=True), ForeignKey(
    "user.id", onupdate="cascade", ondelete="cascade"))
  bookmarks = relationship(
    "Bookmark", secondary=DirBookmark, back_populates="directories")


class Bookmark(Base):
  __tablename__ = "bookmark"

  id = Column(UUID(as_uuid=True), primary_key=True,
              server_default=text("gen_random_uuid()"))
  name = Column(String)
  url = Column(String)
  description = Column(String)
  directories = relationship(
    "Directory", secondary=DirBookmark, back_populates="bookmarks")
