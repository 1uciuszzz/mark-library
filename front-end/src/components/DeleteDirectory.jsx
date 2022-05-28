import axios from "axios";
import { useContext, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import Loader from "./Loader";
import markaContext from "../contexts/markaContext";
import { toast } from "react-toastify";

const DeleteDirectory = ({ directory }) => {
  const [deleteDirectoryLoading, setDeleteDirectoryLoading] = useState(false);
  const { dispatch, directories } = useContext(markaContext);
  const handleDeleteDirectory = () => {
    setDeleteDirectoryLoading(true);
    axios
      .delete(`http://localhost:8000/client/d/${directory.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setDeleteDirectoryLoading(false);
        dispatch({
          type: "DELETE_DIRECTORY",
          directory,
        });
        dispatch({
          type: "SET_CURRENT_DIRECTORY",
          directory: {},
        });
        dispatch({
          type: "SET_BOOKMARKS",
          bookmarks: [],
        });
        toast.success(`delete directory '${directory.name}' successful`);
      })
      .catch((error) => {
        setDeleteDirectoryLoading(false);
        console.log(error);
      });
  };
  return (
    <div>
      <label
        htmlFor={`delete-directory-${directory.id}`}
        className="btn modal-button"
      >
        <FaTrashAlt />
      </label>
      <input
        type="checkbox"
        id={`delete-directory-${directory.id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Do you want to delete this directory?
          </h3>
          <div className="modal-action">
            <label htmlFor={`delete-directory-${directory.id}`} className="btn">
              Cancel
            </label>
            <label
              onClick={handleDeleteDirectory}
              htmlFor={`delete-directory-${directory.id}`}
              className="btn"
            >
              {deleteDirectoryLoading ? <Loader /> : "Yes!"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDirectory;
