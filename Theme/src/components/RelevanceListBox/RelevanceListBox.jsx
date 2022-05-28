import React, { FC } from "react";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import ButtonDropdown from "../../components/ButtonDropdown/ButtonDropdown";
import { useSearchkit } from "@searchkit/client";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const RelevanceListBox = ({ className = "", lists }) => {
  let history = useHistory();
  const [selected, setSelected] = useState(null);
  const currentQueryParams = queryString.parse(window.location.search);

  //   const location = useLocation();

  //   // const {path, url} = useRouteMatch();
  //   // const history = useHistory();

  //   const api = useSearchkit();

  //   let query = useQuery();

  //   var sortStateGlobal=query.get("sort")

  //   const [selected, setSelected] = useState(sortStateGlobal||"relevance");

  //   useEffect(() => {

  //  setSelected(sortStateGlobal)

  //  }, [query]);

  const handelOnChange = (e) => {
    console.log(e)
    setSelected(e);
    const newQueryParams = {
      ...currentQueryParams,
      sortBy: e.id,
    };
    history.push({
      pathname: "/discover/discover_search",
      search: queryString.stringify(newQueryParams),
    });

    // var selected=e

    // if (selected==selected?.label){
    //   setSelected("relevance")

    // }
    // else{
    //   setSelected(selected?.label)

    // }

    // if(selected){
    //   let searchParams = new URLSearchParams(window.location.search);

    //   const params = new URLSearchParams({'sort': selected?.id });
    //   history.replace({ pathname: location.pathname, search: searchParams.toString()+"&"+params.toString() });

    // //   const queryParams = new URLSearchParams(window.location.search)
    // //   const category = queryParams.get("customCateogry")
    // //   const customQuery = queryParams.get("customQuery")
    // //   var oldParams=""
    // //   if(category){
    // //     oldParams=oldParams+'customCateogry='+category
    // //   }
    // //   if(customQuery){
    // //     oldParams=oldParams+'customQuery='+customQuery
    // //   }

    // //   history.push({
    // //     pathname: '/discover/discover_content',
    // //     search: '?'+'sort='+selected?.id,
    // // });

    // api.setSortBy(selected?.id);
    // api.setPage({ size: 20, from: 0 });
    // api.search();

    // }
  };

  return (
    <div
      className={`nc-ArchiveFilterListBox ${className}`}
      data-nc-id="ArchiveFilterListBox"
    >
      <Listbox value={selected} onChange={(e) => handelOnChange(e)}>
        <div className="relative ">
          <Listbox.Button as={"div"}>
            <ButtonDropdown className="border border-slate-300">
              {selected ? selected.label : "Sort By"}
            </ButtonDropdown>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute right-0 z-20 w-52 py-1 mt-1 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-700">
              {lists?.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-primary-700 dark:text-neutral-200 bg-primary-50 dark:bg-neutral-700"
                        : ""
                    } cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {item.label}
                      </span>
                      {selected ? (
                        <span className="text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default RelevanceListBox;
