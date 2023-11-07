import React from 'react'
import {
  ColsIcon,
  RowsIcon,
  TableCellsIcon,
  CloseIcon,
} from '../../../assets/Icons'

const Filters = () => {
  return (
    <>
      <div className='flex justify-between items-baseline mb-2'>
        <h2 className='text-base font-normal'>Filtros</h2>
        <span className='text-xs cursor-pointer select-none'>limpiar filtros</span>
      </div>
      <div className='flex flex-wrap gap-2'>
        <div className='flex items-center justify-between gap-2 text-xs py-1 px-2 rounded-md border select-none hover:bg-slate-50'>
          <TableCellsIcon className='w-4 h-4' />
          <span>
            Lorem ipsum dolor sit
          </span>
          <CloseIcon className="w-4 h-4 cursor-pointer stroke-gray-500 hover:stroke-gray-900" />
        </div>
      </div>
    </>
  )
}

export default Filters