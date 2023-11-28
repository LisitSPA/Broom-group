import React, { useState } from "react";
import { SearchIcon } from "../../shared/assets/Icons";
import { motion, AnimatePresence } from "framer-motion";
import Firm from "./Firm";
import { openModal } from "@/redux/actions/modal";
import { useDispatch } from "react-redux";
import Papa from "papaparse";

const ToolBar = ({ onSearchTermChange, setFilteredData }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };
  const handleSearchChange = (event) => {
    const searchTermValue = event.target.value;
    onSearchTermChange(searchTermValue);
    // Actualiza el término de búsqueda en Explorer
    setSearchTerm(searchTermValue);
  };

  const handleSelectAllCheckbox = () => {
    // Obtener todos los checkboxes con la clase 'checkbox'
    const checkboxes = document.querySelectorAll(".checkbox");

    // Iterar sobre cada checkbox y activarlo
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !selectAllChecked;
    });

    // Actualizar el estado
    setSelectAllChecked(!selectAllChecked);
  };

  const handleOpenModal = () => {
    dispatch(openModal("modalDownloadExplorer"));
  };

  const handleExport = () => {
    // Obtén todos los checkboxes
    const checkboxes = document.querySelectorAll(".checkbox");
    const selectedCheckboxes = Array.from(checkboxes).filter(
      (checkbox) => checkbox.checked
    );
    const selectedData = Array.from(selectedCheckboxes)
      .map((checkbox) => {
        const firmContainer = checkbox.closest(".flex.justify-between");
        if (firmContainer) {
          const firmRutElement = firmContainer.querySelector("[data-rut]");
          const firmDataCountryCodeElement =
            firmContainer.querySelector("[data-country]");
          if (firmRutElement) {
            const rut = firmRutElement.textContent.trim();
            const dataCountry = firmDataCountryCodeElement.textContent.trim();
            return { rut, dataCountry };
          }
        }
        return null;
      })
      .filter(Boolean);

    setFilteredData(selectedData);
    // // Convertir datos a formato CSV usando papaparse
    // const csvData = Papa.unparse(selectedData, {
    //   header: true,
    // });
    // // Crear un objeto Blob con los datos CSV
    // const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    // // Crear un enlace de descarga y hacer clic en él
    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(blob);
    // link.download = "exported_data.csv";
    // link.click();
  };

  const handlerBulkImportCompanies = () => {
    handleSelectAllCheckbox();
    handleExport();
    handleOpenModal();
  };
  return (
    <div className="flex justify-between w-9/12 items-center mx-auto bg-LightGrayishBlue pt-7 pb-1 sticky top-0 z-30">
      <div className="flex h-8 w-1/2 gap-3">
        <div className="flex w-full">
          <input
            type="text"
            className="border-y border-l rounded-l-md outline-none text-sm px-2 py-1 w-full"
            placeholder="busca por nombre de sociedad u otros campos"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="flex justify-center items-center w-8 border-y border-r rounded-r-md">
            <SearchIcon className="h-4 w-4 stroke-gray-800" />
          </button>
        </div>

        <div className="flex h-full text-xs shrink-0">
          <div className="flex justify-between items-center gap-1">
            <input
              type="checkbox"
              checked={selectAllChecked}
              onChange={handleSelectAllCheckbox}
            />
            <label className="select-none text-gray-700" htmlFor="select_all">
              seleccionar todos los resultados
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center  h-8">
        <button
          className="flex justify-between bg-white items-center h-full gap-2 border rounded-md text-sm text-Turquoise px-5 font-medium"
          onClick={handleOpenModal}
        >
          {"Exportar selección (3 sociedades)"}
        </button>
        <button
          onClick={toggleSelect}
          className="bg-white border rounded-md text-sm px-4 py-2 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M9.75 4.125L6 7.875L2.25 4.125"
              stroke="#00A896"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="bg-white border shadow-md rounded-md p-5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: "70px",
                zIndex: 999,
                textAlign: "right",
              }}
            >
              <div className="flex flex-col gap-5">
                <p className="text-gray-700 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
                  exportar solo sociedades finales
                </p>
                <p className="text-gray-700 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
                  exportar solo stockholders
                </p>
                <hr className="border-b-2 border-gray-300" />
                <div
                  className="flex justify-center items-center text-gray-700 hover:text-teal-600 transition-colors duration-300 cursor-pointer"
                  onClick={handlerBulkImportCompanies}
                >
                  <p className="w-full">importación masiva de sociedades</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M9.75 7.125V5.8125C9.75 5.36495 9.57221 4.93573 9.25574 4.61926C8.93928 4.30279 8.51005 4.125 8.0625 4.125H7.3125C7.16332 4.125 7.02024 4.06574 6.91475 3.96025C6.80926 3.85476 6.75 3.71168 6.75 3.5625V2.8125C6.75 2.36495 6.57221 1.93572 6.25574 1.61926C5.93927 1.30279 5.51005 1.125 5.0625 1.125H4.125M7.5 7.125L6 5.625M6 5.625L4.5 7.125M6 5.625V8.625M5.25 1.125H2.8125C2.502 1.125 2.25 1.377 2.25 1.6875V10.3125C2.25 10.623 2.502 10.875 2.8125 10.875H9.1875C9.498 10.875 9.75 10.623 9.75 10.3125V5.625C9.75 4.43153 9.27589 3.28693 8.43198 2.44302C7.58807 1.59911 6.44347 1.125 5.25 1.125Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Firm searchTerm={searchTerm} selectAllChecked={selectAllChecked} />
    </div>
  );
};

export default ToolBar;
