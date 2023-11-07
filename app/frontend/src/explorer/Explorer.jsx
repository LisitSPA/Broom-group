import React from 'react';
import { Sidebar } from '@/src/shared';

import ToolBar from './components/ToolBar';
import FirmContainer from './components/FirmContainer';

const Explorer = () => {
  return (
    <>
      <Sidebar />
      <div className='w-full h-screen overflow-auto bg-LightGrayishBlue'>
        <div className='container mx-auto'>
          <ToolBar />
          <FirmContainer />
        </div>
      </div>
    </>
  )
}

export default Explorer;