import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import markaContext from "../contexts/markaContext";
import Loader from "./Loader";
import useAxios from "./../hooks/useAxios";
import { toast } from "react-toastify";
import { api } from "../util/http";

const UserName = () => {
  const { status, dispatch, user } = useContext(markaContext);
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/signin");
  };
  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "SIGN_OUT",
    });
    navigate("/");
  };
  const { loading } = useAxios(
    {
      method: "get",
      url: api.getUserByToken,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
    (data) => {
      dispatch({
        type: "GET_USER",
        user: data,
      });
      dispatch({
        type: "SIGN_IN",
      });
      toast.success(`Welcome ${data.name}`);
    },
    (error) => {
      dispatch({ type: "SIGN_OUT" });
    }
  );
  return (
    <>
      <input type="checkbox" id="logout-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3>Do you want logout?</h3>
          <div className="modal-action">
            <label htmlFor="logout-modal" className="btn">
              Cancel
            </label>
            <label
              onClick={handleSignOut}
              htmlFor="logout-modal"
              className="btn"
            >
              YAY:)
            </label>
          </div>
        </div>
      </div>
      <label
        htmlFor={status ? "logout-modal" : "false"}
        className="btn btn-primary modal-button"
        onClick={!status ? handleSignIn : undefined}
      >
        {status ? (
          <FaSignOutAlt className="mr-2" />
        ) : (
          <FaSignInAlt className="mr-2" />
        )}
        {loading ? <Loader color={"black"} /> : status ? user.name : "SIGN IN"}
      </label>
    </>
  );
};

export default UserName;
