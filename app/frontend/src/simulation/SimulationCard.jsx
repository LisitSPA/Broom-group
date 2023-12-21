import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { SnackbarUtilities } from "../helpers/snackbar-manager";

const SimulationCard = ({ title, description, author, versionId }) => {
  const [isLoading, setIsLoading] = useState(false);

  function matchInvestorsWithCompanies(data, investors) {
    const result = data.map((company) => {
      const matchedInvestors = [];

      // Verificar si la empresa tiene una lista de inversores
      if (company.investors && company.investors.length > 0) {
        company.investors.forEach((inv) => {
          const matchedInvestor = investors.find(
            (i) => i.firmProfileId === inv.ownerFirmProfileId
          );
          if (matchedInvestor) {
            matchedInvestors.push(matchedInvestor.title);
          }
        });
      }

      return {
        companyName: company.name,
        investors: matchedInvestors,
      };
    });

    return result;
  }

  const downloadAsExcel = (data, investors) => {
    const matchedData = matchInvestorsWithCompanies(data, investors);
    const translatedHeaders = {
      name: "nombre",
      description: "descripción",
      rut: "rut",
      country: "país",
      sapCode: "código SAP",
      investors: "inversores",
    };

    const translatedData = data.map((item) => {
      const translatedItem = {};
      for (const key in item) {
        if (key !== "firmId" && key !== "firmProfileId") {
          translatedItem[translatedHeaders[key]] = item[key];
        }
      }

      // Agregar la información de inversores traducida
      const matchedInvestors = matchedData.find(
        (company) => company.companyName === item.name
      );
      translatedItem[translatedHeaders.investors] = matchedInvestors
        ? matchedInvestors.investors.join(", ")
        : "";

      return translatedItem;
    });

    // Generar el archivo CSV y descargarlo
    const csv = Papa.unparse(translatedData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${title}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      SnackbarUtilities.success("Descarga exitosa!");
    }
  };

  const handlerExportSimulation = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/v1/versions/${versionId}`
      );
      const firms = await axios.get(
        `http://localhost:3000/api/v1/firm_profiles`
      );

      downloadAsExcel(response?.data.firms, firms.data);
    } catch (error) {
      console.error(error);
      SnackbarUtilities.error(
        "Hubo un error al intentar descargar la matriz. Por favor intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full rounded-md border p-4 bg-white gap-2 hover:outline hover:outline-1 outline-slate-300">
      <div className="flex justify-between items-center">
        <h2>{title}</h2>
        <div className="flex justify-end gap-1">
          <button className="flex justify-center items-center h-8 w-8 border rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
          <button className="flex justify-center items-center h-8 w-8 border rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="rounded-md p-3 text-sm font-light border bg-gray-50">
        <span className="font-normal">Descripción: </span>
        {description}
      </div>
      <div className="flex justify-between items-baseline">
        <div className="flex flex-col text-xs font-light">
          <div className="text-sm">2021-08-31 12:00:00</div>
          <div>
            creado por <span className="font-medium">{author}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 text-sm self-end">
          <button className="flex justify-center gap-2 items-center rounded-md py-1 px-2 border border-sky-600 text-sky-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M10.6875 4.56525C10.6875 4.299 10.827 4.05825 10.9883 3.846C11.154 3.6285 11.25 3.3705 11.25 3.09375C11.25 2.31675 10.4948 1.6875 9.5625 1.6875C8.63025 1.6875 7.875 2.3175 7.875 3.09375C7.875 3.3705 7.971 3.6285 8.13675 3.846C8.298 4.05825 8.4375 4.299 8.4375 4.56525C8.43782 4.62956 8.42522 4.69328 8.40044 4.75263C8.37566 4.81197 8.33921 4.86573 8.29324 4.91072C8.24728 4.9557 8.19275 4.99099 8.13288 5.01448C8.07302 5.03798 8.00904 5.04921 7.94475 5.0475C6.90125 5.01744 5.85953 4.94237 4.8225 4.8225C4.962 6.03225 5.04225 7.26 5.05875 8.50275C5.05945 8.56793 5.04718 8.63259 5.02268 8.69299C4.99817 8.75339 4.9619 8.80832 4.91599 8.85458C4.87007 8.90084 4.81542 8.93752 4.75521 8.96249C4.695 8.98745 4.63043 9.0002 4.56525 9C4.299 9 4.05825 8.8605 3.846 8.69925C3.63103 8.53133 3.36652 8.4393 3.09375 8.4375C2.31675 8.4375 1.6875 9.19275 1.6875 10.125C1.6875 11.0573 2.3175 11.8125 3.09375 11.8125C3.3705 11.8125 3.6285 11.7165 3.846 11.5508C4.05825 11.3895 4.299 11.25 4.56525 11.25C4.79775 11.25 4.9815 11.445 4.96425 11.6775C4.87096 12.9491 4.71024 14.2149 4.48275 15.4695C5.62125 15.612 6.77625 15.7012 7.94475 15.735C8.00904 15.7367 8.07302 15.7255 8.13288 15.702C8.19275 15.6785 8.24728 15.6432 8.29324 15.5982C8.33921 15.5532 8.37566 15.4995 8.40044 15.4401C8.42522 15.3808 8.43782 15.3171 8.4375 15.2527C8.4375 14.9865 8.298 14.7458 8.13675 14.5335C7.96883 14.3185 7.8768 14.054 7.875 13.7812C7.875 13.005 8.631 12.375 9.5625 12.375C10.4948 12.375 11.25 13.005 11.25 13.7812C11.25 14.058 11.154 14.316 10.9883 14.5335C10.827 14.7458 10.6883 14.9865 10.6883 15.2527C10.6883 15.5025 10.896 15.702 11.1458 15.6877C12.5104 15.6075 13.8693 15.4497 15.216 15.2153C15.4198 14.0439 15.5654 12.8632 15.6525 11.6775C15.6564 11.6227 15.649 11.5677 15.6307 11.5159C15.6123 11.4641 15.5835 11.4166 15.546 11.3765C15.5084 11.3363 15.463 11.3044 15.4126 11.2826C15.3621 11.2609 15.3077 11.2498 15.2527 11.25C14.9865 11.25 14.7458 11.3895 14.5335 11.5508C14.316 11.7165 14.058 11.8125 13.7812 11.8125C13.005 11.8125 12.375 11.0573 12.375 10.125C12.375 9.19275 13.005 8.4375 13.7812 8.4375C14.0588 8.4375 14.316 8.5335 14.5335 8.69925C14.7458 8.8605 14.9865 9 15.2535 9C15.3187 9.0002 15.3833 8.98745 15.4435 8.96249C15.5037 8.93752 15.5583 8.90084 15.6042 8.85458C15.6502 8.80832 15.6864 8.75339 15.7109 8.69299C15.7354 8.63259 15.7477 8.56793 15.747 8.50275C15.729 7.15865 15.6363 5.81658 15.4695 4.48275C14.055 4.73925 12.612 4.91325 11.145 4.9995C11.086 5.00277 11.0269 4.99394 10.9714 4.97353C10.9159 4.95312 10.8651 4.92157 10.8223 4.88082C10.7794 4.84008 10.7454 4.791 10.7222 4.7366C10.699 4.6822 10.6872 4.62438 10.6875 4.56525Z"
                stroke="#0077B6"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            playground
          </button>
          <button
            onClick={handlerExportSimulation}
            className="flex justify-center items-center rounded-md py-1 px-2 border border-Turquoise text-Turquoise"
          >
            exportar matriz simulada
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulationCard;
