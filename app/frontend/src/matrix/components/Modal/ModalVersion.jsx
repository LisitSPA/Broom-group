import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/actions/modal";
import { createFirmProfile } from "@/redux/actions/firm_profiles";
import { addNewFirm } from "@/redux/actions/versions";
import { callCountry } from "@/redux/actions/country";

const ModalVersion = () => {
  const dispatch = useDispatch();
  const [listCountries, setListCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/country");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setListCountries(data);
      } catch (error) {
        console.error("Hubo un problema con la solicitud:", error);
      }
    };

    getCountries();
  }, []);
  useEffect(() => {
    dispatch(callCountry());
  }, [dispatch]);
  const [errors, setErrors] = useState({
    title: "",
    rut: "",
    countryId: "",
    // Agrega más campos según sea necesario
  });
  const { modal } = useSelector((state) => state);
  const { isOpen } = modal;
  const [sociedad, setSociedad] = useState({
    title: "",
    description: "",
    rut: "",
    sapCode: "",
    countryId: 0,
  });

  const { actualVersion } = useSelector((state) => state);
  const [responseVersion, setResponseVersion] = useState({});

  useEffect(() => {
    setResponseVersion(actualVersion.response);
  }, [actualVersion]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones básicas, puedes personalizarlas según tus necesidades
    if (name === "title" && value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "El nombre de sociedad es obligatorio",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "",
      }));
    }

    // Actualizar el estado según el nombre del campo
    if (name === "countryId") {
      setSociedad((prevState) => ({
        ...prevState,
        countryId: value,
      }));
    } else {
      setSociedad((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const grabar = async () => {
    try {
      let errorsCopy = { ...errors };

      if (sociedad.title.trim() === "") {
        errorsCopy = {
          ...errorsCopy,
          title: "El nombre de sociedad es obligatorio",
        };
      } else {
        errorsCopy = {
          ...errorsCopy,
          title: "",
        };
      }

      if (sociedad.rut.trim() === "") {
        errorsCopy = {
          ...errorsCopy,
          rut: "El RUT es obligatorio",
        };
      } else {
        errorsCopy = {
          ...errorsCopy,
          rut: "",
        };
      }

      if (sociedad.countryId === 0) {
        errorsCopy = {
          ...errorsCopy,
          countryId: "Seleccione un País",
        };
      } else {
        errorsCopy = {
          ...errorsCopy,
          countryId: "",
        };
      }

      setErrors(errorsCopy);

      if (
        errorsCopy.title.trim() !== "" ||
        errorsCopy.rut.trim() !== "" ||
        errorsCopy.countryId.trim() !== ""
      ) {
        console.log("Por favor, complete todos los campos obligatorios.");
        return; // Salir de la función si hay campos vacíos
      }

      let nuevaSociedad = {
        title: sociedad.title,
        description: sociedad.description,
        rut: sociedad.rut,
        sapCode: sociedad.sapCode,
        countryId: sociedad.countryId,
      };

      console.log(nuevaSociedad);

      dispatch(createFirmProfile(nuevaSociedad, handleSuccess, handleFailure));

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  // Función que maneja el éxito de la operación
  const handleSuccess = (response) => {
    console.log("Operación exitosa:", response);
    const firmProfileId = response?.firmProfileId;
    const title = response?.title;
    const description = response?.description;
    const rut = response?.rut;
    const sapcode = response?.sapCode;
    const countryId = response?.countryId;

    if (firmProfileId) {
      console.log("firmProfileId:", title);

      const nuevoElemento = {
        firmId: null,
        firmProfileId: firmProfileId,
        name: title,
        description: description,
        rut: rut,
        country: countryId,
        sapCode: sapcode,
        investors: [],
      };
      const responseVersion2 = {
        ...responseVersion,
        firms: [...responseVersion.firms, nuevoElemento],
      };
      console.log(responseVersion2);
      dispatch(addNewFirm(responseVersion2));
    }
  };

  // Función que maneja un error en la operación
  const handleFailure = (error) => {
    console.error("Error en la operación:", error);
    // Puedes realizar más acciones aquí si es necesario
  };
  return (
    <>
      {isOpen && (
        <div className="flex w-screen h-screen fixed bg-black/60 z-50 backdrop-blur-sm">
          <div className="bg-white w-2/5 h-fit mx-auto p-5 rounded-md shadow-lg mt-72 relative">
            {/* header */}
            <div className="flex justify-between items-start">
              <h4 className="text-3xl font-extrabold mb-6">
                Guardar Nueva Sociedad
              </h4>

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

            <div class="w-full">
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    Nombre de sociedad
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    name="title"
                    value={sociedad.title}
                    onChange={handleChange}
                    required
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>
              </div>

              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    Descripción
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    name="description"
                    value={sociedad.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    RUT
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    name="rut"
                    value={sociedad.rut}
                    onChange={handleChange}
                    required
                  />
                  {errors.rut && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>
              </div>

              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    Código SAP
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="text"
                    name="sapCode"
                    value={sociedad.sapCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-password"
                  >
                    País
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="countryId"
                    value={sociedad.countryId}
                    onChange={handleChange}
                    required
                  >
                    <option value="0">--Seleccione un País--</option>
                    {listCountries?.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.countryId && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="flex justify-center items-center mt-7 gap-2">
              <div className="flex">
                <button
                  // onClick={handleSaveNewVersion}
                  onClick={() => grabar()}
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

                  <p>Guardar</p>
                </button>
              </div>

              <button
                onClick={() => handleClose()}
                className="border-2 px-5 py-2 rounded-md hover:bg-zinc-600 hover:text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalVersion;