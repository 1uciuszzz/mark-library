from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, Session

DB = f"postgresql"
DB_API = f"psycopg2"
HOST = f"127.0.0.1"
PORT = f"5432"
USER = f"<fill here please>"
PASSWORD = f"<fill here please>"
DB_NAME = f"<fill here please>"
DB_URL = f"{DB}+{DB_API}://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}"


engine = create_engine(url=DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
  db: Session = SessionLocal()
  try:
    yield db
  finally:
    db.close()
