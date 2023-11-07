import React from 'react'
import { 
  SearchIcon,
  ChevronDownIcon,
  TableCellsIcon,
} from '../../shared/assets/Icons'

const ToolBar = () => {
  return (
    <div className='flex justify-between w-9/12 items-center mx-auto bg-LightGrayishBlue pt-7 pb-1 sticky top-0 z-30'>
      <div className='flex h-8 w-1/2 gap-3'>
        <div className='flex w-full'>
          <input 
            type="text"
            className='border-y border-l rounded-l-md outline-none text-sm px-2 py-1 w-full'
            placeholder='busca por nombre de sociedad u otros campos'
          />
          <button className='flex justify-center items-center w-8 border-y border-r rounded-r-md'>
            <SearchIcon className="h-4 w-4 stroke-gray-800" />
          </button>
        </div>

        <div className='flex h-full text-xs shrink-0'>
          <div className='flex justify-between items-center gap-1'>
            <input type="checkbox" name="select_all" id="select_all" />
            <label className='select-none text-gray-700' htmlFor="select_all">seleccionar todo</label>
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center gap-1 h-8'>
        <button className='flex justify-between items-center h-full gap-2 border rounded-md text-sm text-Turquoise px-5 font-medium'>
          <TableCellsIcon className="h-4 w-4 stroke-2" />
          exportar selección
        </button>
      </div>
    </div>
  )
}

export default ToolBar