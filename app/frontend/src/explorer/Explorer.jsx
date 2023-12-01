import React, { useState } from "react";
import { Sidebar } from "@/src/shared";

import ToolBar from "./components/ToolBar";
import FirmContainer from "./components/FirmContainer";
import { useSelector } from "react-redux";
import { ModalDownload } from "./components/ModalDownload";

const Explorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const typeModal = useSelector((state) => state.modal.modalType);
  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };
  return (
    <>
      <Sidebar />
      <div className="w-full h-screen overflow-auto bg-LightGrayishBlue">
        <div className="container mx-auto">
          <ToolBar
            setFilteredData={setFilteredData}
            filteredData={filteredData}
            onSearchTermChange={handleSearchTermChange}
          />
          <FirmContainer searchTerm={searchTerm} />
        </div>
      </div>
      {typeModal === "modalDownloadExplorer" && (
        <ModalDownload data={filteredData} />
      )}
    </>
  );
};

export default Explorer;
