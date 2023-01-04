// ToolbarPanel.jsx

import React from "react";
import LayoutContainer from "../LayoutContainer.jsx";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const ToolbarPanel = ({ children, className }: Props) => (
  <div className={["", className].join(" ").trim()}>
    <LayoutContainer>{children}</LayoutContainer>
  </div>
);

export default ToolbarPanel;
