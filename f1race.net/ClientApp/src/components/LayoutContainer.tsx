// LayoutContainer.jsx

import React from "react";

const LayoutContainer = ({ className, children, ...rest }) => (
  <div
    className={[
      "mx-auto flex w-full max-w-7xl grow flex-col content-center justify-start px-4 2xl:px-0",
      className,
    ]
      .join(" ")
      .trimEnd()}
    {...rest}
  >
    {children}
  </div>
);

export default LayoutContainer;
