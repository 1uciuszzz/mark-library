import { useState } from "react";

import { FaSearch } from "react-icons/fa";

const SearchUser = () => {
  const [input, setInput] = useState("");
  return (
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Input user name to search user..."
          className="input input-bordered w-6/12"
        />
        <button className="btn btn-square w-1/12">
          <FaSearch size={24} />
        </button>
      </div>
    </div>
  );
};
export default SearchUser;
