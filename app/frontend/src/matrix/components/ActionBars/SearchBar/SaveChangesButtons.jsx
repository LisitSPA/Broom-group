import { openModal } from "@/redux/actions/modal";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SaveChangesButtons = () => {
  const dispatch = useDispatch();
  const { updatedOwnership } = useSelector((state) => state);
  const handlerSaveChanges = () => {
    dispatch(openModal());
  };
  console.log("updatedOwnership", updatedOwnership);
  return (
    <>
      <button
        onClick={handlerSaveChanges}
        className="rounded-md px-5 py-2 bg-LightBlueGray text-white text-xs"
      >
        Guardar cambios
      </button>
      <button className="rounded-md px-5 py-2 bg-DarkSlateGray text-white text-xs">
        Descartar
      </button>
    </>
  );
};

export default SaveChangesButtons;
