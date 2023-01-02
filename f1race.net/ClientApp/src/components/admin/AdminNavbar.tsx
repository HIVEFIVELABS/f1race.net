// AdminNavbar.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid/index.js";
import UserLoginPanel from "../header/UserLoginPanel.jsx";
import Logo from "../header/Logo.jsx";

const AdminNavbar = () => {
  return (
    <div className="flex flex-row items-center justify-between border-b-2 border-b-race-red bg-gray-200 px-4 py-2 dark:bg-black">
      <nav className="flex w-full grow flex-row items-center">
        <Link
          className="focus-visible-offset-dark group flex flex-row items-center hover:text-white"
          to="/"
        >
          <ChevronLeftIcon className="h-6 w-6" />
          <Logo className="logo ml-2 h-4" />
        </Link>
      </nav>
      <div id="right-section" className="ml-4 flex flex-row items-center">
        <UserLoginPanel />
      </div>
    </div>
  );
};

export default AdminNavbar;
