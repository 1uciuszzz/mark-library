import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import markaContext from "../contexts/markaContext";
import Loader from "./Loader";

const DeleteBookmark = ({ b_id }) => {
  const { currentDirectory, dispatch } = useContext(markaContext);
  const [deleteBookmarkLoading, setDeleteBookmarkLoading] = useState(false);
  const handleDeleteBookmark = () => {
    setDeleteBookmarkLoading(true);
    axios
      .delete(`http://localhost:8000/client/b/${currentDirectory.id}/${b_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setDeleteBookmarkLoading(false);
        dispatch({
          type: "DELETE_BOOKMARK",
          b_id,
        });
        toast.success(`delete bookmark '${b_id}' successful`);
      })
      .catch((error) => {
        setDeleteBookmarkLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <label
        htmlFor={`delete-bookmark-${b_id}`}
        className="btn btn-ghost modal-button"
      >
        DELETE
      </label>
      <input
        type="checkbox"
        id={`delete-bookmark-${b_id}`}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Do you want to delete this bookmark?
          </h3>
          <div className="modal-action">
            <label htmlFor={`delete-bookmark-${b_id}`} className="btn">
              Cancel
            </label>
            <label
              onClick={handleDeleteBookmark}
              htmlFor={`delete-bookmark-${b_id}`}
              className="btn"
            >
              {deleteBookmarkLoading ? <Loader color={"white"} /> : "Yay!"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteBookmark;
