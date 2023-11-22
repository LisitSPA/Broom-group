import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/redux/actions/modal";
import { createVersion, addNewFirm } from "@/redux/actions/versions";

const ModalVersion = () => {
  const dispatch = useDispatch();

  const { modal } = useSelector((state) => state);
  const { isOpen } = modal;
  const [sociedad, setSociedad] = useState({
    title:'',
    description:'',
    rut: '',
    sapCode:'',
    countryId:0
  });

  const { actualVersion, country } = useSelector((state) => state);
  const [responseVersion, setResponseVersion] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setResponseVersion(actualVersion.response);
  }, [actualVersion]);

  useEffect(() => {
    setCountries(country.response);
    console.log(countries);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setSociedad(prevState => ({
      ...prevState,
      [name]: value,
    }));    
  }

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSaveNewVersion = () => {
    dispatch(
      createVersion({
        versionData: {
          matrixId: 2,
          authorId: 2,
          title: "prueba",
          description: "test",
          isSimulated: false,
          sourceFile: null,
        },
        firmProfilesIds: [],
        ownerships: [
          {
            ownerProfileId: 1,
            subsidiaryProfileId: 1,
            percentage: 1,
          },
        ],
      })
    );
  };

  const grabar = async () => {
    debugger
    try {
      //Obtenemos el arreglo actual del localStorage (si existe)
      let sociedades = JSON.parse(localStorage.getItem("sociedades")) || [];
  
      // Agregamos el nuevo objeto al arreglo
      let nuevaSociedad = {
        title: sociedad.title,
        description: sociedad.description,
        rut: sociedad.rut,
        sapCode: sociedad.sapCode,
        countryId: sociedad.countryId
      };
  
      sociedades.push(nuevaSociedad);
  
      // Almacenarmos el arreglo actualizado en el localStorage
      localStorage.setItem("sociedades", JSON.stringify(sociedades));

      let paisNombre = countries.filter(x => x.id == sociedad.countryId);

      const nuevoElemento = {        
            firmId: null,
            firmProfileId: null,
            name: sociedad.title,
            description: sociedad.description,
            rut: sociedad.rut,
            country: sociedad.countryId === 0 ? '' : paisNombre[0].name,
            sapCode: sociedad.sapCode,
            investors: [],
      };

      console.log(nuevoElemento);

      const responseVersion2 = {
        ...responseVersion,
        firms: [...responseVersion.firms, nuevoElemento],
      };

      dispatch(addNewFirm(responseVersion2));
  
      console.log("Sociedad ingresada correctamente");
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };  

  return (
    <>
      {isOpen && (
        <div className="flex w-screen h-screen fixed bg-black/60 z-50 backdrop-blur-sm">
          <div className="bg-white w-2/5 h-fit mx-auto p-5 rounded-md shadow-lg mt-72 relative">
            {/* header */}
            <div className="flex justify-between items-start">
              <h3 className="text-3xl font-extrabold mb-6">Guardar Nueva Sociedad</h3>

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
            {/* max-w-sm"> */}
              {/* <div className="flex flex-col w-full text-sm rounded-md gap-1">
              <div className='flex items-center w-full gap-2'>
                <label className='w-3/10'>Nombre de sociedad</label>
                <input type="text" className='h-8 w-7/10 border p-2 rounded-md text-center' placeholder='Nombre Sociedad' />
              </div>
              <div className='flex items-center w-full gap-2'>
                <label className='w-3/10'>RUT:</label>
                <input type="text" className='h-8 w-7/10 border p-2 rounded-md text-center' placeholder='11.111.111-1' />
              </div>
              <div className='flex items-center w-full gap-2'>
                <label className='w-3/10'>Código SAP</label>
                <input type="text" className='h-8 w-7/10 border p-2 rounded-md text-center' placeholder='Código SAP' />
              </div>
              <div className='flex items-center w-full gap-2'>
                <label className='w-3/10'>País:</label>
                <input type="text" className='h-8 w-7/10 border p-2 rounded-md text-center' placeholder='País' />
              </div>
              </div> */}

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                Nombre de sociedad
                </label>
              </div>
              <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text" name="title" value={sociedad.title} onChange={handleChange} required />
              </div>
            </div>

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Descripción
                </label>
              </div>
              <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text"
                name="description" value={sociedad.description} onChange={handleChange} />
              </div>
            </div>

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  RUT
                </label>
              </div>
              <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text"
                name="rut" value={sociedad.rut} onChange={handleChange} />
              </div>
            </div>

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Código SAP
                </label>
              </div>
              <div class="md:w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text"
                name="sapCode" value={sociedad.sapCode} onChange={handleChange} />
              </div>
            </div>

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                  País
                </label>
              </div>
              <div class="md:w-2/3">
              <select class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="countryId" value={sociedad.countryId} onChange={handleChange} >
                <option value="0">--Seleccione un País--</option>
                      {countries?.map(i => (
                        <option key={i.id} label={i.name} id={i.name} value={i.id}>{i.name}</option>
                      ))}
                </select>
              </div>
            </div>
            </div>         

            {/* footer */}
            <div className="flex justify-center items-center mt-7 gap-2">
              <div className="flex">
              
                <button
                  // onClick={handleSaveNewVersion}
                  onClick={()=> grabar()}                  
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

              <button onClick={ ()=> handleClose() } className="border-2 px-5 py-2 rounded-md hover:bg-zinc-600 hover:text-white">
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
