import React, { useEffect } from "react";
import { Sidebar } from "@/src/shared";
import MatrixContainer from "./components/MatrixContainer";
import Modal from "./components/Modal/Modal";

import { useSelector, useDispatch } from "react-redux";
import { callMatrix } from "@/redux/actions/matrix";
import { callVersion } from "@/redux/actions/versions";

const Matrix = () => {
  const dispatch = useDispatch();
  const selectedVersion = useSelector(
    (state) => state.selectedVersion.selectedVersion
  );

  useEffect(() => {
    dispatch(callMatrix());
  }, []);

  useEffect(() => {
    console.log("se actualiza a version:", selectedVersion);
    dispatch(callVersion(selectedVersion));
  }, [selectedVersion]);

  return (
    <>
      <Sidebar />
      <MatrixContainer />
      <Modal />
    </>
  );
};

export default Matrix;
