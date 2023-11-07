import React from 'react';
import { Sidebar } from '@/src/shared';
import Header from './Header';
import SimulationsContainer from './SimulationsContainer';

export default function Simulation() {

  return (
    <>
      <Sidebar />
      <div className='h-screen w-full overflow-auto bg-LightGrayishBlue'>
        <Header />
        <SimulationsContainer />
      </div>
    </>
  )
}
