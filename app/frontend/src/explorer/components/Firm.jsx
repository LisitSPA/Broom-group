import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, DotIcon } from "../../shared/assets/Icons";
import { useSelector, useDispatch } from "react-redux";
import { callFirm } from "@/redux/actions/firms";
import CustomSVGContainer from "./CustomSVGContainer";
import createCsvWriter from "csv-writer";
import html2canvas from "html2canvas";

function getFillColor(level) {
  // Define tus colores según el nivel aquí
  // Puedes usar un switch, if-else, o cualquier lógica que prefieras
  switch (level) {
    case "1":
      return "#177E89";
    case "2":
      return "#db3a34";
    case "3":
      return "#FFC857";
    // Agrega más casos según tus necesidades
    default:
      return "#000000";
  }
}
function getLevelClassName(level) {
  switch (level) {
    case "1":
      return "level_one";
    case "2":
      return "level_two";
    case "3":
      return "level_three";
    case "4":
      return "last_level";
    // Puedes agregar más casos según sea necesario
    default:
      return `level_${level}`;
  }
}
const translateLevels = (ownersMap, firms, response) => {
  const levelSocietiesInfo = [];

  if (ownersMap) {
    const { levels } = ownersMap;

    for (const levelKey in levels) {
      if (Object.hasOwnProperty.call(levels, levelKey)) {
        const innerObject = levels[levelKey];
        const societiesInfo = [];

        for (const innerKey in innerObject) {
          if (Object.hasOwnProperty.call(innerObject, innerKey)) {
            const societyId = innerKey;
            const investorIds = innerObject[innerKey];

            // Buscar el nombre de la sociedad utilizando el ID
            const societyName = findSocietyNameById(societyId);
            if (Array.isArray(investorIds) && investorIds.length > 0) {
              investorIds.forEach((investorId) => {
                const societyInfo = {
                  societyId: innerKey,
                  investorId: investorId,
                  societyName: societyName,
                };
                societiesInfo.push(societyInfo);
              });
            } else {
              // Si investorIds no es un array o está vacío, agregar una entrada con investorId vacío
              const societyInfo = {
                societyId: innerKey,
                investorId: "",
                societyName: societyName,
              };
              societiesInfo.push(societyInfo);
            }
          }
        }

        const levelInfo = {
          level: levelKey,
          societies: societiesInfo,
        };

        levelSocietiesInfo.push(levelInfo);
      }
    }
  }

  /************************************************** */
  const { adjacencyList } = ownersMap;
  for (const vertex in adjacencyList) {
    // Verificar si el valor asociado a la propiedad es un objeto
    if (
      typeof adjacencyList[vertex] === "object" &&
      !Array.isArray(adjacencyList[vertex])
    ) {
      // Iterar sobre las propiedades del objeto interno
      for (const neighbor in adjacencyList[vertex]) {
        const percentage = adjacencyList[vertex][neighbor];
        console.log(`  Edge to ${neighbor}: ${percentage}%`);
        porcentajes.push({
          id: neighbor,
          porcentaje: percentage,
          padre: vertex,
        });
      }

      const nodosUnicos = Array.from(
        new Set(porcentajes.map(JSON.stringify))
      ).map(JSON.parse);

      // Construir el árbol a partir de los nodos

      let arbol = construirArbol(nodosUnicos, vertex);
    }
  }

  return levelSocietiesInfo;
};

const construirArbol = (nodos, padre) => {
  const hijos = nodos
    .filter((nodo) => nodo.padre === padre)
    .map((nodo) => {
      const nodoConHijos = {
        ...nodo,
        hijos: construirArbol(nodos, nodo.id, matriz),
      };
      matriz.push(nodoConHijos);
      // Agrega el nodo y sus hijos a la matriz
      return nodoConHijos;
    });

  return hijos.length > 0 ? hijos : null;
};

const findSocietyNameById = (societyId, response) => {
  const index = societyIdstodas.indexOf(societyId);
  return index !== -1 ? societyNamestodas[index] : "Nombre no encontrado";
};

const societyIdstodas = [];
const societyNamestodas = [];
const rutsociedad = [];
const porcentajes = [];
const idprocen = [];
const matriz = [];

