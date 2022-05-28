const Collapse = ({ directory }) => {
  return (
    <div className="collapse group shadow-md" tabIndex={"0"}>
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-neutral text-neutral-content peer-checked:bg-base-200 peer-checked:text-base-content">
        {directory.name}
        <span className="text-sm text-gray-400 italic ml-2">
          {directory.description}
        </span>
      </div>
      <div className="collapse-content peer-checked:bg-base-200 peer-checked:text-base-content">
        <div className="flex flex-wrap gap-2">
          {directory.bookmarks.map((bookmark) => {
            return (
              <a
                key={bookmark.id}
                href={bookmark.url}
                target="_blank"
                className="btn btn-outline"
              >
                {bookmark.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collapse;
