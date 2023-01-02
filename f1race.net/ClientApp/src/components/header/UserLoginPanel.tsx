// UserLoginPanel.jsx

import React from "react";
import {useLocation} from "react-router-dom";
import {
  LoggedUserDropdownMenuProvider
} from "../../features/ui/loggedUserDropdownMenu/LoggedUserDropdownMenuContext.jsx";
import LoggedUserDropdown from "../../features/ui/loggedUserDropdownMenu/LoggedUserDropdown.jsx";
import ToolbarLink from "./ToolbarLink.jsx";
import {UserCircleIcon} from "@heroicons/react/20/solid/index.js";
import {useSelector} from "react-redux";

const UserLoginPanel = () => {
  const {user} = useSelector((state) => state.auth);
  const {pathname} = useLocation();

  return (
    <>
      {user ? (
        <>
          <LoggedUserDropdownMenuProvider>
            <LoggedUserDropdown/>
          </LoggedUserDropdownMenuProvider>
        </>
      ) : (
        <>
          <ToolbarLink to="/login" state={{redirectTo: pathname ?? null}}>
            <UserCircleIcon className="icon"/>
            Sign in
          </ToolbarLink>
        </>
      )}
    </>
  );
};

export default UserLoginPanel;
