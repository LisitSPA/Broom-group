import React, { useEffect } from "react";
import { Sidebar } from "@/src/shared";
import MatrixContainer from "./components/MatrixContainer";
import Modal from "./components/Modal/Modal";

import { useSelector, useDispatch } from "react-redux";
import { callMatrix } from "@/redux/actions/matrix";
import { callVersion } from "@/redux/actions/versions";
import ModalVersion from "./components/Modal/ModalVersion";

const Matrix = () => {
  const dispatch = useDispatch();
  const selectedVersion = useSelector(
    (state) => state.selectedVersion.selectedVersion
  );

  const typeModal = useSelector(
    (state) => state.modal.modalType
  );

  useEffect(() => {
    dispatch(callMatrix());
  }, []);

  useEffect(() => {
    dispatch(callVersion(selectedVersion));
  }, [selectedVersion]);

  return (
    <>
      <Sidebar />
      <MatrixContainer />
      { 
        typeModal == "modalVersion" ? <ModalVersion /> : <Modal />
      }      
    </>
  );
};

export default Matrix;
