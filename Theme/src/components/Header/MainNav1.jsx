import React,{useState, useEffect} from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "../Button/ButtonPrimary";
import MenuBar from "../MenuBar/MenuBar";
import DarkModeContainer from "../../containers/DarkModeContainer/DarkModeContainer";
// export interface MainNav1Props {
//   isTop: boolean;
// }

const MainNav1 = ({ isTop }) => {
  

  return (
    <div
      className={`nc-MainNav1 relative z-10 ${
        isTop ? "onTop " : "notOnTop backdrop-filter"
      }`}
    >
      <div  className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <Navigation />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            {/* <DarkModeContainer /> */}
            {/* <SearchDropdown /> */}
            <div className="px-1" />
            <ButtonPrimary href="/login">Sign up</ButtonPrimary>
          </div>
          <div  className="flex items-center xl:hidden">
            <ButtonPrimary href="/login">Sign up</ButtonPrimary>
            <div className="px-1" />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
