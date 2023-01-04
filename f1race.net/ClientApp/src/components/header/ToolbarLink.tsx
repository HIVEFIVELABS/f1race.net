// ToolbarLink.jsx

import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  className?: string;
  children?: React.ReactNode;
  state?: any;
};

const ToolbarLink = ({ to, state, className, children, ...rest }: Props) => {
  return (
    <Link
      to={to}
      state={state}
      className={[
        "btn flex flex-row flex-nowrap items-center justify-center whitespace-nowrap",
        className,
      ]
        .join(" ")
        .trim()}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default ToolbarLink;
