import { useContext } from "react";

import Loader from "../components/Loader";
import useAxios from "../hooks/useAxios";
import markaContext from "../contexts/markaContext";
import Collapse from "../components/Collapse";
import { api } from "../util/http";
const Home = () => {
  const { dispatch, publicDirectories } = useContext(markaContext);
  const { loading } = useAxios(
    {
      url: api.getPublicDirectory,
      method: "get",
    },
    (data) => {
      dispatch({
        type: "GET_PUBLIC_DIRECTORIES",
        directories: data,
      });
    },
    (error) => {
      console.log(error);
    }
  );
  return loading ? (
    <Loader color={"black"} />
  ) : (
    publicDirectories.map((directory) => {
      return <Collapse key={directory.id} directory={directory} />;
    })
  );
};

export default Home;
