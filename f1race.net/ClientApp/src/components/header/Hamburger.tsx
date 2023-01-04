// Hamburger.jsx

import React from "react";

type Props = {
  opened: boolean;
};

const Hamburger = ({ opened }: Props) => {
  return (
    <svg
      className={opened ? "hamburger opened" : "hamburger"}
      width="48px"
      height="48px"
      viewBox="0 0 48 48"
    >
      <path
        id="line1"
        className="line"
        d="M12,15l24,0c7,0 9,9 9,15c0,5 -1.019,7.662 -4,8c-2.933,0.333 -6.515,-3.515 -6.515,-3.515l-20.97,-20.97"
      />
      <path id="line2" className="line" d="M12,24l24,0" />
      <path
        id="line3"
        className="line"
        d="M12,33l24,0c7,0 9,-9 9,-15c0,-5 -1.019,-7.662 -4,-8c-2.933,-0.333 -6.515,3.515 -6.515,3.515l-20.97,20.97"
      />
    </svg>
  );
};

export default Hamburger;
