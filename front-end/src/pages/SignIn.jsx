import { useState, useContext } from "react";

import sideSvgSrc from "../static/undraw_sign_in_re_o58h.svg";
import markaContext from "../contexts/markaContext";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const { dispatch } = useContext(markaContext);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevValue) => ({ ...prevValue, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("username", inputs.email);
    formData.append("password", inputs.password);
    axios
      .post("http://localhost:8000/client/auth/signin", formData)
      .then((response) => {
        console.log(response);
        const { data } = response;
        localStorage.setItem("token", data.token.access_token);
        dispatch({
          type: "GET_USER",
          user: data.user,
        });
        dispatch({ type: "SIGN_IN" });
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.detail[0].msg);
        setInputs({ ...inputs, password: "" });
        setLoading(false);
      });
  };
  return (
    <div className="card card-side bg-secondary text-secondary-content shadow-md p-4">
      <figure className="w-6/12 p-4">
        <img src={sideSvgSrc} alt="sign img" />
      </figure>
      <div className="card-body w-6/12 bg-primary text-primary-content shadow-md rounded-md">
        <h2 className="card-title">SIGN IN</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="email">
              <span className="label-text text-primary-content">Email</span>
            </label>
            <input
              value={inputs.email}
              onChange={handleChange}
              id="email"
              name="email"
              type="email"
              placeholder="Your email address"
              className="input input-bordered input-secondary w-full max-w-xs text-primary-focus"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="password">
              <span className="label-text text-primary-content">Password</span>
            </label>
            <input
              value={inputs.password}
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              placeholder="I will not watch that !"
              className="input input-bordered input-secondary w-full max-w-xs text-primary-focus"
            />
          </div>
          <button
            className={
              inputs.email.length === 0 || inputs.password.length === 0
                ? "btn btn-secondary w-full max-w-xs shadow-md mt-4 btn-disabled"
                : "btn btn-secondary w-full max-w-xs shadow-md mt-4"
            }
            type="submit"
          >
            {loading ? <Loader /> : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
