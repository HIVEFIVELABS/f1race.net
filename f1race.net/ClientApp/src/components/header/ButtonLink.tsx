// ButtonLink.jsx

import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({ to, children }) => (
  <Link className="btn" to={to}>
    {children}
  </Link>
);

export default ButtonLink;
