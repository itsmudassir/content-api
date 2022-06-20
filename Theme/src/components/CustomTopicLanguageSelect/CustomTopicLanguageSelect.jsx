import React, { FC } from "react";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import ButtonDropdown from "../ButtonDropdown/ButtonDropdown";
import { list } from "postcss";

const CustomTopicLanguageSelect = ({ className, lists, setlanguage }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {

    if(lists?.length == 1 && selected !== null){
      setlanguage(null);
    }
    else if (selected) {
      setlanguage(selected.label);
    }
    // console.log(selected?.label);
  }, [selected]);

  return (
    <>
      <div
        className={`nc-ArchiveFilterListBox ${className}`}
        data-nc-id="ArchiveFilterListBox"
      >
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative md:min-w-[200px]">
            <Listbox.Button as={"div"}>
              {/* <ButtonDropdown>{selected?.label}</ButtonDropdown> */}
              <ButtonDropdown onClick={(e) => e.preventDefault()}>
                {selected ? selected.label : "Choose language"}
              </ButtonDropdown>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-20 w-52 py-1 mt-1 overflow-auto text-sm text-neutral-900 bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {lists?.length == 1 && selected == null
                  ? lists?.map((item, index) => (
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
                              className={`flex justify-between items-center ${
                                selected ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                             Remove {item.label} 
                             <XIcon  className="w-5 h-5 text-slate-600"/>
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))
                  : lists?.map((item, index) => (
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
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
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

export default CustomTopicLanguageSelect;
