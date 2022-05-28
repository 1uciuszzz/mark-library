import { useContext } from "react";

import markaContext from "../contexts/markaContext";

const Pagination = ({ type, currentPage, data }) => {
  const { dispatch } = useContext(markaContext);
  const handlePageIncrement = () => {
    dispatch({
      type: `${type}_PAGE_INCREMENT`,
    });
  };
  const handlePageDecrement = () => {
    dispatch({
      type: `${type}_PAGE_DECREMENT`,
    });
  };
  return (
    <div className="btn-group">
      <button
        onClick={handlePageDecrement}
        className={
          currentPage <= 1
            ? "btn btn-outline btn-disabled w-6/12"
            : "btn btn-outline w-6/12"
        }
      >
        prev
      </button>
      <button
        onClick={handlePageIncrement}
        className={
          currentPage >= Math.ceil(data.length / 5)
            ? "btn btn-outline btn-disabled w-6/12"
            : "btn btn-outline w-6/12"
        }
      >
        next
      </button>
    </div>
  );
};
export default Pagination;
