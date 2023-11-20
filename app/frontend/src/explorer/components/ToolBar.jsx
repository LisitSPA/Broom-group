import React, { useState } from "react";
import {
  SearchIcon,
  ChevronDownIcon,
  TableCellsIcon,
} from "../../shared/assets/Icons";
import Firm from "./Firm";
//import { saveAs } from 'file-saver';
import Papa from "papaparse";
const ToolBar = ({ onSearchTermChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const handleSearchChange = (event) => {
    const searchTermValue = event.target.value;
    console.log("Contenido del input:", searchTermValue);
    onSearchTermChange(searchTermValue); // Actualiza el término de búsqueda en Explorer
    setSearchTerm(searchTermValue);
  };
  const handleSelectAllCheckbox = () => {
    //setSelectAllChecked(!selectAllChecked);
    console.log("selectAllChecked actualizado:", !selectAllChecked);
    // Obtener todos los checkboxes con la clase 'checkbox'
    const checkboxes = document.querySelectorAll(".checkbox");

    // Iterar sobre cada checkbox y activarlo
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !selectAllChecked;
    });

    // Actualizar el estado
    setSelectAllChecked(!selectAllChecked);
  };
  const handleExport = () => {
    console.log("llego");
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

    // Convertir datos a formato CSV usando papaparse
    const csvData = Papa.unparse(selectedData, {
      header: true,
    });

    // Crear un objeto Blob con los datos CSV
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

    // Crear un enlace de descarga y hacer clic en él
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported_data.csv";
    link.click();
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
              seleccionar todo
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-1 h-8">
        <button
          className="flex justify-between items-center h-full gap-2 border rounded-md text-sm text-Turquoise px-5 font-medium"
          onClick={handleExport}
        >
          <TableCellsIcon className="h-4 w-4 stroke-2" />
          Exportar selección
        </button>
      </div>
      <Firm searchTerm={searchTerm} selectAllChecked={selectAllChecked} />
    </div>
  );
};

export default ToolBar;
