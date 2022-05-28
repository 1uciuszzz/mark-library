import {
  FaUserCircle,
  FaEnvelope,
  FaIdCard,
  FaCalendarAlt,
} from "react-icons/fa";
const UserInfo = ({ user }) => {
  return (
    <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content w-4/12">
      <figure className="pt-4">
        <FaUserCircle size={32} />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{user.name}</h2>
        <a href={`mailto:${user.email}`} className="flex items-center">
          <FaEnvelope className="mr-2" size={16} />
          {user.email}
        </a>
        <p className="flex items-center">
          <FaIdCard className="mr-2" size={16} />
          {user.role}
        </p>
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2" size={16} />
          {user.join_date}
        </p>
      </div>
    </div>
  );
};
export default UserInfo;
