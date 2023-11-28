import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/actions/modal";

export const ModalDownload = ({ data }) => {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state);
  const { isOpen } = modal;
  const handleClose = () => dispatch(closeModal());

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
                          {row.rut}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.dataCountry}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.dataCountry}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.dataCountry}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.dataCountry}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.dataCountry}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.dataCountry}
                        </td>
                        <td className="py-2 px-4 border border-white bg-gray-200">
                          {row.dataCountry}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-5">
                  <button
                    onClick={() => handleClose()}
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

                <button
                  onClick={() => handleClose()}
                  className="border-2 px-5 py-2 rounded-md hover:bg-zinc-600 hover:text-white flex justify-between items-center gap-5"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};
