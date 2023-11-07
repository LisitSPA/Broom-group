import React from 'react'
import SimulationCard from './SimulationCard'

const SimulationsContainer = () => {
  return (
    <div className='flex flex-col justify-between w-8/12 mx-auto my-12'>
      <h1 className='w-full mx-auto font-light text-xl text-left mb-2'>N Simulaciones</h1>
      <div className='flex flex-col w-full gap-6'>
        <SimulationCard />
      </div>
    </div>
  )
}

export default SimulationsContainer