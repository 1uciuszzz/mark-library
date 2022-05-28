from typing import List
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from models import Directory
from schema import DirectorySchema
from database import get_db

router = APIRouter(prefix="/public/d", tags=["Public-Directory"])


@router.get("/", response_model=List[DirectorySchema])
async def get_public_directories(db: Session = Depends(get_db)):
  return db.query(Directory).filter(Directory.user_id ==
                                    "6f5ac55a-3291-4b04-aa43-8c685a318e7e").all()
