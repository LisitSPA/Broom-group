import React, { useState } from "react";
import { SearchIcon } from "../../shared/assets/Icons";
import { motion, AnimatePresence } from "framer-motion";
import Firm from "./Firm";
import { openModal } from "@/redux/actions/modal";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { SnackbarUtilities } from "@/src/helpers/snackbar-manager";

const ToolBar = ({ onSearchTermChange, setFilteredData, filteredData }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const numberOfCompanies =
    filteredData && filteredData.length > 0
      ? `(${filteredData.length} sociedades)`
      : "";
  const buttonText = `Exportar Selección ${numberOfCompanies}`;

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };
  const handleSearchChange = (event) => {
    const searchTermValue = event.target.value;
    onSearchTermChange(searchTermValue);
    // Actualiza el término de búsqueda en Explorer
    setSearchTerm(searchTermValue);
  };

  const handleSelectAllCheckbox = (origin) => {
    // Obtener todos los checkboxes con la clase 'checkbox'
    const checkboxes = document.querySelectorAll(".checkbox");
    // Iterar sobre cada checkbox y activarlo
    checkboxes.forEach((checkbox) => {
      // checkbox.checked = !selectAllChecked;
      // FIXED: Se condiciona deacuerdo a su origen para que no altere el estado
        checkbox.checked = origin === 'fc' ? true : !selectAllChecked;
    });

    // Actualizar el estado
      // setSelectAllChecked(!selectAllChecked);
      // FIXED: Se condiciona deacuerdo a su origen para que no altere el estado
      setSelectAllChecked(origin === 'fc' ? true : !selectAllChecked);
  };

  const handleSelectCheckbox = (origin) => {
    // Obtener todos los checkboxes con la clase 'checkbox'
    const checkboxes = document.querySelectorAll(".checkbox:checked");
    // Iterar sobre cada checkbox y activarlo
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !selectAllChecked;
    });

    // Actualizar el estado
    // setSelectAllChecked(!selectAllChecked);
  };

  // LOADING: Función para abrir el modal de carga
  const handleOpenLoading = () => {
    dispatch(openModal("modalLoading"));
  };

  const handleOpenModal = () => {
    dispatch(openModal("modalDownloadExplorer"));
  };

  const fetchFirmData = async (id) =>{
    let path = window.location.href;
    const resultData = await axios.get(`${path}api/v1/firms/${id}`);
    return resultData.data; 
  }

  const sumarAdjacencyListPorId = (objeto, id) => {
    const adjacencyList = objeto.ownersMap.adjacencyList;
  
    // Verificar si el ID existe en el adjacencyList
    if (adjacencyList.hasOwnProperty(id)) {
      const subAdjacencyList = adjacencyList[id];
  
      // Obtenemos los valores y los sumamos
      const suma = Object.values(subAdjacencyList).reduce((acumulador, valor) => acumulador + valor, 0);
  
      return suma;
    } else {
      console.error(`El ID ${id} no existe en el adjacencyList.`);
      return null;
    }
  }

  const handleExportStokHolders = async (selectedCheckboxes) => {
    let selectedData = [];
    handleOpenLoading(); 
    for (const checkbox of selectedCheckboxes) {
      const firmContainer = checkbox.closest(".flex.justify-between");
      if (firmContainer) {
        const firmIdElement = firmContainer.querySelector("[data-firmId]");
        let firmNumberId = parseInt(firmIdElement.textContent.trim());
        console.log("Firm Number ID:", firmNumberId);

        let dataFirms = await fetchFirmData(firmNumberId);
  
        let rutFilial = dataFirms.rut;
        let filial = dataFirms.title;
        let propietario = dataFirms.title;
        let sapFilial = dataFirms.sapCode;
        let rutPropietario = "";
        let propietario2 = "";
        let nivel = "";
        let sapPropietario = "";

        if (dataFirms.ownersMap && dataFirms.ownersMap.levels) {

          const levelsArray = Object.keys(dataFirms.ownersMap.levels);

          // Iterar a través de los niveles
            for (let i = 0; i < levelsArray.length - 1; i++) {
              const level = levelsArray[i];
              console.log(`Nivel ${level}:`);
          
                // Iterar a través de las firmas en este nivel
                for (const firmId in dataFirms.ownersMap.levels[level]) {
                  if (dataFirms.ownersMap.levels[level].hasOwnProperty(firmId)) {
                    console.log(`  - Firm ID ${firmId}`);
                    let dataFirms2 = await fetchFirmData(firmId);

                    let porcentajeSuma = sumarAdjacencyListPorId(dataFirms2, firmId);

                    rutPropietario = dataFirms2.rut;
                    propietario2 = dataFirms2.title;
                    nivel = level;
                    sapPropietario = dataFirms2.sapCode;
                    
                    selectedData.push({
                      rutFilial: rutFilial,
                      filial: filial,
                      propietario: propietario, 
                      sapFilial: sapFilial, 
                      rutPropietario: rutPropietario, 
                      propietario2: propietario2, 
                      nivel: nivel, 
                      porcentaje: porcentajeSuma, 
                      sapPropietario: sapPropietario, 
                      dataCountry: "dataCountry"
                    })
                  }
                }
              // }
            }
          } else {
            console.error('La propiedad "ownersMap.levels" no está presente en el objeto.');
          }
      }
    }
    setFilteredData(selectedData.filter(Boolean));
    handleOpenModal();
  }

  const handleExportCompaniesFinals = async (selectedCheckboxes) => {
    let selectedData = [];
    // LOADING: Abrir el modal de carga
    handleOpenLoading(); 
    for (const checkbox of selectedCheckboxes) {
      // const checkbox = selectedCheckboxes[i];
      const firmContainer = checkbox.closest(".flex.justify-between");
      if (firmContainer) {
        const firmIdElement = firmContainer.querySelector("[data-firmId]");
        let firmNumberId = parseInt(firmIdElement.textContent.trim());
        console.log("Firm Number ID:", firmNumberId);

        let dataFirms = await fetchFirmData(firmNumberId);

        let rutFilial = dataFirms.rut;
        let filial = dataFirms.title;
        let propietario = dataFirms.title;
        let sapFilial = dataFirms.sapCode;
        let rutPropietario = "";
        let propietario2 = "";
        let nivel = "";
        let sapPropietario = "";

        if (dataFirms.ownersMap && dataFirms.ownersMap.levels) {

          const levelsArray = Object.keys(dataFirms.ownersMap.levels);

          // Obtenemos el último nivel
          const lastLevel = levelsArray[levelsArray.length - 1];
          const levelFirms = dataFirms.ownersMap.levels[lastLevel];

          // Iterar a través de los niveles
            for (const firmId in levelFirms) {
              if (levelFirms.hasOwnProperty(firmId)) {
                console.log(`Nivel ${lastLevel} - Firm ID ${firmId}`);

                // Iterar a través de las firmas en este nivel
                // for (const firmId in dataFirms.ownersMap.levels[lastLevel]) {
                //   if (dataFirms.ownersMap.levels[lastLevel].hasOwnProperty(firmId)) {
                    console.log(`  - Firm ID ${firmId}`);
                    let dataFirms2 = await fetchFirmData(firmId);

                    let porcentajeSuma = sumarAdjacencyListPorId(dataFirms2, firmId);

                    rutPropietario = dataFirms2.rut;
                    propietario2 = dataFirms2.title;
                    nivel = lastLevel;
                    sapPropietario = dataFirms2.sapCode;

                    selectedData.push({
                      rutFilial: rutFilial,
                      filial: filial,
                      propietario: propietario,
                      sapFilial: sapFilial,
                      rutPropietario: rutPropietario,
                      propietario2: propietario2,
                      nivel: nivel,
                      porcentaje: porcentajeSuma,
                      sapPropietario: sapPropietario,
                      dataCountry: "dataCountry"
                    })
                  }
                }
            //   }
            // }
          } else {
            console.error('La propiedad "ownersMap.levels" no está presente en el objeto.');
          }
      }
    }
    setFilteredData(selectedData.filter(Boolean));
    handleOpenModal();
  }

  const handleExportMasive = async (selectedCheckboxes) => {
    let selectedData = [];
    // LOADING: Abrir el modal de carga
    handleOpenLoading();
    for (const checkbox of selectedCheckboxes) {
      const firmContainer = checkbox.closest(".flex.justify-between");
      if (firmContainer) {
        const firmIdElement = firmContainer.querySelector("[data-firmId]");
        let firmNumberId = parseInt(firmIdElement.textContent.trim());
        console.log("Firm Number ID:", firmNumberId);

        let dataFirms = await fetchFirmData(firmNumberId);
  
        let rutFilial = dataFirms.rut;
        let filial = dataFirms.title;
        let propietario = dataFirms.title;
        let sapFilial = dataFirms.sapCode;
        let rutPropietario = "";
        let propietario2 = "";
        let nivel = "";
        let sapPropietario = "";

        if (dataFirms.ownersMap && dataFirms.ownersMap.levels) {
          // Iterar a través de los niveles
            for (const level in dataFirms.ownersMap.levels) {
              if (dataFirms.ownersMap.levels.hasOwnProperty(level)) {
                console.log(`Nivel ${level}:`);
          
                // Iterar a través de las firmas en este nivel
                for (const firmId in dataFirms.ownersMap.levels[level]) {
                  if (dataFirms.ownersMap.levels[level].hasOwnProperty(firmId)) {
                    console.log(`  - Firm ID ${firmId}`);
                    let dataFirms2 = await fetchFirmData(firmId);

                    let porcentajeSuma = sumarAdjacencyListPorId(dataFirms2, firmId);

                    rutPropietario = dataFirms2.rut;
                    propietario2 = dataFirms2.title;
                    nivel = level;
                    sapPropietario = dataFirms2.sapCode;
                    
                    selectedData.push({
                      rutFilial: rutFilial,
                      filial: filial,
                      propietario: propietario, 
                      sapFilial: sapFilial, 
                      rutPropietario: rutPropietario, 
                      propietario2: propietario2, 
                      nivel: nivel, 
                      porcentaje: porcentajeSuma, 
                      sapPropietario: sapPropietario, 
                      dataCountry: "dataCountry"
                    })
                  }
                }
              }
            }
          } else {
            console.error('La propiedad "ownersMap.levels" no está presente en el objeto.');
          }
      }
    }
    setFilteredData(selectedData.filter(Boolean));
    handleOpenModal();
  }

  const handleExport = async (value) => {
    let selectedCheckboxes = [];
    let selectedCheckboxesAll = [];
    let checkboxes = document.querySelectorAll(".checkbox:checked");
      selectedCheckboxes = Array.from(checkboxes).filter(
        (checkbox) => checkbox.checked
      );
    if(value === 1){      
      handleExportStokHolders(selectedCheckboxes);
    }
    if(value === 2){
      handleExportCompaniesFinals(selectedCheckboxes);
    }
    if(value === 3){
      let checkboxesAll = document.querySelectorAll(".checkbox");
      selectedCheckboxesAll = Array.from(checkboxesAll).filter(
        (checkbox) => checkbox.checked
      );
    handleExportMasive(selectedCheckboxesAll);    
    }
  };

  const handlerBulkImportCompanies = () => {
    handleSelectAllCheckbox('fc');
    //1.- Stockholders 2.- Compañias finales 3.- Todos
    handleExport(3);
  };

  const validateCheck = () => {    
    const checkboxes = document.querySelectorAll(".checkbox:checked");

    if (checkboxes.length > 0) {
      return true;
    } else {
      // Ningún checkbox está marcado, mostrar un alert
      SnackbarUtilities.error(
        "Por favor, elija al menos un elemento."
      );
      return false;
    }
  }

  const handlerBulkImportCompaniesFinals = () => {
    let validate = validateCheck();
    if(validate === true){
      // handleSelectCheckbox();
      //1.- Stockholders 2.- Compañias finales 3.- Todos
      handleExport(2);
    }
  }

  const handlerBulkImportStockholders = () => {
    let validate = validateCheck();
    if(validate === true){
      // handleSelectCheckbox();
      //1.- Stockholders 2.- Compañias finales 3.- Todos
      handleExport(1);
    }
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
              onChange={() => handleSelectAllCheckbox('cb')}
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
          // onClick={handleOpenModal}
        >
          {buttonText}
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
                <p className="text-gray-700 hover:text-teal-600 transition-colors duration-300 cursor-pointer"
                  onClick={handlerBulkImportCompaniesFinals} >
                  exportar solo sociedades finales
                </p>
                <p className="text-gray-700 hover:text-teal-600 transition-colors duration-300 cursor-pointer"
                  onClick={handlerBulkImportStockholders} >
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
