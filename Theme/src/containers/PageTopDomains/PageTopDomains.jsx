import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";

const PageTopDomains = ({ insights }) => {
  const data = useMemo(
    () => insights?.top_domians_by_most_articles_published.buckets,
    []
  );

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
                        <div className="flex justify-start px-2">
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                            : ""}
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
                          className="px-2 py-2"
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

export default PageTopDomains;
