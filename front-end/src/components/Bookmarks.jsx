import { FaInfoCircle } from "react-icons/fa";
import { useContext } from "react";

import markaContext from "../contexts/markaContext";
import DeleteBookmark from "./DeleteBookmark";
import EditBookmark from "./EditBookmark";
import Pagination from "./Pagination";

const Bookmarks = () => {
  const { bookmarks, currentBookmarkPage } = useContext(markaContext);
  return (
    <>
      {bookmarks.length === 0 ? (
        <div className="alert alert-info rounded-lg">
          <div>
            <FaInfoCircle size={32} />
            <span>You have none bookmarks in this directory!</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {bookmarks
            .slice((currentBookmarkPage - 1) * 5, currentBookmarkPage * 5)
            .map((bookmark) => {
              return (
                <div className="alert shadow-md" key={bookmark.id}>
                  <div>
                    <div>
                      <a
                        className="text-lg font-bold text-secondary"
                        href={bookmark.url}
                        target="_blank"
                      >
                        {bookmark.name}
                      </a>
                      <div className="text-xs text-gray-400">
                        {bookmark.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <EditBookmark bookmark={bookmark} />
                    <DeleteBookmark b_id={bookmark.id} />
                  </div>
                </div>
              );
            })}
          <Pagination
            type={"BOOKMARK"}
            currentPage={currentBookmarkPage}
            data={bookmarks}
          />
        </div>
      )}
    </>
  );
};
export default Bookmarks;
