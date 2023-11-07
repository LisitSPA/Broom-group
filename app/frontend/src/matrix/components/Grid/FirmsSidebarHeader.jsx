import React from 'react'
import VersionSelector from './VersionSelector'
import FirmsActionSelector from './FirmsActionSelector'

const FirmsSidebarHeader = () => {
  return (
    <div className="w-[calc(27.8vw)] sticky left-0 top-0 bg-slate-100 px-5 py-4 justify-center border-b">
      <VersionSelector />

      <div className='flex justify-between mt-5 items-center'>
        <span>Sociedades de Inversión</span>
        <FirmsActionSelector />
      </div>
    </div>
  )
}

export default FirmsSidebarHeader