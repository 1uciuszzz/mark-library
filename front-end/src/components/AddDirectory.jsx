import axios from "axios";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { FaFolderPlus } from "react-icons/fa";

import createSvg from "../static/undraw_create_re_57a3.svg";
import markaContext from "../contexts/markaContext";
import Loader from "./Loader";

const AddDirectory = () => {
  const { dispatch } = useContext(markaContext);
  const [createDirLoading, setCreateDirLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleCreateDir = (e) => {
    e.preventDefault();
    setCreateDirLoading(true);
    const { name, description } = inputs;
    if (name.length === 0 || description.length === 0) {
      toast.error("name or description shouldn't be null");
      setCreateDirLoading(false);
      return;
    }
    axios
      .post(
        "http://localhost:8000/client/d/",
        {
          name,
          description,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setCreateDirLoading(false);
        const { data } = response;
        dispatch({
          type: "ADD_DIRECTORY",
          directory: data,
        });
        toast.success(`add directory '${data.name}' successful!`);
        setInputs({
          name: "",
          description: "",
        });
      })
      .catch((error) => {
        setCreateDirLoading(false);
        console.log(error);
      });
  };
  return (
    <>
      <label
        htmlFor="create-directory"
        className="btn btn-primary modal-button flex items-center"
      >
        <FaFolderPlus size={16} className="mr-2" />
        Add Directory
      </label>
      <input type="checkbox" id="create-directory" className="modal-toggle" />
      <div className="modal shadow-md">
        <div className="modal-box">
          <form onSubmit={handleCreateDir}>
            <div className="form-control gap-2">
              <figure className="bg-primary rounded-md p-2">
                <img src={createSvg} alt="create" />
              </figure>
              <label htmlFor="name" className="input-group">
                <span>Name</span>
                <input
                  value={inputs.name}
                  id="name"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  className="input input-bordered w-full"
                />
              </label>
              <label htmlFor="description" className="input-group">
                <span>Description</span>
                <input
                  value={inputs.description}
                  id="description"
                  name="description"
                  onChange={handleChange}
                  type="text"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="modal-action">
              <label htmlFor="create-directory" className="btn">
                Cancel
              </label>
              <label
                onClick={handleCreateDir}
                htmlFor="create-directory"
                className="btn"
              >
                {createDirLoading ? <Loader color={"white"} /> : "Create!"}
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDirectory;
