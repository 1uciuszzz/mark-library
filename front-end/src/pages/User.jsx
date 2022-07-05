import { useParams } from "react-router-dom";
import { useState } from "react";
import useAxios from "./../hooks/useAxios";
import Loader from "../components/Loader";

import UserInfo from "../components/UserInfo";
import { api } from "../util/http";

const User = () => {
  const [user, setUser] = useState({});
  const { uid } = useParams();
  const { loading } = useAxios(
    {
      method: "get",
      url: `${api.getUserInfo}/${uid}`,
    },
    (data) => {
      setUser(data);
    },
    (error) => {
      console.log(error);
    }
  );
  return loading ? (
    <Loader />
  ) : (
    <div>
      <UserInfo user={user} />
    </div>
  );
};

export default User;
