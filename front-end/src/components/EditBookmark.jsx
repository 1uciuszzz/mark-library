import { useState, useContext } from "react";
import { toast } from "react-toastify";

import markaContext from "../contexts/markaContext";
import Loader from "./Loader";
import { editBookmark } from "../util/api";

const EditBookmark = ({ bookmark }) => {
  const [editBookmarkLoading, setEditBookmarkLoading] = useState(false);
  const [editBookmarkInputs, setEditBookmarkInputs] = useState({
    name: bookmark.name,
    url: bookmark.url,
    description: bookmark.description,
  });
  const { currentDirectory, dispatch } = useContext(markaContext);
  const handleEditBookmarkInputs = (e) => {
    const { name, value } = e.target;
    setEditBookmarkInputs((prevValue) => ({ ...prevValue, [name]: value }));
  };
  const handleEditBookmark = () => {
    setEditBookmarkLoading(true);
    editBookmark(bookmark.id, {
      name: editBookmarkInputs.name,
      url: editBookmarkInputs.url,
      description: editBookmarkInputs.description,
      dir_id: currentDirectory.id,
    })
      .then((response) => {
        setEditBookmarkLoading(false);
        const { data } = response;
        dispatch({ type: "UPDATE_BOOKMARK", bookmark: data });
        toast.success(`update bookmark '${bookmark.id}' successful`);
      })
      .catch((error) => {
        setEditBookmarkLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <label
        htmlFor={`edit-bookmark-${bookmark.id}`}
        className="btn btn-primary modal-button"
      >
        Edit
      </label>
      <input
        type="checkbox"
        id={`edit-bookmark-${bookmark.id}`}
        className="modal-toggle"
      />
      <div className="modal shadow-md">
        <div className="modal-box">
          <div className="form-control gap-2">
            <label htmlFor="name" className="input-group">
              <span>Name</span>
              <input
                value={editBookmarkInputs.name}
                id="name"
                name="name"
                onChange={handleEditBookmarkInputs}
                type="text"
                className="input input-bordered w-full"
              />
            </label>
            <label htmlFor="url" className="input-group">
              <span>Url</span>
              <input
                value={editBookmarkInputs.url}
                id="url"
                name="url"
                onChange={handleEditBookmarkInputs}
                type="text"
                className="input input-bordered w-full"
              />
            </label>
            <label htmlFor="description" className="input-group">
              <span>Description</span>
              <input
                value={editBookmarkInputs.description}
                id="description"
                name="description"
                onChange={handleEditBookmarkInputs}
                type="text"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="modal-action">
            <label htmlFor={`edit-bookmark-${bookmark.id}`} className="btn">
              Cancel
            </label>
            <label
              onClick={handleEditBookmark}
              htmlFor={`edit-bookmark-${bookmark.id}`}
              className="btn"
            >
              {editBookmarkLoading ? <Loader color={"white"} /> : "Okay!"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookmark;
