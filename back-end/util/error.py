
from fastapi import HTTPException, status


def existed_error(msg: str):
  raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                      detail=[{"msg": msg}])


def notfound_error(msg: str):
  raise HTTPException(
    status_code=status.HTTP_404_NOT_FOUND, detail=[{"msg": msg}])


def auth_failed(msg: str):
  raise HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED, detail=[{"msg": msg}])
