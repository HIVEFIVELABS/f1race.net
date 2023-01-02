// StickyHeader.jsx

import React from "react";
import Navbar from "./Navbar.jsx";
import ToolbarPanel from "./ToolbarPanel.jsx";
import TopToolbar from "./TopToolbar.jsx";

const StickyHeader = () => {
  return (
    <header className="sticky top-0 z-40 flex w-full flex-col items-stretch justify-between self-start">
      <ToolbarPanel className="bg-default hidden md:flex">
        <TopToolbar />
      </ToolbarPanel>
      <ToolbarPanel className="border-b-8 border-race-red bg-gray-200 dark:bg-black ">
        <Navbar />
      </ToolbarPanel>
    </header>
  );
};

export default StickyHeader;
