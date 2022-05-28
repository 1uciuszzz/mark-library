import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FaPenSquare } from "react-icons/fa";

import markaContext from "../contexts/markaContext";
import Loader from "./Loader";

const EditDirectory = () => {
  const { dispatch, currentDirectory } = useContext(markaContext);
  const [editDirectoryLoading, setEditDirectoryLoading] = useState(false);
  const [editDirectoryInputs, setEditDirectoryInputs] = useState({
    name: currentDirectory.name,
    description: currentDirectory.description,
  });
  const handleEditDirectoryInputsChange = (e) => {
    const { name, value } = e.target;
    setEditDirectoryInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditDirectory = () => {
    setEditDirectoryLoading(true);
    axios
      .put(
        `http://localhost:8000/client/d/${currentDirectory.id}`,
        {
          name: editDirectoryInputs.name,
          description: editDirectoryInputs.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setEditDirectoryLoading(false);
        const { data } = response;
        dispatch({
          type: "UPDATE_DIRECTORY",
          directory: data,
        });
        toast.success("updated successful");
        setEditDirectoryInputs({
          name: currentDirectory.name,
          description: currentDirectory.description,
        });
      })
      .catch((error) => {
        setEditDirectoryLoading(false);
        console.log(error);
      });
  };
  return (
    <>
      <label htmlFor="edit-directory" className="btn modal-button">
        <FaPenSquare size={16} className="mr-2" />
        EDIT THE DIRECTORY
      </label>
      <input type="checkbox" className="modal-toggle" id="edit-directory" />
      <div className="modal">
        <div className="modal-box">
          <h2 className="font-bold text-lg mb-2">EDIT DIRECTORY</h2>
          <div className="form-control gap-2">
            <label className="input-group">
              <span>Name</span>
              <input
                id="name"
                name="name"
                value={editDirectoryInputs.name}
                onChange={handleEditDirectoryInputsChange}
                type="text"
                placeholder="Updated directory's name"
                className="input input-bordered w-full"
              />
            </label>
            <label className="input-group">
              <span>Description</span>
              <input
                id="description"
                name="description"
                value={editDirectoryInputs.description}
                onChange={handleEditDirectoryInputsChange}
                type="text"
                placeholder="Updated directory's description"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="modal-action">
            <label htmlFor="edit-directory" className="btn">
              Cancel!
            </label>
            <label
              onClick={handleEditDirectory}
              htmlFor="edit-directory"
              className="btn"
            >
              {editDirectoryLoading ? <Loader color={"white"} /> : "Yay!"}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditDirectory;
