// Path: frontend/src/components/images/LoadingCircle.jsx

import React from "react";

type Props = {
  className?: string;
};

export const LoadingCircle = ({ className, ...rest }: Props) => {
  return (
    <div
      id="loader"
      className={["h-[2rem] w-[2rem]", className].join(" ").trim()}
    >
      <svg className="circular-loader" viewBox="0 0 32 32">
        <circle className="loader-path" cx="16" cy="16" r="15" fill="none" />
      </svg>
    </div>
  );
};

export default LoadingCircle;
