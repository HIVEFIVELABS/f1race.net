// ToolbarLink.jsx

import React from "react";
import {Link} from "react-router-dom";

const ToolbarLink = ({className, children, ...rest}) => {
  const classNames = [
    "btn flex flex-row flex-nowrap items-center justify-center whitespace-nowrap",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <Link className={classNames} {...rest}>
      {children}
    </Link>
  );
};

export default ToolbarLink;
