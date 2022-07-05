import { http, api } from "./http.js";

const addBookmark = (payload) => {
  return http.post(`${api.createBookmarkInDirectory}`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const addDirectory = (payload) => {
  return http.post(`${api.createDirectory}`, payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

const deleteBookmark = (directory_id, bookmark_id) => {
  return http.delete(`${api.deleteBookmark}/${directory_id}/${bookmark_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const deleteDirectory = (directory_id) => {
  return http.delete(`${api.deleteDirectory}/${directory_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getBookmarksByDirectory = (directory_id) => {
  return http.get(`${api.getBookmarksByDirId}/${directory_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const editBookmark = (bookmark_id, payload) => {
  return http.put(`${api.updateBookmark}/${bookmark_id}`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const editDirectory = (directory_id, payload) => {
  return http.put(`${api.updateDirectory}/${directory_id}`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const signIn = (formData) => {
  return http.post(`${api.userSignIn}`, formData);
};

const signUp = (payload) => {
  return http.post(`${api.createUser}`, payload);
};

export {
  addBookmark,
  addDirectory,
  deleteBookmark,
  deleteDirectory,
  getBookmarksByDirectory,
  editBookmark,
  editDirectory,
  signIn,
  signUp,
};
