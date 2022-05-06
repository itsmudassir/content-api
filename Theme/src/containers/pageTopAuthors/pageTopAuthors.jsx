import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong, faArrowDownLong } from "@fortawesome/free-solid-svg-icons"

const PageTopAuthors = ({ insights }) => {
  const data = useMemo(
    () => insights?.top_authors_by_most_articles_published.buckets,
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Author Name",
        accessor: "key",
      },
      {
        Header: "Total Articles",
        accessor: "doc_count",
      },
      {
        Header: "Total Engagement",
        accessor: "total engagment.value",
      },
      {
        Header: "Avg. Engagement",
        accessor: "avg engagment.value",
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

  return (
    <>
      <div className="w-screen">
        <div className="p-3 mx-4 sm:mx-8 my-4 sm:my-5 shadow-xl rounded-xl bg-slate-100">
          <div className="border border-slate-300 rounded-xl">
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
                        <div className="flex justify-start items-center px-4">
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                            ? (
                              <div className="ml-2 flex justify-center items-center">
                                <FontAwesomeIcon icon={faArrowUpLong} className="text-sm text-slate-400"/>
                                <FontAwesomeIcon icon={faArrowDownLong} className="text-sm" />
                              </div>
                            )
                            : (
                              <div className="ml-2 flex justify-center items-center">
                                <FontAwesomeIcon icon={faArrowUpLong} className="text-sm"/>
                                <FontAwesomeIcon icon={faArrowDownLong} className="text-sm text-slate-400" />
                              </div>
                            )
                            :(
                              <div className="ml-2 flex justify-center items-center">
                                <FontAwesomeIcon icon={faArrowUpLong} className="text-sm"/>
                                <FontAwesomeIcon icon={faArrowDownLong} className="text-sm" />
                              </div>
                            ) 
                            }
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
                    <tr {...row.getRowProps()} className="border-b border-slate-200">
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}
                          className="px-4 py-2"
                          >
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

export default PageTopAuthors;
