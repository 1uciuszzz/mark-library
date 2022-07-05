import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaArrowAltCircleUp,
  FaUser,
  FaFolder,
  FaCompass,
} from "react-icons/fa";

import brand from "../assets/android-chrome-512x512.png";
import UserName from "./UserName";
import markaContext from "../contexts/markaContext";

const Navbar = () => {
  const { status } = useContext(markaContext);
  return (
    <div className="container mx-auto">
      <nav className="navbar justify-between mb-12 shadow-md">
        <Link className="" to="/">
          <img src={brand} alt="brand" className="h-10 mr-4" />
          MARKA
        </Link>
        <UserName />
        {!status && (
          <Link className="btn btn-secondary" to="/signup">
            <FaArrowAltCircleUp className="mr-2" />
            SIGN UP
          </Link>
        )}
        {status && (
          <Link className="btn btn-secondary" to="/profile">
            <FaUser className="mr-2" />
            PROFILE
          </Link>
        )}
        {status && (
          <Link className="btn btn-secondary" to="/dashboard">
            <FaFolder className="mr-2" />
            DASHBOARD
          </Link>
        )}
        <Link className="btn btn-secondary" to="/u">
          <FaCompass className="mr-2" />
          EXPLORE
        </Link>
        <Link className="btn btn-secondary" to="/about">
          <FaHeartbeat className="mr-2" />
          ABOUT
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
