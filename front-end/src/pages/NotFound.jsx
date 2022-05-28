import { FaExclamation } from "react-icons/fa";
import { Link } from "react-router-dom";

import notfound from "../static/undraw_page_not_found_re_e9o6.svg";

const NotFound = () => {
  return (
    <>
      <div className="alert alert-error shadow-md">
        <div>
          <FaExclamation size={24} />
          <span>There is nothing here!</span>
        </div>
        <div className="flex-none">
          <Link to={"/"} className="btn btn-outline">
            Go Back to Home Page
          </Link>
        </div>
      </div>
      <img className="mx-auto p-4" src={notfound} alt="notfound" />
    </>
  );
};

export default NotFound;
