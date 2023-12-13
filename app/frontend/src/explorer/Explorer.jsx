import React, { useState } from "react";
import { Sidebar } from "@/src/shared";

import ToolBar from "./components/ToolBar";
import FirmContainer from "./components/FirmContainer";
import { useSelector } from "react-redux";
import { ModalDownload } from "./components/ModalDownload";
import { ModalLoading } from "./components/ModalLoading";

const Explorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [level, setLevel] = useState("all");
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
            setLevel={setLevel}
          />
          <FirmContainer searchTerm={searchTerm} level={level} />
        </div>
      </div>
      {/* Se agrego un condicional para mostrar el modal de loading */}
      {typeModal === "modalLoading" && <ModalLoading />}
      {typeModal === "modalDownloadExplorer" && (
        <ModalDownload data={filteredData} />
      )}
    </>
  );
};

export default Explorer;
