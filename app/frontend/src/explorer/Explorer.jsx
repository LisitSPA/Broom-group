import React, { useState } from 'react';
import { Sidebar } from '@/src/shared';

import ToolBar from './components/ToolBar';
import FirmContainer from './components/FirmContainer';
import { useSelector } from 'react-redux';

const Explorer = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };
  return (
    <>
      <Sidebar />
      <div className='w-full h-screen overflow-auto bg-LightGrayishBlue'>
        <div className='container mx-auto'>
       <ToolBar onSearchTermChange={handleSearchTermChange} />
          <FirmContainer searchTerm={searchTerm} />
        </div>
      </div>
    </>
  )
}

export default Explorer;