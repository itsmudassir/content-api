import Pagination from "react-pagination-js";
import { useSearchkit } from "@searchkit/client";
import "react-pagination-js/dist/styles.css";
import "./style.css";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { subQuarters } from "date-fns";

const CustomPagination = ({ data }) => {
  const api = useSearchkit();
  const history = useHistory();
  const currentQueryParams = queryString.parse(window.location.search);

  const topButton = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Pagination
        currentPage={data?.hits.page.pageNumber + 1}
        onClick={topButton()}
        totalSize={data?.hits.page.total}
        sizePerPage={data?.hits.page.size}
        changeCurrentPage={(currentPage) => {
          const newQueryParams = {
            ...currentQueryParams,
            page: currentPage,
          };
          history.push({
            search: queryString.stringify(newQueryParams),
          });
        }}
        theme="bootstrap"
      />
    </div>
  );
};

export default CustomPagination;
