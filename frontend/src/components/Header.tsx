import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo/logo.svg";

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
};

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white shadow-md dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="flex grow justify-end items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- TODO implement this dark mode switcher --> */}
            {/* <DarkModeSwitcher /> */}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
