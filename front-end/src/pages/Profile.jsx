import { useContext } from "react";
import {
  FaRegWindowMinimize,
  FaTired,
  FaPaperPlane,
  FaLaughSquint,
  FaCalendarDay,
} from "react-icons/fa";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import markaContext from "../contexts/markaContext";

const Profile = () => {
  const { user } = useContext(markaContext);
  return (
    <div className="card shadow-md">
      <div className="card-body">
        {
          <>
            <h2
              className="card-title tooltip tooltip-right w-fit"
              data-tip="click to copy"
            >
              <FaRegWindowMinimize />:
              <a
                className="link"
                onClick={(e) => {
                  navigator.clipboard.writeText(user.id);
                  toast.success("copied id to the clipboard", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                }}
              >
                {user.id}
              </a>
            </h2>
            <p className="flex items-center">
              <FaTired className="mr-2" />
              <span className="badge">Name</span>
              <span className="ml-2 font-mono">{user.name}</span>
            </p>
            <p className="flex items-center">
              <FaPaperPlane className="mr-2" />
              <span className="badge">Email</span>
              <span className="ml-2 font-mono">{user.email}</span>
            </p>
            <p className="flex items-center">
              <FaLaughSquint className="mr-2" />
              <span className="badge">Role</span>
              <span className="ml-2 font-mono">{user.role}</span>
            </p>
            <p className="flex items-center">
              <FaCalendarDay className="mr-2" />
              <span className="badge">Join Date</span>
              <span className="ml-2 font-mono">{user.join_date}</span>
            </p>
          </>
        }
      </div>
    </div>
  );
};

export default Profile;
