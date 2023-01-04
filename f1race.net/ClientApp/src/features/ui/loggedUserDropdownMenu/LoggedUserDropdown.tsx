// LoggedUserDropdown.jsx

import React from "react";

import { useLoggedUserDropdownMenuContext } from "./LoggedUserDropdownMenuContext.jsx";
import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid/index.js";
import DropdownLink from "../../../components/dropdown/DropdownLink.jsx";
import { logout } from "../../auth/authSlice.jsx";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "../../../hooks/useOutsideClick.jsx";
import { Link } from "react-router-dom";
import { useUserContext } from "../../auth/UserContext";

const LoggedUserDropdown = () => {
  const { user } = useUserContext();
  const dropdownMenu = useLoggedUserDropdownMenuContext();
  const dispatch = useDispatch();

  const menuRef = useOutsideClick(() => {
    dropdownMenu.hide();
  });

  return (
    <div className="flex flex-row items-center justify-center" ref={menuRef}>
      {user && (
        <>
          <Link
            to="#"
            onClick={dropdownMenu.toggle}
            className={[
              "btn btn-outline muted z-10",
              dropdownMenu.isOpen ? "selected" : "",
            ]
              .join(" ")
              .trimEnd()}
          >
            <UserCircleIcon className="icon" />
            {user.nickname}
          </Link>
          <div className="fixed top-[3.75rem] z-50 perspective-1000">
            <ul
              className={[
                "pointer-events-none right-0 z-50 flex origin-top -translate-y-5 flex-col whitespace-nowrap rounded bg-gray-300 py-2 text-black opacity-0 shadow-xl transition-all duration-300 ease-out -rotate-x-30 before:absolute before:-top-2 before:left-1/2 before:w-1 before:-translate-x-1/2 before:border-x-8 before:border-b-8 before:border-t-0 before:border-solid before:border-x-transparent before:border-b-gray-300 dark:bg-gray-600 dark:before:border-b-gray-600 [&.opened]:pointer-events-auto [&.opened]:max-h-[500px] [&.opened]:translate-y-0 [&.opened]:opacity-100 [&.opened]:rotate-x-0",
                dropdownMenu.isOpen ? "opened" : "",
              ]
                .join(" ")
                .trimEnd()}
            >
              <li>
                <DropdownLink
                  to={`/user/${user.nickname}`}
                  iconElement={<UserIcon />}
                  text="Profile"
                />
              </li>

              <li>
                <DropdownLink
                  to={`/settings`}
                  iconElement={<Cog6ToothIcon />}
                  text="Settings"
                />
              </li>

              <hr className="mx-3 border-gray-700" />

              <li>
                <DropdownLink
                  to="#"
                  onClick={() => {
                    dropdownMenu.hide();
                    return dispatch(logout());
                  }}
                  iconElement={<ArrowRightOnRectangleIcon />}
                  text="Sign out"
                />
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default LoggedUserDropdown;
