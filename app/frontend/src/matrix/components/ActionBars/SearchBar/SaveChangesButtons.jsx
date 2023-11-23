import { openModal } from "@/redux/actions/modal";
import React from "react";
import { useDispatch } from "react-redux";

const SaveChangesButtons = () => {
  const dispatch = useDispatch();

  const handlerSaveChanges = () => {
    dispatch(openModal());
  };

  const handlerDiscardChanges = () => {};
  return (
    <>
      <button
        onClick={handlerSaveChanges}
        className="rounded-md px-5 py-2 bg-LightBlueGray text-white text-xs"
      >
        Guardar cambios
      </button>
      <button
        onClick={handlerDiscardChanges}
        className="rounded-md px-5 py-2 bg-DarkSlateGray text-white text-xs"
      >
        Descartar
      </button>
    </>
  );
};

export default SaveChangesButtons;
