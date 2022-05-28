const markaReducer = (state, action) => {
  switch (action.type) {
    case "GET_PUBLIC_DIRECTORIES":
      console.log("GET_PUBLIC_DIRECTORIES");
      if (!action.directories) {
        return state;
      }
      return {
        ...state,
        publicDirectories: action.directories,
      };
    case "RESET_BOOKMARK_PAGE":
      console.log("RESET_BOOKMARK_PAGE");
      return {
        ...state,
        currentBookmarkPage: 1,
      };
    case "BOOKMARK_PAGE_INCREMENT":
      console.log("BOOKMARK_PAGE_INCREMENT");
      return {
        ...state,
        currentBookmarkPage: state.currentBookmarkPage + 1,
      };
    case "BOOKMARK_PAGE_DECREMENT":
      console.log("BOOKMARK_PAGE_DECREMENT");
      return {
        ...state,
        currentBookmarkPage: state.currentBookmarkPage - 1,
      };
    case "DIRECTORY_PAGE_INCREMENT":
      console.log("DIRECTORY_PAGE_INCREMENT");
      return {
        ...state,
        currentDirectoryPage: state.currentDirectoryPage + 1,
      };
    case "DIRECTORY_PAGE_DECREMENT":
      console.log("DIRECTORY_PAGE_DECREMENT");
      return {
        ...state,
        currentDirectoryPage: state.currentDirectoryPage - 1,
      };
    case "SET_BOOKMARKS":
      console.log("SET_BOOKMARKS");
      if (!action.bookmarks) {
        return state;
      }
      return {
        ...state,
        bookmarks: action.bookmarks,
      };
    case "DELETE_DIRECTORY":
      console.log("DELETE_DIRECTORY");
      if (!action.directory) {
        return state;
      }
      const deleted_directories = state.directories.filter(
        (directory) => directory.id !== action.directory.id
      );
      return { ...state, directories: deleted_directories };
    case "UPDATE_BOOKMARK":
      console.log("UPDATE_BOOKMARK");
      if (!action.bookmark) {
        return state;
      }
      const updated_bookmarks = state.bookmarks.map((bookmark) => {
        if (bookmark.id === action.bookmark.id) {
          return action.bookmark;
        }
        return bookmark;
      });
      return {
        ...state,
        bookmarks: updated_bookmarks,
      };
    case "DELETE_BOOKMARK":
      console.log("DELETE_BOOKMARK");
      if (!action.b_id) {
        return state;
      }
      const deleted_bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.b_id
      );
      return {
        ...state,
        bookmarks: deleted_bookmarks,
      };
    case "UPDATE_DIRECTORY":
      console.log("UPDATE_DIRECTORY");
      if (!action.directory) {
        return state;
      }
      const updated_directories = state.directories.map((directory) => {
        if (directory.id === action.directory.id) {
          return action.directory;
        }
        return directory;
      });
      return {
        ...state,
        currentDirectory: action.directory,
        directories: updated_directories,
      };
    case "SET_CURRENT_DIRECTORY":
      console.log("SET_CURRENT_DIRECTORY");
      if (!action.directory) {
        return state;
      }
      return {
        ...state,
        currentDirectory: action.directory,
      };
    case "CREATE_BOOKMARK":
      console.log("CREATE_BOOKMARK");
      if (!action.bookmark) {
        return state;
      }
      const new_bookmarks = [...state.bookmarks, action.bookmark];
      return {
        ...state,
        bookmarks: new_bookmarks,
      };
    case "GET_BOOKMARKS_BY_DIRECTORY":
      console.log("GET_BOOKMARKS_BY_DIRECTORY");
      if (!action.bookmarks) {
        return state;
      }
      return {
        ...state,
        bookmarks: action.bookmarks,
      };
    case "GET_USER":
      console.log("GET_USER");
      if (!action.user) {
        return state;
      }
      return {
        ...state,
        user: action.user,
      };
    case "ADD_DIRECTORY":
      if (!action.directory) {
        return state;
      }
      const added_directories = [...state.directories, action.directory];
      return {
        ...state,
        directories: added_directories,
      };
    case "GET_DIRECTORIES":
      console.log("GET_DIRECTORIES");
      if (!action.directories) {
        return state;
      }
      return {
        ...state,
        directories: action.directories,
      };
    case "SIGN_IN":
      console.log("SIGN_IN");
      return {
        ...state,
        status: true,
      };
    case "SIGN_OUT":
      console.log("SIGN_OUT");
      return {
        ...state,
        status: false,
      };
    default:
      return state;
  }
};

export default markaReducer;
