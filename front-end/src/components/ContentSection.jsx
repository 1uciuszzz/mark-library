import { useContext } from "react";

import defaultBanner from "../assets/undraw_wishlist_re_m7tv.svg";
import bookmarkListBanner from "../assets/undraw_bookmarks_re_mq1u.svg";
import markaContext from "../contexts/markaContext";
import Bookmarks from "./Bookmarks";
import AddBookmark from "./AddBookmark";
import EditDirectory from "./EditDirectory";

const ContentSection = () => {
  const { currentDirectory } = useContext(markaContext);
  return Object.keys(currentDirectory).length === 0 ? (
    <figure className="flex">
      <img src={defaultBanner} alt="default banner" />
    </figure>
  ) : (
    <div className="card shadow-md w-8/12">
      <div className="card-body">
        <div className="card card-side">
          <figure className="w-6/12">
            <img src={bookmarkListBanner} alt="bookmark list banner" />
          </figure>
          <div className="card-body bg-secondary text-secondary-content">
            <h2 className="card-title">{currentDirectory.name}</h2>
            <p>{currentDirectory.description}</p>
          </div>
        </div>
        <div className="card bg-secondary">
          <div className="card-body">
            <div className="card-actions justify-between">
              <AddBookmark />
              <EditDirectory />
            </div>
          </div>
        </div>
        <Bookmarks />
      </div>
    </div>
  );
};

export default ContentSection;
