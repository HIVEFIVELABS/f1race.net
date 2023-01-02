// TopToolbar.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserLoginPanel from "./UserLoginPanel";

const TopToolbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-row items-center items-stretch justify-end py-2 text-sm text-black dark:text-white">
      {user && (user.isModerator || user.isAdmin) && (
        <div
          id="admin-nav-container"
          className="my-1 mr-4 flex flex-row items-center justify-end border-r-2 border-r-gray-300 pr-4 dark:border-r-gray-600"
        >
          <Link
            className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
            to="/administrate"
          >
            Administration
          </Link>
        </div>
      )}
      <UserLoginPanel />
    </nav>
  );
};

export default TopToolbar;
