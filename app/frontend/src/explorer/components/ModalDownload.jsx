import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/actions/modal";
import Papa from "papaparse";
import html2canvas from "html2canvas";

export const ModalDownload = ({ data }) => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state);
  const { isOpen } = modal;

  const handleClose = () => dispatch(closeModal());

  const handlerDownLoad = () => {
    // Convertir datos a formato CSV usando papaparse
    const csvData = Papa.unparse(data, {
      header: true,
    });
    // Crear un objeto Blob con los datos CSV
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    // Crear un enlace de descarga y hacer clic en él
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported_data.csv";
    link.click();
    handleClose();
  };

  return (
    <>
      {isOpen && (
        <div className="flex items-center justify-center w-screen h-screen fixed bg-black/60 z-50 backdrop-blur-sm">
          <div className="bg-white w-4/5  h-fit p-5 rounded-md shadow-lg relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-extrabold">
                  Descargar Documento Excel
                </h3>
                <p className="text-md font-semibold">
                  sociedades propietarias de "Nombre sociedad"
                </p>
              </div>
              <div
                className="cursor-pointer text-2xl text-gray-600 absolute top-5 right-5 hover:text-black"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div class="w-full flex flex-col gap-10">
              <div className="w-full max-h-80 overflow-y-auto">
                <table className="bg-white text-black border border-white ">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border border-white">
                        Rut Filial
                      </th>
                      <th className="py-2 px-4 border border-white">Filial</th>
                      <th className="py-2 px-4 border border-white">Nivel</th>
                      <th className="py-2 px-4 border border-white">
                        Propietaria
                      </th>
                      <th className="py-2 px-4 border border-white">% </th>
                      <th className="py-2 px-4 border border-white">
                        Rut Propietaria
                      </th>
                      <th className="py-2 px-4 border border-white">
                        SAP Filial
                      </th>
                      <th className="py-2 px-4 border border-white">
                        SAP Propietaria
                      </th>
                    </tr>
                  </thead>
                  <tbody className="max-h-100 overflow-y-auto">
                    {data?.map((row, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.rutFilial}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.filial}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.nivel}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.propietario2}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.porcentaje}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.rutPropietario}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.sapFilial}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.sapPropietario}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-5">
                  <button
                    onClick={() => handlerDownLoad()}
                    className="border-2 px-5 py-2 rounded-md hover:bg-zinc-600 hover:text-white flex justify-between items-center gap-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M1.75 9.625V10.9375C1.75 11.2856 1.88828 11.6194 2.13442 11.8656C2.38056 12.1117 2.7144 12.25 3.0625 12.25H10.9375C11.2856 12.25 11.6194 12.1117 11.8656 11.8656C12.1117 11.6194 12.25 11.2856 12.25 10.9375V9.625M9.625 7L7 9.625M7 9.625L4.375 7M7 9.625V1.75"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Descargar Excel
                  </button>
                  <button
                    onClick={() => handleClose()}
                    className="border-2 px-5 py-2 rounded-md hover:bg-zinc-600 hover:text-white"
                  >
                    Cancelar descarga
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
