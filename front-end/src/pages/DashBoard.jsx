import { toast } from "react-toastify";
import { useContext } from "react";

import useAxios from "./../hooks/useAxios";
import markaContext from "../contexts/markaContext";
import Loader from "./../components/Loader";
import ContentSection from "../components/ContentSection";
import Directories from "../components/Directories";
import AddDirectory from "../components/AddDirectory";
import Pagination from "../components/Pagination";
import { api } from "../util/http";

const DashBoard = () => {
  const { dispatch, currentDirectoryPage, directories } =
    useContext(markaContext);
  const { loading } = useAxios(
    {
      method: "get",
      url: api.getDirectory,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
    (data) => {
      dispatch({
        type: "GET_DIRECTORIES",
        directories: data,
      });
    },
    (error) => {
      toast.error(error.response.data.detail);
    }
  );
  return (
    <div className="flex gap-4">
      <ul className="menu bg-primary-content text-primary w-4/12 rounded-md p-2 gap-2 shadow-md">
        <AddDirectory />
        {loading ? <Loader color={"white"} /> : <Directories />}
        <Pagination
          type={"DIRECTORY"}
          currentPage={currentDirectoryPage}
          data={directories}
        />
      </ul>
      <ContentSection />
    </div>
  );
};

export default DashBoard;
