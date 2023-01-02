// ToolbarPanel.jsx

import React from "react";
import LayoutContainer from "../LayoutContainer.jsx";

const ToolbarPanel = ({ children, className }) => (
  <div className={["", className].join(" ").trim()}>
    <LayoutContainer>{children}</LayoutContainer>
  </div>
);

export default ToolbarPanel;
