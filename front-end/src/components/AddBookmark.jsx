import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";

import Loader from "./Loader";
import markaContext from "../contexts/markaContext";
import { addBookmark } from "../util/api";

const AddBookmark = () => {
  const { currentDirectory, dispatch } = useContext(markaContext);
  const [addBookmarkLoading, setAddBookmarkLoading] = useState(false);
  const [addBookmarkInputs, setAddBookmarkInputs] = useState({
    name: "",
    url: "",
    description: "",
  });
  const handleAddBookmarkInputsChange = (e) => {
    const { name, value } = e.target;
    setAddBookmarkInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddBookmark = () => {
    setAddBookmarkLoading(true);
    addBookmark({
      name: addBookmarkInputs.name,
      url: addBookmarkInputs.url,
      description: addBookmarkInputs.description,
      dir_id: currentDirectory.id,
    })
      .then((response) => {
        setAddBookmarkLoading(false);
        const { data } = response;
        dispatch({
          type: "CREATE_BOOKMARK",
          bookmark: data,
        });
        toast.success(`bookmark ${data.name} add to directory successful`);
        setAddBookmarkInputs({
          name: "",
          url: "",
          description: "",
        });
      })
      .catch((error) => {
        setAddBookmarkLoading(false);
        console.log(error);
      });
  };
  return (
    <>
      <label htmlFor="add-bookmark" className="btn modal-button">
        <FaPlusCircle size={16} className="mr-2" />
        ADD BOOKMARK
      </label>
      <input type="checkbox" id="add-bookmark" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h2 className="font-bold text-lg mb-2">NEW BOOKMARK</h2>
          <div className="form-control gap-2">
            <label className="input-group">
              <span>Name</span>
              <input
                id="name"
                name="name"
                value={addBookmarkInputs.name}
                onChange={handleAddBookmarkInputsChange}
                type="text"
                placeholder="New bookmark's name"
                className="input input-bordered w-full"
              />
            </label>
            <label className="input-group">
              <span>Url</span>
              <input
                id="url"
                name="url"
                value={addBookmarkInputs.url}
                onChange={handleAddBookmarkInputsChange}
                type="text"
                placeholder="New bookmark's address"
                className="input input-bordered w-full"
              />
            </label>
            <label className="input-group">
              <span>Description</span>
              <input
                id="description"
                name="description"
                value={addBookmarkInputs.description}
                onChange={handleAddBookmarkInputsChange}
                type="text"
                placeholder="New bookmark's description"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="modal-action">
            <label htmlFor="add-bookmark" className="btn">
              Cancel!
            </label>
            <label
              onClick={handleAddBookmark}
              htmlFor="add-bookmark"
              className="btn"
            >
              {addBookmarkLoading ? <Loader color={"white"} /> : "Yay!"}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddBookmark;
