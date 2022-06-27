/* This example requires Tailwind CSS v2.0+ */
import { Children, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
// import { UserCircleIcon } from "@heroicons/react/solid";
import { UserCircleIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import { accountService } from "../../authentication/_services/account.Service";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ShareBtnDropDown() {
  const history = useHistory();

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className=" flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full">
            <UserCircleIcon className=" hover:bg-primary-100 rounded-full" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 z-20 w-40 py-1 mt-0.5 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-md shadow-xl max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
            // className="origin-top-right absolute right-[-190px] sm:right-0  mt-1 w-56 rounded-md shadow-lg text-white bg-white  ring-1 ring-white ring-opacity-5 focus:outline-none"
          >
            <div className="py-1 px-1.5">
              <Menu.Item onClick={() => history.push("/profile")}>
                <p className="rounded flex items-center justify-start hover:bg-primary-50 text-black block px-4 py-2 text-md">
                  Profile
                </p>
              </Menu.Item>

              <Menu.Item onClick={() => history.push("/edit-profile")}>
                <p className="rounded flex items-center justify-start hover:bg-primary-50 text-black block px-4 py-2 text-md">
                  Edit Profile
                </p>
              </Menu.Item>

              <Menu.Item onClick={accountService.logout}>
                <p className="flex items-center justify-start hover:bg-primary-50 text-black block px-4 py-2 text-md">
                  Logout
                </p>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
