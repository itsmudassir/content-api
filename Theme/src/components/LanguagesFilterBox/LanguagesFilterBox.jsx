import React, { FC } from "react";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import ButtonDropdown from "../../components/ButtonDropdown/ButtonDropdown";
import { useSearchkit } from "@searchkit/client";
import queryString from "query-string";
import { useHistory } from "react-router-dom";


const LanguagesFilterBox = ({ className = "", lists }) => {
  const history = useHistory();
  const api = useSearchkit();
  var lan = api.getFiltersByIdentifier("language");
  var lanName = lan.map((val) => val.value);
  const [selected, setSelected] = useState(null);
  const currentQueryParams = queryString.parse(window.location.search);

  const handelOnChange = (e) => {
    // var selected = e;

    // if (selectedGlobal == selected?.label) {
    //   setSelectedGlobal(null);
    // } else {
    //   setSelectedGlobal(selected?.label);
    // }

    // if (selected) {
    //   api.toggleFilter({
    //     identifier: "language",
    //     value: selected?.label,
    //   });

    //   api.setPage({ size: 20, from: 0 });
    //   api.search();
    // }
    setSelected(e);
    const newQueryParams = {
      ...currentQueryParams,
      language : e.label
    }
    history.push({
      pathname: "/discover/discover_search",
      search: queryString.stringify(newQueryParams),
    });
    
  };
  return (
    <>
      <div
        className={`nc-ArchiveFilterListBox ${className}`}
        data-nc-id="ArchiveFilterListBox"
      >
        <Listbox value={"All Languages"} onChange={(e) => handelOnChange(e)}>
          <div className="relative md:min-w-[200px]">
            <Listbox.Button as={"div"}>
              {/* <ButtonDropdown>{selected?.label}</ButtonDropdown> */}
              <ButtonDropdown>
                {selected? "Language : " + selected.label
                  : "Choose language"}
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
    </>
  );
};

export default LanguagesFilterBox;
