import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpLong,
  faArrowDownLong,
} from "@fortawesome/free-solid-svg-icons";
import millify from "millify";
import LoadingVideo from "../../components/LoadingVideo/LoadingVideo";

const PageTopDomains = ({ insights }) => {
  const data = useMemo(() => {
    return insights?.top_domians_by_most_articles_published.buckets.map(
      (item) => {
        return {
          key: item.key.substring(0, 30),
          doc_count: millify(item.doc_count, { precision: 2 }),
          total_engagment: millify(item["total engagment"].value, {
            precision: 2,
          }),
          avg_engagment: millify(item["avg engagment"].value, { precision: 2 }),
        };
      }
    );
  }, []);

  // console.log(data);
  const columns = useMemo(
    () => [
      {
        Header: "Websites",
        accessor: "key",
      },
      {
        Header: "Total Articles",
        accessor: "doc_count",
      },
      {
        Header: "Total Engagement",
        accessor: "total_engagment",
      },
      {
        Header: "Avg. Engagement",
        accessor: "avg_engagment",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );
  // const firstPageRows = rows.slice(0, 20);
  const firstPageRows = rows;

  if (!insights) {
    return (
      <div className="flex justify-center items-center mt-4">
        <LoadingVideo />
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="p-3 mx-1 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
          <div className="border border-slate-300 rounded-xl overflow-x-scroll">
            <table {...getTableProps()} className="w-full">
              <thead className="border-b border-slate-300">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      // Add the sorting props to control sorting. For this example
                      // we can add them into the header props
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className="py-4"
                      >
                        <div className="flex justify-start items-center px-4 text-xs sm:text-sm">
                          {column.render("Header")}
                          {/* Add a sort direction indicator */}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <div className="ml-2 flex justify-center items-center">
                                  <FontAwesomeIcon
                                    icon={faArrowUpLong}
                                    className="text-xs sm:text-sm text-slate-400"
                                  />
                                  <FontAwesomeIcon
                                    icon={faArrowDownLong}
                                    className="text-xs sm:text-sm"
                                  />
                                </div>
                              ) : (
                                <div className="ml-2 flex justify-center items-center">
                                  <FontAwesomeIcon
                                    icon={faArrowUpLong}
                                    className="text-xs sm:text-sm"
                                  />
                                  <FontAwesomeIcon
                                    icon={faArrowDownLong}
                                    className="text-xs sm:text-sm text-slate-400"
                                  />
                                </div>
                              )
                            ) : (
                              <div className="ml-2 flex justify-center items-center">
                                <FontAwesomeIcon
                                  icon={faArrowUpLong}
                                  className="text-xs sm:text-sm"
                                />
                                <FontAwesomeIcon
                                  icon={faArrowDownLong}
                                  className="text-xs sm:text-sm"
                                />
                              </div>
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {firstPageRows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="text-xs sm:text-sm border-b border-slate-300"
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} className="px-4 py-2">
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageTopDomains;
