import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

export default function ShareBtnDropDown({ cardData }) {
  const url = cardData?.fields?.url || cardData?.url;
  const title = cardData?.fields?.title || cardData?.title;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button  className="flex-shrink-0 flex items-center justify-center focus:outline-none h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
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
        <Menu.Items className="origin-top-right absolute right-[-190px] sm:right-0  mt-1 w-56 rounded-md shadow-lg text-white bg-neutral-900  ring-1 ring-white ring-opacity-5 focus:outline-none">
          <div className="py-1 px-1.5">
            <Menu.Item>
              <FacebookShareButton className="w-full" url={url} title={title}>
                <p className="rounded flex items-center justify-start hover:bg-neutral-800 text-white block px-4 py-2 text-md">
                  facebook
                </p>
              </FacebookShareButton>
            </Menu.Item>

            <Menu.Item>
              <TwitterShareButton className="w-full" url={url} title={title}>
                <p className="flex items-center justify-start hover:bg-neutral-800 text-white block px-4 py-2 text-md">
                  twitter
                </p>
              </TwitterShareButton>
            </Menu.Item>

            <Menu.Item>
              <LinkedinShareButton className="w-full" url={url} title={title}>
                <p className="flex items-center justify-start hover:bg-neutral-800 text-white block px-4 py-2 text-md">
                  linkedin
                </p>
              </LinkedinShareButton>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
