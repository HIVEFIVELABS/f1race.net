// NavbarLink.jsx

import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLink = ({ to, children }) => {
  return (
    <NavLink
      className="nav-btn"
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default NavbarLink;
