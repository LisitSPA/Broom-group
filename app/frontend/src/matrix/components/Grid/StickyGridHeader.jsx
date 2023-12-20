import React from "react";
import FirmsSidebarHeader from "./FirmsSidebarHeader";
import MatrixColTitles from "./MatrixColTitles";

const StickyGridHeader = ({ versions }) => {
  return (
    <div className="flex sticky top-0 z-20">
      <FirmsSidebarHeader versions={versions} />
      <MatrixColTitles />
    </div>
  );
};

export default StickyGridHeader;
