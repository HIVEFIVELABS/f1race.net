// NavbarLink.jsx

import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  children?: React.ReactNode;
  className?: string;
};

const NavbarLink = ({ to, children, className }: Props) => {
  return (
    <NavLink className={["nav-btn", className].join(" ").trim()} to={to}>
      {children}
    </NavLink>
  );
};

export default NavbarLink;
