import React from 'react'
import ImportExportSelector from './ImportExportSelector'

const LeftTopSelectors = () => {
  return (
    <div className='w-4/12 flex justify-between p-3'>
      <div className='flex items-center justify-center w-2/5 bg-white text-xs text-slate-400 rounded-md select-none'>
        Base de Datos Principal
      </div>
      
      <ImportExportSelector />
    </div>
  )
}

export default LeftTopSelectors