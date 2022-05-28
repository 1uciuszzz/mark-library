import axios from "axios";

const http = axios.create({
  baseURL: `http://localhost:8000`,
});

const api = {
  createUser: "/client/u/signup",
  getUserInfo: "/client/u",
  updateUserInfo: "/client/u/",
  getUserByToken: "/client/auth/token",
  userSignIn: "/client/auth/signin",
  getDirectory: "/client/d/",
  createDirectory: "/client/d/",
  getBookmarksByDirId: "/client/d",
  updateDirectory: "/client/d",
  deleteDirectory: "/client/d",
  createBookmarkInDirectory: "/client/b/",
  deleteBookmark: "/client/b",
  updateBookmark: "/client/b",
  getBookmarkBelongs: "/client/b",
  getPublicDirectory: "/public/d/",
};

export { http, api };
