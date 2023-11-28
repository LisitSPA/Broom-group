import React, { useState, useEffect, memo } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, DotIcon } from "../../shared/assets/Icons";
import { useSelector, useDispatch } from "react-redux";
import { callFirm } from "@/redux/actions/firms";
import createCsvWriter from "csv-writer";
const translateLevels = (ownersMap, firms) => {
  console.log("aqui",ownersMap);
  if (ownersMap) {
    const { levels } = ownersMap;
     // Obtener un arreglo de las claves (propiedades) del objeto levels
     const keysArray = Object.keys(levels);

     
     console.log(keysArray.length);
    

    // Iterar sobre las propiedades del objeto levels
    for (const key in levels) {
      if (Object.hasOwnProperty.call(levels, key)) {
        const innerObject = levels[key];
        
        // Iterar sobre las propiedades del objeto interno
        for (const innerKey in innerObject) {
          if (Object.hasOwnProperty.call(innerObject, innerKey)) {
            const innerArray = innerObject[innerKey];

            // Ahora puedes trabajar con innerArray
            console.log(`nivel: ${key}, idsociedad: ${innerKey}, idinversionistas: ${innerArray}`);
            
          }
        }
      }
    }
  }
};




const Firm = React.memo(function Firm({ firm, searchTerm, selectAllChecked }) {
  const dispatch = useDispatch();
  const { firmOwnersMap, actualVersion } = useSelector((state) => state);
  const { response } = firmOwnersMap;
  let firms = response ? response.firms : [];

  const [firmId, setFirmId] = useState(firm?.firmId || "");
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [firmStructure, setFirmStructure] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setIsChecked(selectAllChecked);
    console.log("selectAllChecked en Firm:", selectAllChecked);
    //toggleOpen();
  }, [selectAllChecked]);
  if (!firm) {
    return null;
  }

  const handleCheckbox = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    translateLevels(firmStructure, firms);
    if (!firmStructure) {
      dispatch(callFirm(firmId));
    }
  }, [isOpen, firmStructure, firmId, dispatch]);

  useEffect(() => {
    if (response && response.firmId === firmId) {
      setFirmStructure(response.ownersMap);
      console.log('callFirm values:', response); 
    }
  }, [response, firmId]);


  const classes = classNames(
    "flex justify-between items-center p-6 z-20 rounded-md",
    {
      "bg-LightGray rounded-b-none": isOpen,
      "bg-white": !isOpen,
      "outline outline-1 outline-sky-400": isChecked,
    }
  );

 const getNumberOfLevels = (firmStructure, firmId) => {
  // Verificar si firmStructure existe y tiene la propiedad levels
  if (firmStructure?.levels) {
    const { levels } = firmStructure;

    // Iterar sobre las claves (niveles) de levels
    for (const levelKey in levels) {
      if (Object.hasOwnProperty.call(levels, levelKey)) {
        // Obtener el objeto correspondiente al nivel actual
        const levelObject = levels[levelKey];

        // Verificar si firmId existe en el nivel actual
        if (levelObject[firmId] && levelObject[firmId].length > 0) {
          // Retornar la cantidad de niveles para el firmId
          return (levelObject[firmId].length)-1;
        }
      }
    }
  }

  // Retornar 0 si no se encuentra el firmId en ningún nivel
  return "Final";
};

  

  return (
    <AnimatePresence>
      <motion.div
        className="w-full border shadow-md rounded-md"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ height: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={classes}>
          <div className="flex flex-col w-3/12 shrink-0">
            <div className="flex justify-start items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckbox}
                className="checkbox"
              />
              <label className="select-none">Incluir en la exportación</label>
            </div>
            <h2 className="select-none text-lg" data-name={firm.name}>
              {firm.name} -  {firm.firmId}
            </h2>
          </div>

          <div className="flex justify-between gap-1 items-center w-8/12 px-2">
            <div className="flex flex-col justify-center items-center">
              <div className="font-light text-lg" data-rut={firm.rut}>
                {firm.rut}
              </div>
              <div className="text-sm">Rut</div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/5">
              <div
                className="font-light text-lg text-center"
                data-country={firm.country}
              >
                {firm.country}
              </div>
              <div className="text-sm">País</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div
                className="font-light text-lg"
                data-sapcode={firm.sapCode || "-"}
              >
                {firm.sapCode || "-"}
              </div>
              <div className="text-sm">SAP code</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="font-light text-lg">-</div>
              <div className="text-sm">Soc.Finales</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="font-light text-lg">{getNumberOfLevels(firmStructure, firm.firmId)}</div>
              <div className="text-sm">Niveles</div>
            </div>
          </div>

          <div className="flex justify-end align-middle w-1/12">
            <button onClick={toggleOpen}>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDownIcon className="w-5 h-5 z-0" />
              </motion.div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex flex-row p-6 bg-white z-10 rounded-b-md"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full flex gap-5">
                <div class="w-2/5">
                  {!showDialog ? (
                    <div className="flex justify-between">
                      <div
                        onClick={() => setShowDialog((prev) => !prev)}
                        className="bg-gray-800 text-white"
                        // style={{}}
                      >
                        <p> ver participación en sociedades</p>
                      </div>
                      <div className="mt-4">
                        <select className="border rounded-md">
                          <option value="" disabled selected>
                            filtrar por nivel
                          </option>
                          <option value="1">Nivel 1</option>
                          <option value="2">Nivel 2</option>
                          <option value="3">Nivel 3</option>
                          <option value="4">Nivel 4</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-teal-100 border-dashed border border-teal-400">
                      <button onClick={toggleDialog} className="text-gray-500">
                        X
                      </button>
                      <div className="flex items-center gap-5 p-4">
                        <div class="bg-white text-teal-900 p-4 rounded-md">
                          10%
                        </div>
                        <p>Nombre de la Sociedad</p>
                      </div>
                    </div>
                  )}
                </div>
                <table class="text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="w-16 text-center">Nivel</th>
                      <th className="w-20 text-center">%</th>
                      <th>Propietaria</th>
                      <th>Rut propietaria</th>
                      <th className="w-2/5">Subsidiaria/s</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-100">
                      <td className="text-center">1</td>
                      <td className="text-center">10%</td>
                      <td>Lorem Ipsum</td>
                      <td>11.111.111-1</td>
                      <td className="flex items-center gap-2">
                        <div className="flex flex-wrap items-center gap-1 my-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 shrink-0"
                          >
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path
                              fillRule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="border p-1 bg-slate-100 rounded-md">
                            Nombre de la sociedad
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-100">
                      <td className="text-center">1</td>
                      <td className="text-center">10%</td>
                      <td>Lorem Ipsum</td>
                      <td>11.111.111-1</td>
                      <td className="flex items-center gap-2">
                        <div className="flex flex-wrap items-center gap-1 my-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 shrink-0"
                          >
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path
                              fillRule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="border p-1 bg-slate-100 rounded-md">
                            Nombre de la sociedad
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-100 border-t">
                      <td className="text-center">2</td>
                      <td className="text-center">10%</td>
                      <td>Lorem Ipsum</td>
                      <td>11.111.111-1</td>
                      <td className="flex items-center gap-2">
                        <div className="flex flex-wrap items-center gap-1 my-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 shrink-0"
                          >
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path
                              fillRule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="border p-1 bg-slate-100 rounded-md">
                            Nombre de la sociedad
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
});

export default Firm;