const Firm = React.memo(function Firm({ firm, searchTerm, selectAllChecked }) {
  const dispatch = useDispatch();
  const { firmOwnersMap } = useSelector((state) => state);
  const { response } = firmOwnersMap;
  let firms = response ? response.firms : [];

  const [firmId, setFirmId] = useState(firm?.firmId || "");
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [firmStructure, setFirmStructure] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [levelSocietiesInfo, setLevelSocietiesInfo] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [groupedInfo, setGroupedInfo] = useState([]);
  const [highestLevel, setHighestLevel] = useState(0);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    setIsChecked(selectAllChecked);
  }, [selectAllChecked]);
  if (!firm) {
    return null;
  }

  const dataFromEndpoint = [];

  const FIRM_DATA = {};

  dataFromEndpoint.forEach((item) => {
    FIRM_DATA[item.firmProfileId] = {
      title: item.title,
      rut: item.rut,
    };
  });

  const handleCheckbox = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const eliminarDuplicados = (matriz) => {
    const nodosUnicos = {};

    matriz.forEach((nodo) => {
      const clave = `${nodo.id}_${nodo.padre}`;
      if (!nodosUnicos[clave] || nodo.hijos) {
        nodosUnicos[clave] = nodo;
      }
    });

    return Object.values(nodosUnicos);
  };
  const imprimirArbol2 = (nodo, ancestros = []) => {
    const tieneAncestros = ancestros.includes(nodo.padre);

    if (!tieneAncestros) {
      console.log(`Padre ${nodo.padre} :`);
    }

    if (nodo.hijos && nodo.hijos.length > 0) {
      nodo.hijos.forEach((hijo) => {
        if (!tieneAncestros) {
          console.log(`  Hijo ${hijo.id}`);
        }
        imprimirArbol(hijo, [...ancestros, nodo.padre]);
      });
    }
  };

  const imprimirArbol = (nodo, ancestros = []) => {
    console.log(`Padre ${nodo.padre} :`);

    if (nodo.hijos && nodo.hijos.length > 0) {
      nodo.hijos.forEach((hijo) => {
        console.log(`    Hijo ${hijo.id}`);
        imprimirArbol(hijo, [...ancestros, nodo.padre]);
      });
    }
  };
  const imprimirArbol5 = (nodos, nivel) => {
    console.log(nivel);
    if (!nodos[nivel]) return null;

    return (
      <div className={`level_${nivel}`}>
        {nodos[nivel].map((nodo) => (
          <div className="investor_level" key={nodo.societyIdt}>
            <CustomSVGContainer fill="#177E89" />
            <p className="percentage_level">{nodo.societies.porcentaje}%</p>
            <p>{nodo.societies.societyNameh}</p>
            {nodo.societies.investorIdt && (
              // Si hay un inversor, llamamos recursivamente a la función
              <div className={`level_${nivel + 1}`}>
                {imprimirArbol5(nodos, nivel + 1)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  const handleOpenToggle = () => {
    console.log("societyIdstodas", firm.firmId);

    //console.log(`El porcentaje es es: ${padre}`);
    const result = [];
    console.log(
      "matriz",
      Array.from(new Set(matriz.map(JSON.stringify))).map(JSON.parse)
    );
    const prueba = Array.from(new Set(matriz.map(JSON.stringify))).map(
      JSON.parse
    );
    const nodosUnicos2 = eliminarDuplicados(prueba);
    console.log("matriz", nodosUnicos2);
    nodosUnicos2.forEach((raiz) => imprimirArbol2(raiz));

    // Imprimir el árbol
    /* const appContainer = document.getElementById('prueba');
      if (appContainer) {
        nodosUnicos2.forEach((raiz, index) => {
          const treeRoot = imprimirArbol2(raiz, index);
          console.log(treeRoot)
          if (treeRoot) {
            appContainer.appendChild(treeRoot);
          }
        });
      }*/

    levelSocietiesInfo.forEach((levelInfo, outerIndex) => {
      levelInfo.societies.forEach((societyInfo, innerIndex) => {
        let title = "";
        let title2 = "";
        let padre = "";
        let rut = "";
        let rutinv = "";

        if (societyInfo.investorId) {
          padre = buscarPadre(
            societyInfo.societyId,
            societyInfo.investorId,
            porcentajes
          );

          societyIdstodas.forEach((elemento, indice) => {
            if (elemento === societyInfo.investorId) {
              title = societyNamestodas[indice];
              rutinv = rutsociedad[indice];
            }
          });
        }
        societyIdstodas.forEach((elemento, indice) => {
          if (elemento == societyInfo.societyId) {
            title2 = societyNamestodas[indice];
            rut = rutsociedad[indice];

            console.log("paso");
          }
        });

        const societyInfototal = {
          investorIdt: societyInfo.investorId,
          societyNameh: title,
          porcentaje: padre,
          rutinv: rutinv,
        };

        result.push({
          level: levelInfo.level,
          societyIdt: societyInfo.societyId,
          societyNamet: title2,
          societies: societyInfototal,
          rutsociedadt: rut,
        });
      });
    });

    console.log("result", result);

    // Agrupar por nivel
    const groupedByLevel = {};

    // Agrupar por nivel y sociedadIdt
    const groupedByLevelAndSocietyIdt = {};

    result.forEach((item) => {
      if (!groupedByLevelAndSocietyIdt[item.level]) {
        groupedByLevelAndSocietyIdt[item.level] = {};
      }

      if (!groupedByLevelAndSocietyIdt[item.level][item.societyIdt]) {
        groupedByLevelAndSocietyIdt[item.level][item.societyIdt] = [];
      }

      groupedByLevelAndSocietyIdt[item.level][item.societyIdt].push(item);
    });
    console.log("groupedByLevelAndSocietyIdt", groupedByLevelAndSocietyIdt);
    setGroupedInfo(groupedByLevelAndSocietyIdt);

    const highestLevel = Math.max(
      ...Object.keys(groupedByLevelAndSocietyIdt).map(Number)
    );
    setHighestLevel(highestLevel);
    console.log("highestLevel", highestLevel);
    // Imprimir la vista por cada nivel y sociedadIdt
    /*Object.keys(groupedByLevelAndSocietyIdt).forEach((level) => {
  console.log(`Nivel ${level}:`);
  Object.keys(groupedByLevelAndSocietyIdt[level]).forEach((societyIdt) => {
    console.log(`  Sociedad ID: ${societyIdt}`);
    groupedByLevelAndSocietyIdt[level][societyIdt].forEach((item) => {
      
      console.log(`    Investor ID: ${item.societies.investorIdt}`);
      console.log(`    Nombre de la Sociedad: ${item.societies.societyNameh}`);
      console.log('\n');
    });
  });
});*/
  };

  function buscarPadre(idPadre, idHijo, datos) {
    // console.log('datoos', datos)
    const nodosUnicos = Array.from(new Set(datos.map(JSON.stringify))).map(
      JSON.parse
    );
    // console.log(nodosUnicos)

    for (const nodo of nodosUnicos) {
      if (nodo.id == idHijo && nodo.padre == idPadre) {
        return nodo.porcentaje;
      }
    }
  }
  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };
  const toggleOpen = () => {
    if (isPageLoaded) {
      setIsOpen(!isOpen);
      handleOpenToggle();
    }
  };
  useEffect(() => {
    // Llama a la función cuando isOpen cambia
    handleOpenToggle();
  }, [isOpen, response, firmId, firms]);

  useEffect(() => {
    dispatch(callFirm(firmId));
  }, [firmId]);

  useEffect(() => {
    if (response && response.firmId === firmId) {
      setFirmStructure(response.ownersMap);
      const title = response.title;
      societyIdstodas.push(response.firmId);
      societyNamestodas.push(response.title);

      rutsociedad.push(response.rut);
      console.log("arrey", rutsociedad);
      setLevelSocietiesInfo((prevInfo) =>
        prevInfo.map((levelInfo) => ({
          ...levelInfo,
          societies: levelInfo.societies.map((societyInfo) => ({
            ...societyInfo,
            title: title,
          })),
        }))
      );

      // Translate levels once the response is available
      // const info = translateLevels(response.ownersMap, firms, response);
      // setLevelSocietiesInfo(info);
    }
  }, [response, firmId, dispatch, firms]);

  const classes = classNames(
    "flex justify-between items-center p-6 z-20 rounded-md",
    {
      "bg-LightGray rounded-b-none": isOpen,
      "bg-white": !isOpen,
      "outline outline-1 outline-sky-400": isChecked,
    }
  );

  const LEVELS_KEYS = {
    1: "one",
    2: "two",
    3: "three",
    4: "lastLevel",
  };
  // Función para mostrar niveles y porcentajes de inversión

  const getNumberOfLevels = (firmStructure, firmId) => {
    // console.log("firmStructure", firmId, firmStructure);
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
            return levelObject[firmId].length - 1;
          }
        }
      }
    }

    // Retornar 0 si no se encuentra el firmId en ningún nivel
    return "Final";
  };

  const getNumberOfPart = (firmStructure, firmId) => {
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
            return levelObject[firmId].length;
          }
        }
      }
    }

    // Retornar 0 si no se encuentra el firmId en ningún nivel
    return 0;
  };

  const renderLevels = (info, currentLevel, getLevelClassName) => (
    <div key={currentLevel} className={getLevelClassName(currentLevel)}>
      <p>Nivel {currentLevel}:</p>
      {Object.keys(info).map((societyIdt) => (
        <div key={societyIdt}>
          <p>
            Sociedad ID: {societyIdt} - Nombres:
            {info[societyIdt][0].societyNamet} - Rut:
            {info[societyIdt][0].rutsociedadt}
          </p>
          <ul>
            {info[societyIdt].map((item, index) => (
              <li key={index}>
                <div
                  style={{ borderBottom: "3px solid #fff" }}
                  className="flex items-center gap-5 justify-between px-5 text-xs"
                >
                  <p>
                    {item.societies.investorIdt}- {item.societies.societyNameh}
                  </p>
                  <p>{item.societies.porcentaje}</p>
                  <p>{item.societies.rutinv}</p>
                </div>
                {item.children &&
                  renderLevels(
                    item.children,
                    currentLevel + 1,
                    getLevelClassName
                  )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
  /*const getFinalFirmsInfo = (firmStructure, firmId) => {
  //console.log('para la firm:',firmId )
  if (firmStructure?.levels) {
    const { levels, finalFirms } = firmStructure;

    // Iterar sobre las claves (niveles) de levels
    for (const levelKey in levels) {
      if (Object.hasOwnProperty.call(levels, levelKey)) {
        // Obtener el objeto correspondiente al nivel actual
        const levelObject = levels[levelKey];

        // Verificar si firmId existe en el nivel actual
        if (levelObject[firmId] && levelObject[firmId].length > 0) {
          const firmInfoArray = levelObject[firmId].map((finalFirmId) => {
          // console.log('dhbjdjdasb',finalFirmId)
          if(response.firmId==finalFirmId ){
           // console.log('encontrooo',response.title )
          }
          
           
          });

          return firmInfoArray;
        }
      }
    }
  }*

  // Retornar un array vacío si no se encuentra el firmId en ningún nivel
  return [];
};*/
  //getFinalFirmsInfo (firmStructure, 48)

  const divRef = useRef(null);

  const capturarDiv = () => {
    if (divRef.current) {
      const divToCapture = divRef.current;

      // Usar html2canvas para capturar el contenido del div como una imagen
      html2canvas(divToCapture)
        .then((canvas) => {
          // Crear un enlace para descargar la imagen
          const link = document.createElement("a");
          link.download = "captura_div.png";
          link.href = canvas.toDataURL("image/png");

          // Simular clic en el enlace para iniciar la descarga
          link.click();
        })
        .catch((error) => {
          // Manejar cualquier error que ocurra durante la captura
          console.error("Error al capturar el div:", error);
        });
    }
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
              {firm.name} - {firm.firmId}
            </h2>
            <h2
              hidden
              className="select-none text-lg"
              data-firmId={firm.firmId}
            >
              {firm.firmId}
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
              <div className="font-light text-lg">
                {getNumberOfPart(firmStructure, firm.firmId)}
              </div>
              <div className="text-sm">Participiación</div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="font-light text-lg">
                {getNumberOfLevels(firmStructure, firm.firmId)}
              </div>
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
              className="flex flex-row py-1 px-4 bg-white z-10 rounded-b-md"
              style={{ backgroundColor: "#F8F9FA" }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full flex gap-5">
                <div
                  className="flex flex-col gap-10 "
                  style={{ width: "50%", justifyContent: "space-between" }}
                >
                  {/* {!showDialog ? (
                      <div className="flex items-center justify-between">
                        <div
                          onClick={() => setShowDialog((prev) => !prev)}
                          className="bg-gray-800 text-white"
                          style={{
                            borderRadius: "5px",
                            borderBottomLeftRadius: "0px",
                            padding: "2px 5px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <svg
                            width="12"
                            height="14"
                            viewBox="0 0 12 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.028 12.642L7.12267 9.68333M7.12267 9.68333L5.44933 10.9813L5.82867 5.45708L9.31333 10.0753L7.12267 9.68333ZM6 1.3125V2.625M9.88933 2.72183L8.82867 3.64992M11.5 6.125H10M3.17133 8.60008L2.11133 9.52758M2 6.125H0.5M3.17133 3.64992L2.11133 2.72242"
                              stroke="#F8F9FA"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <p style={{ fontSize: "11px", marginLeft: "1px" }}>
                            ver participación en sociedades
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="border-dashed border-2 border-blue-400 bg-blue-100 p-2 flex flex-col">
                        <button
                          onClick={toggleDialog}
                          className="text-gray-500 self-end"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M3.5 10.5L10.5 3.5M3.5 3.5L10.5 10.5"
                              stroke="#03045E"
                              stroke-opacity="0.270588"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                        <p className="text-black font-manrope text-base font-light">
                          Participación en estas sociedades:
                        </p>
                        <div className="flex items-center gap-5 p-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                          >
                            <circle cx="4.5" cy="4.5" r="4.5" fill="#00B4D8" />
                          </svg>
                          <div class="rounded-md bg-white p-1">
                            <p className="text-blue-800 text-center text-xs font-medium">
                              10%
                            </p>
                          </div>
                          <p className="text-black text-sm">
                            Nombre de la Sociedad
                          </p>
                        </div>
                      </div>
                    )} */}

                  {/* <select
                      className={`border rounded-md ${
                        showDialog ? "self-end" : ""
                      }`}
                      style={{ fontSize: "11px" }}
                    >
                      <option value="" disabled selected>
                        filtrar por nivel
                      </option>
                      <option value="1">Nivel 1</option>
                      <option value="2">Nivel 2</option>
                      <option value="3">Nivel 3</option>
                      <option value="4">Nivel 4</option>
                    </select> */}

                  <div id="prueba"></div>
                  <div id="organigrama" className="tree_container" ref={divRef}>
                    <div className="flex items-center gap-1">
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11.5"
                          cy="11.5"
                          r="9.5"
                          fill="#00A896"
                          stroke="#02C39A"
                          stroke-width="4"
                        />
                      </svg>
                      <p>{firm.name}</p>
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.75 1.125L5 4.875L1.25 1.125"
                          stroke="#787878"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    {Object.keys(groupedInfo).map(
                      (level) =>
                        parseInt(level) === 1 && (
                          <div key={level}>
                            {/* Resto del código para el nivel 1 */}
                            {Object.keys(groupedInfo[level]).map((societyIdt) =>
                              groupedInfo[level][societyIdt].map(
                                (item, index) => {
                                  // Validar si item.societies.investorIdt no es nulo
                                  if (item.societies.investorIdt !== null) {
                                    return (
                                      <div
                                        key={item.societies.investorIdt}
                                        className={getLevelClassName(
                                          level.toString()
                                        )}
                                      >
                                        <div className="investor_level">
                                          <CustomSVGContainer
                                            fill={getFillColor(
                                              level.toString()
                                            )}
                                          />
                                          <p className="percentage_level">
                                            {item.societies.porcentaje}%
                                          </p>
                                          <p>{item.societies.societyNameh}</p>
                                        </div>
                                        {/* Iteración sobre los subniveles */}
                                        {parseInt(level) + 1 <
                                          highestLevel.toString() &&
                                          groupedInfo[parseInt(level) + 1] &&
                                          groupedInfo[parseInt(level) + 1][
                                            item.societies.investorIdt
                                          ] && (
                                            <div
                                              className={getLevelClassName(
                                                (parseInt(level) + 1).toString()
                                              )}
                                            >
                                              {groupedInfo[parseInt(level) + 1][
                                                item.societies.investorIdt
                                              ].map((subItem) => {
                                                // Validar si subItem.societies.investorIdt no es nulo
                                                if (
                                                  subItem.societies
                                                    .investorIdt !== ""
                                                ) {
                                                  return (
                                                    <div
                                                      key={
                                                        subItem.societies
                                                          .investorIdt
                                                      }
                                                    >
                                                      <div className="investor_level">
                                                        <CustomSVGContainer
                                                          fill={getFillColor(
                                                            (
                                                              parseInt(level) +
                                                              1
                                                            ).toString()
                                                          )}
                                                        />
                                                        <p className="percentage_level">
                                                          {
                                                            subItem.societies
                                                              .porcentaje
                                                          }
                                                          %
                                                        </p>
                                                        <p>
                                                          {
                                                            subItem.societies
                                                              .societyNameh
                                                          }
                                                        </p>
                                                      </div>
                                                      {/* Iteración sobre los subniveles del siguiente nivel */}
                                                      {parseInt(level) + 2 <
                                                        highestLevel.toString() &&
                                                        groupedInfo[
                                                          parseInt(level) + 2
                                                        ] &&
                                                        groupedInfo[
                                                          parseInt(level) + 2
                                                        ][
                                                          subItem.societies
                                                            .investorIdt
                                                        ] && (
                                                          <div
                                                            className={getLevelClassName(
                                                              (
                                                                parseInt(
                                                                  level
                                                                ) + 2
                                                              ).toString()
                                                            )}
                                                          >
                                                            {groupedInfo[
                                                              parseInt(level) +
                                                                2
                                                            ][
                                                              subItem.societies
                                                                .investorIdt
                                                            ].map(
                                                              (subSubItem) => {
                                                                // Validar si subSubItem.societies.investorIdt no es nulo
                                                                if (
                                                                  subSubItem
                                                                    .societies
                                                                    .investorIdt !==
                                                                  ""
                                                                ) {
                                                                  return (
                                                                    <div
                                                                      key={
                                                                        subSubItem
                                                                          .societies
                                                                          .investorIdt
                                                                      }
                                                                    >
                                                                      <div className="investor_level">
                                                                        <CustomSVGContainer
                                                                          fill={getFillColor(
                                                                            (
                                                                              parseInt(
                                                                                level
                                                                              ) +
                                                                              2
                                                                            ).toString()
                                                                          )}
                                                                        />
                                                                        <p className="percentage_level">
                                                                          {
                                                                            subSubItem
                                                                              .societies
                                                                              .porcentaje
                                                                          }
                                                                          %
                                                                        </p>
                                                                        <p>
                                                                          {
                                                                            subSubItem
                                                                              .societies
                                                                              .societyNameh
                                                                          }
                                                                        </p>
                                                                      </div>
                                                                      {/* Iteración sobre los subniveles del siguiente nivel */}
                                                                      {parseInt(
                                                                        level
                                                                      ) +
                                                                        3 <
                                                                        highestLevel.toString() &&
                                                                        groupedInfo[
                                                                          parseInt(
                                                                            level
                                                                          ) + 3
                                                                        ] &&
                                                                        groupedInfo[
                                                                          parseInt(
                                                                            level
                                                                          ) + 3
                                                                        ][
                                                                          subSubItem
                                                                            .societies
                                                                            .investorIdt
                                                                        ] && (
                                                                          <div
                                                                            className={getLevelClassName(
                                                                              (
                                                                                parseInt(
                                                                                  level
                                                                                ) +
                                                                                3
                                                                              ).toString()
                                                                            )}
                                                                          >
                                                                            {groupedInfo[
                                                                              parseInt(
                                                                                level
                                                                              ) +
                                                                                3
                                                                            ][
                                                                              subSubItem
                                                                                .societies
                                                                                .investorIdt
                                                                            ].map(
                                                                              (
                                                                                subSubSubItem
                                                                              ) => {
                                                                                // Validar si subSubSubItem.societies.investorIdt no es nulo
                                                                                if (
                                                                                  subSubSubItem
                                                                                    .societies
                                                                                    .investorIdt !==
                                                                                  ""
                                                                                ) {
                                                                                  return (
                                                                                    <div
                                                                                      key={
                                                                                        subSubSubItem
                                                                                          .societies
                                                                                          .investorIdt
                                                                                      }
                                                                                    >
                                                                                      <div className="investor_level">
                                                                                        <CustomSVGContainer
                                                                                          fill={getFillColor(
                                                                                            (
                                                                                              parseInt(
                                                                                                level
                                                                                              ) +
                                                                                              3
                                                                                            ).toString()
                                                                                          )}
                                                                                        />
                                                                                        <p className="percentage_level">
                                                                                          {
                                                                                            subSubSubItem
                                                                                              .societies
                                                                                              .porcentaje
                                                                                          }

                                                                                          %
                                                                                        </p>
                                                                                        <p>
                                                                                          {
                                                                                            subSubSubItem
                                                                                              .societies
                                                                                              .societyNameh
                                                                                          }
                                                                                        </p>
                                                                                      </div>
                                                                                      {/* Iteración sobre los subniveles del siguiente nivel */}
                                                                                      {parseInt(
                                                                                        level
                                                                                      ) +
                                                                                        4 <
                                                                                        highestLevel.toString() &&
                                                                                        groupedInfo[
                                                                                          parseInt(
                                                                                            level
                                                                                          ) +
                                                                                            4
                                                                                        ] &&
                                                                                        groupedInfo[
                                                                                          parseInt(
                                                                                            level
                                                                                          ) +
                                                                                            4
                                                                                        ][
                                                                                          subSubSubItem
                                                                                            .societies
                                                                                            .investorIdt
                                                                                        ] && (
                                                                                          <div
                                                                                            className={getLevelClassName(
                                                                                              (
                                                                                                parseInt(
                                                                                                  level
                                                                                                ) +
                                                                                                4
                                                                                              ).toString()
                                                                                            )}
                                                                                          >
                                                                                            {groupedInfo[
                                                                                              parseInt(
                                                                                                level
                                                                                              ) +
                                                                                                4
                                                                                            ][
                                                                                              subSubSubItem
                                                                                                .societies
                                                                                                .investorIdt
                                                                                            ].map(
                                                                                              (
                                                                                                subSubSubSubItem
                                                                                              ) => {
                                                                                                // Validar si subSubSubSubItem.societies.investorIdt no es nulo
                                                                                                if (
                                                                                                  subSubSubSubItem
                                                                                                    .societies
                                                                                                    .investorIdt !==
                                                                                                  null
                                                                                                ) {
                                                                                                  return (
                                                                                                    <div
                                                                                                      key={
                                                                                                        subSubSubSubItem
                                                                                                          .societies
                                                                                                          .investorIdt
                                                                                                      }
                                                                                                    >
                                                                                                      <div className="investor_level">
                                                                                                        <CustomSVGContainer
                                                                                                          fill={getFillColor(
                                                                                                            (
                                                                                                              parseInt(
                                                                                                                level
                                                                                                              ) +
                                                                                                              4
                                                                                                            ).toString()
                                                                                                          )}
                                                                                                        />
                                                                                                        <p className="percentage_level">
                                                                                                          {
                                                                                                            subSubSubSubItem
                                                                                                              .societies
                                                                                                              .porcentaje
                                                                                                          }

                                                                                                          %
                                                                                                        </p>
                                                                                                        <p>
                                                                                                          {
                                                                                                            subSubSubSubItem
                                                                                                              .societies
                                                                                                              .societyNameh
                                                                                                          }
                                                                                                        </p>
                                                                                                      </div>
                                                                                                      {/* Puedes seguir anidando más niveles si es necesario */}
                                                                                                    </div>
                                                                                                  );
                                                                                                }
                                                                                                return null;
                                                                                              }
                                                                                            )}
                                                                                          </div>
                                                                                        )}
                                                                                    </div>
                                                                                  );
                                                                                }
                                                                                return null;
                                                                              }
                                                                            )}
                                                                          </div>
                                                                        )}
                                                                    </div>
                                                                  );
                                                                }
                                                                return null;
                                                              }
                                                            )}
                                                          </div>
                                                        )}
                                                    </div>
                                                  );
                                                }
                                                return null;
                                              })}
                                            </div>
                                          )}
                                      </div>
                                    );
                                  }
                                  return null;
                                }
                              )
                            )}
                          </div>
                        )
                    )}
                  </div>
                  <button
                    onClick={capturarDiv}
                    className="border-2 px-3 py-1 rounded-md hover:bg-zinc-600 hover:text-white flex items-center gap-1"
                    style={{ width: "45%" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M6.75 5.06251V11.25M11.25 6.75001V12.9375M11.6273 15.561L15.2835 13.7333C15.5693 13.5908 15.75 13.2983 15.75 12.9788V3.61501C15.75 2.98801 15.09 2.58001 14.529 2.86051L11.6273 4.31101C11.3895 4.43026 11.1097 4.43026 10.8727 4.31101L7.12725 2.43901C7.01011 2.38046 6.88096 2.34998 6.75 2.34998C6.61904 2.34998 6.48989 2.38046 6.37275 2.43901L2.7165 4.26676C2.43 4.41001 2.25 4.70251 2.25 5.02126V14.385C2.25 15.012 2.91 15.42 3.471 15.1395L6.37275 13.689C6.6105 13.5698 6.89025 13.5698 7.12725 13.689L10.8727 15.5618C11.1105 15.6803 11.3903 15.6803 11.6273 15.5618V15.561Z"
                        stroke="currentColor"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Descargar organigrama
                  </button>
                </div>
                <div
                  className="flex flex-col"
                  style={{
                    width: "40%",
                    minHeight: "300px",
                  }}
                >
                  <h3 className="font-bold" style={{ textAlign: "center" }}>
                    {firm.name}
                  </h3>
                  <div className="flex flex-col">
                    <div className="flex justify-start items-center gap-1">
                      <p className="font-semibold">Sociedades Finales</p>
                    </div>
                    {/* Renderiza la información agrupada en el HTML */}

                    {Object.keys(groupedInfo).map((level) => (
                      <div key={level}>
                        {level === highestLevel.toString() && (
                          <div>
                            <p>Nivel {level}:</p>
                            {Object.keys(groupedInfo[level]).map(
                              (societyIdt) => (
                                <div key={societyIdt}>
                                  <p>
                                    {/*  Sociedad ID: {societyIdt} - Nombres:*/}
                                    Sociedad:
                                    {
                                      groupedInfo[level][societyIdt][0]
                                        .societyNamet
                                    }
                                    -- Rut:
                                    {
                                      groupedInfo[level][societyIdt][0]
                                        .rutsociedadt
                                    }
                                  </p>
                                  <ul>
                                    {groupedInfo[level][societyIdt].map(
                                      (item, index) =>
                                        item.societies.investorIdt !== "" && (
                                          <li key={index}>
                                            <div
                                              style={{
                                                borderBottom: "3px solid #fff",
                                              }}
                                              className="flex items-center gap-5 justify-between px-5 text-xs"
                                            >
                                              <p>
                                                {item.societies.investorIdt}
                                                {item.societies.societyNameh}
                                              </p>

                                              <p>
                                                {item.societies.porcentaje}%
                                              </p>
                                              <p>{item.societies.rutinv}</p>
                                            </div>
                                          </li>
                                        )
                                    )}
                                  </ul>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex flex-col">
                      <div className="flex justify-start items-center gap-1 ">
                        <p className="font-semibold">Shareholders</p>
                      </div>
                    </div>
                    {Object.keys(groupedInfo).map((level) => (
                      <div key={level}>
                        {level != highestLevel.toString() && (
                          <div>
                            <p>Nivel {level}:</p>
                            {Object.keys(groupedInfo[level]).map(
                              (societyIdt) => (
                                <div key={societyIdt}>
                                  <p>
                                    {/*  Sociedad ID: {societyIdt} - Nombres:*/}
                                    Sociedad:
                                    {
                                      groupedInfo[level][societyIdt][0]
                                        .societyNamet
                                    }
                                    - Rut:
                                    {
                                      groupedInfo[level][societyIdt][0]
                                        .rutsociedadt
                                    }
                                  </p>
                                  <ul>
                                    {groupedInfo[level][societyIdt].map(
                                      (item, index) =>
                                        item.societies.investorIdt !== "" && (
                                          <li key={index}>
                                            <div
                                              style={{
                                                borderBottom: "3px solid #fff",
                                              }}
                                              className="flex items-center gap-5 justify-between px-5 text-xs"
                                            >
                                              <p>
                                                {item.societies.investorIdt}-
                                                {item.societies.societyNameh}
                                              </p>

                                              <p>{item.societies.porcentaje}</p>
                                              <p>{item.societies.rutinv}</p>
                                            </div>
                                          </li>
                                        )
                                    )}
                                  </ul>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
});

export default Firm;
