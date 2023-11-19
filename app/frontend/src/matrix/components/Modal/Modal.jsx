import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/actions/modal";
import { createVersion } from "@/redux/actions/versions";

const Modal = () => {
  const dispatch = useDispatch();
  const {
    modal,
    matrix,
    updatedOwnership: { updatedOwnership },
  } = useSelector((state) => state);
  const { isOpen, modalType } = modal;
  const { lastVersionId, matrixId } = matrix.response;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSaveNewVersion = () => {
    const extractUniqueIds = (data) => {
      const uniqueIdsSet = new Set();
      data.forEach((item) => {
        uniqueIdsSet.add(item.ownerProfileId);
        uniqueIdsSet.add(item.subsidiaryProfileId);
      });

      const uniqueIdsArray = Array.from(uniqueIdsSet);
      return uniqueIdsArray;
    };

    const uniqueIdsArray = extractUniqueIds(updatedOwnership);
    
    dispatch(
      createVersion({
        versionData: {
          matrixId: matrixId,
          authorId: 1,
          title: `Versión ${lastVersionId + 1}`,
          description: `Versión ${lastVersionId + 1}`,
          isSimulated: false,
          sourceFile: null,
        },
        firmProfilesIds: uniqueIdsArray,
        ownerships: updatedOwnership,
      })
    );
  };

  return (
    <>
      {isOpen && (
        <div className="flex w-screen h-screen fixed bg-black/60 z-50 backdrop-blur-sm">
          <div className="bg-white w-2/5 h-fit mx-auto p-5 rounded-md shadow-lg mt-72 relative">
            {/* header */}
            <div className="flex justify-between items-start">
              <h3 className="text-3xl font-extrabold">Guardar nueva versión</h3>

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

            {/* body */}
            <div>
              <h2 className="text-lg font-medium mt-5">
                {`Se guardarán los cambios cómo una versión ${
                  lastVersionId + 1
                } sobre la base de datos.`}
              </h2>
              <p className="text-lg font-medium mt-5">
                ¿Crear una nueva versión o es una simulación?
              </p>
            </div>

            <div className="flex justify-center items-center mt-7 gap-2">
              <div className="flex">
                <button className="flex justify-between items-center border-2 px-5 py-2 rounded-md hover:bg-zinc-600 hover:text-white">
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
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>

                  <span className="ml-1">Es un escenario simulado</span>
                </button>

                <button
                  onClick={handleSaveNewVersion}
                  className="flex justify-center items-center border-2 px-5 py-2 rounded-md hover:bg-zinc-600 hover:text-white"
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
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>

                  <p>Guardar nueva versión</p>
                </button>
              </div>

              <button className="border-2 px-5 py-2 rounded-md hover:bg-zinc-600 hover:text-white">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
