from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from database import engine
import models
# from router.admin import bookmark, directory, role, user, auth
from router.client import c_user, c_auth, c_directory, c_bookmark
from router.public import p_directory
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
  title="marka rest api",
  version="3.0.0",
  description="a bookmark management platform based on cloud",
  docs_url="/docs",
)

app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

# app.include_router(router=role.router)
# app.include_router(router=user.router)
# app.include_router(router=auth.router)
# app.include_router(router=directory.router)
# app.include_router(router=bookmark.router)
app.include_router(router=c_user.router)
app.include_router(router=c_auth.router)
app.include_router(router=c_directory.router)
app.include_router(router=c_bookmark.router)
app.include_router(router=p_directory.router)


@app.get("/")
async def index():
  return {"marka": "a bookmark management platform based on cloud"}
