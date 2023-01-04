// LayoutContainer.jsx

import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const LayoutContainer = ({ className, children, ...rest }: Props) => (
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
