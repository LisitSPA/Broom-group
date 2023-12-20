import React, { useEffect, useState } from "react";
import { Sidebar } from "@/src/shared";
import MatrixContainer from "./components/MatrixContainer";
import Modal from "./components/Modal/Modal";

import { useSelector, useDispatch } from "react-redux";
import { callMatrix } from "@/redux/actions/matrix";
import { callVersion } from "@/redux/actions/versions";
import ModalVersion from "./components/Modal/ModalVersion";

const Matrix = () => {
  const dispatch = useDispatch();
  const [listVersions, setListVersions] = useState();
  const selectedVersion = useSelector(
    (state) => state.selectedVersion.selectedVersion
  );

  const typeModal = useSelector((state) => state.modal.modalType);

  useEffect(() => {
    dispatch(callMatrix());
  }, []);

  useEffect(() => {
    dispatch(callVersion(selectedVersion));
  }, [selectedVersion]);

  return (
    <>
      <Sidebar />
      <MatrixContainer versions={listVersions} />
      {typeModal == "modalVersion" ? (
        <ModalVersion />
      ) : (
        <Modal setVersions={setListVersions} />
      )}
    </>
  );
};

export default Matrix;
