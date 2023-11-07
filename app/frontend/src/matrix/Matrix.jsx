import React, { useEffect } from 'react';
import { Sidebar } from '@/src/shared';
import MatrixContainer from './components/MatrixContainer';
import Modal from './components/Modal/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { callMatrix } from '@/redux/actions/matrix';
import { callVersion } from '@/redux/actions/versions';

const Matrix = () => {
  const dispatch = useDispatch();
  const { matrix } = useSelector(state => state);
  const { response } = matrix;
  
  useEffect(() => {
    dispatch(callMatrix());
  }, []);
  
  useEffect(() => {
    dispatch(callVersion(response.lastVersionId));
  }, [matrix]);
  
  return (
    <>
      <Sidebar />
      <MatrixContainer />
      <Modal />
    </>
  )
}

export default Matrix;