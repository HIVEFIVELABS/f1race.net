// ButtonLink.jsx

import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

const ButtonLink = ({ to, children, onClick, className }: Props) => (
  <Link
    className={["btn", className].join(" ").trim()}
    to={to}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default ButtonLink;
