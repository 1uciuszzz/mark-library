import { useReducer } from "react";

import markaContext from "../contexts/markaContext";
import markaReducer from "../reducers/markaReducer";

const MarkaProvider = ({ children }) => {
  const initialState = {
    user: {},
    status: false,
    directories: [],
    bookmarks: [],
    currentDirectory: {},
    currentDirectoryPage: 1,
    currentBookmarkPage: 1,
    publicDirectories: [],
  };

  const [state, dispatch] = useReducer(markaReducer, initialState);
  return (
    <markaContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </markaContext.Provider>
  );
};

export default MarkaProvider;
