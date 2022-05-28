import axios from "axios";
import { useContext } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";

import markaContext from "../contexts/markaContext";
import DeleteDirectory from "./DeleteDirectory";

const Directories = () => {
  const { directories, dispatch, currentDirectoryPage } =
    useContext(markaContext);
  const handleGetBookmarks = (directory) => {
    dispatch({
      type: "SET_CURRENT_DIRECTORY",
      directory,
    });
    axios
      .get(`http://localhost:8000/client/d/${directory.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const { data } = response;
        dispatch({
          type: "GET_BOOKMARKS_BY_DIRECTORY",
          bookmarks: data,
        });
        dispatch({
          type: "RESET_BOOKMARK_PAGE",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.detail);
      });
  };

  return directories.length === 0 ? (
    <div className="alert alert-info rounded-lg">
      <div>
        <FaInfoCircle size={32} />
        <span>You have none directories!</span>
      </div>
    </div>
  ) : (
    directories
      .slice((currentDirectoryPage - 1) * 5, currentDirectoryPage * 5)
      .map((directory) => {
        return (
          <div className="alert shadow-md" key={directory.id}>
            <div>
              <span
                className="btn"
                onClick={() => handleGetBookmarks(directory)}
              >
                {directory.name}
              </span>
            </div>
            <div className="flex-none">
              <DeleteDirectory directory={directory} />
            </div>
          </div>
        );
      })
  );
};

export default Directories;
