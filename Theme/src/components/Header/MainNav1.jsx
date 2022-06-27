import React, { useState, useEffect } from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import MenuBar from "../MenuBar/MenuBar";
import UserBtnDropDown from "../UserBtnDropDown/UserBtnDropDown";
import { accountService } from "../../authentication/_services/account.Service";

const MainNav1 = ({ isTop }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscription = accountService.user.subscribe((x) => setUser(x));
    return subscription.unsubscribe;
  }, []);

  return (
    <div
      className={`sticky top-0 bg-white nc-MainNav1 relative z-50 ${
        isTop ? "onTop " : "notOnTop backdrop-filter"
      }`}
    >
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <Navigation />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden lg:block items-center xl:flex space-x-1">
            <div className="px-1" />
            {user ? (
              <div className="flex items-center">
                <UserBtnDropDown />
                {/* <p className="font-normal">{user.firstName}</p> */}
              </div>
            ) : null}
          </div>
          <div className="flex items-center lg:hidden">
            {user ? (
              <>
                <UserBtnDropDown />
                {/* <p className="font-normal">{user.firstName}</p> */}
              </>
            ) : null}
            <div className="px-1" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
