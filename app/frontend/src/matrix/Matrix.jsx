import React, { useContext, useEffect } from "react";
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
  const searchText = useSelector((state) => state.searchText.searchText);

  useEffect(() => {
    dispatch(callMatrix());
  }, []);

  useEffect(() => {
    dispatch(callVersion(selectedVersion, searchText));
  }, [selectedVersion, searchText]);

  return (
    <>
      <Sidebar />
      <MatrixContainer />
      <Modal />
    </>
  );
};

export default Matrix;
