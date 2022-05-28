import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import sideSvgSrc from "../static/undraw_welcome_cats_thqn.svg";
import Loader from "../components/Loader";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    _password: "",
  });
  const [canSubmit, setCanSubmit] = useState([0, 0]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const checkValue = () => {
    if (
      inputs.name.length !== 0 &&
      (inputs.name.length < 3 || inputs.name.length >= 64)
    ) {
      toast.warn("3<=name.length<64");
      setCanSubmit((prev) => [0, prev[1]]);
      return;
    }
    if (
      inputs.password.length !== 0 &&
      (inputs.password.length < 6 || inputs.password.length >= 32)
    ) {
      toast.warn("6<=password.length<32");
      setCanSubmit((prev) => [prev[0], 0]);
      return;
    }
    if (
      inputs._password.length !== 0 &&
      inputs.password.length !== 0 &&
      inputs.password !== inputs._password
    ) {
      setCanSubmit((prev) => [prev[0], 0]);
      toast.warn("two times the password is not the same");
      return;
    }
    if (
      inputs.name.length !== 0 &&
      inputs.email.length !== 0 &&
      inputs.password.length !== 0 &&
      inputs._password.length !== 0
    ) {
      setCanSubmit([1, 1]);
    }
  };
  const handleBlur = () => {
    checkValue();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    };
    setLoading(true);
    axios
      .post("http://localhost:8000/client/u/signup", user)
      .then((response) => {
        setLoading(false);
        const { data } = response;
        toast.success(`${data.email} sign up successful`);
        navigate("/signin");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.detail);
      });
  };
  return (
    <div className="card card-side bg-primary text-primary-content shadow-md p-4">
      <figure className="w-6/12 p-4">
        <img src={sideSvgSrc} alt="side img" />
      </figure>
      <div className="card-body w-6/12 bg-secondary text-secondary-content shadow-md rounded-md">
        <h3 className="card-title">SIGN UP</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text text-primary-content">
                What is your name ?
              </span>
            </label>
            <input
              value={inputs.name}
              onBlur={handleBlur}
              onChange={handleChange}
              id="name"
              name="name"
              type="text"
              placeholder="Type your name here"
              className="input input-bordered input-secondary w-full max-w-xs text-primary-focus"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="email">
              <span className="label-text text-primary-content">
                I must get your email address !
              </span>
            </label>
            <input
              value={inputs.email}
              onBlur={handleBlur}
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
              <span className="label-text text-primary-content">
                Set a strong password !
              </span>
            </label>
            <input
              value={inputs.password}
              onBlur={handleBlur}
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              placeholder="I will not watch that !"
              className="input input-bordered input-secondary w-full max-w-xs text-primary-focus"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="_password">
              <span className="label-text text-primary-content">
                Your super password again !
              </span>
            </label>
            <input
              value={inputs._password}
              onBlur={handleBlur}
              onChange={handleChange}
              id="_password"
              name="_password"
              type="password"
              placeholder="Let's again !"
              className="input input-bordered input-secondary w-full max-w-xs text-primary-focus"
            />
          </div>
          <button
            className={
              !canSubmit.includes(0)
                ? "btn btn-secondary w-full max-w-xs mt-4"
                : "btn btn-secondary w-full max-w-xs mt-4 btn-disabled"
            }
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
