import { useState } from "react";

import SearchUser from "../components/SearchUser";
import UserList from "./../components/UserList";

const Users = () => {
  const [users, setUsers] = useState([]);
  return (
    <div>
      <SearchUser />
      {users.length ? <UserList /> : undefined}
    </div>
  );
};

export default Users;
