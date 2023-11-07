import React, {
  useState,
  useEffect,
  useRef,
} from 'react'
import {
  SearchIcon,
  ColsIcon,
  RowsIcon,
  TableCellsIcon,
} from '../../../assets/Icons'
import { motion, AnimatePresence } from "framer-motion";
import useOutsideClick from '../../../hooks/useOutsideClick';
import Filters from './Filters';


const SearchBar = () => {
  const filterOptions = [
    'col',
    'row',
    'rowAndCols'
  ]

  const [searchValue, setSearchValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedFilterOption, setSelectedFilterOption] = useState(filterOptions[0])
  const [selectedIcon, setSelectedIcon] = useState(<TableCellsIcon className='w-4 h-4 stroke-2' />)

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, buttonRef, () => {
    if (showDropdown) setShowDropdown(false);
  });

  useEffect(() => {
    switch (selectedFilterOption) {
      case 'col':
        setSelectedIcon(<ColsIcon />)
        break;
      case 'row':
        setSelectedIcon(<RowsIcon />)
        break;
      case 'rowAndCols':
        setSelectedIcon(<TableCellsIcon />)
        break;
      default:
        break;
    }
  }, [selectedFilterOption])

  const handleFilterOptionClick = () => {
    const nextFilterOptionIdx = (filterOptions.indexOf(selectedFilterOption) + 1) % filterOptions.length
    setSelectedFilterOption(filterOptions[nextFilterOptionIdx])
  }

  const handleOpenDropdown = () => {
    if (!showDropdown) setShowDropdown(true)
  }

  return (
    <>
      <div className="flex w-full relative">
        <button ref={buttonRef} className='flex items-center justify-center h-8 w-8 bg-slate-50 rounded-l-md border-gray-300 border-y border-l'>
          <SearchIcon className='w-4 h-4 stroke-2' />
        </button>
        <input
          type="text"
          placeholder="Buscar por nombre o rut"
          onClick={handleOpenDropdown}
          className="w-full h-8 border-gray-300 bg-slate-50 font-light placeholder:text-gray-400 text-sm rounded-r-md border-y border-r focus:outline-none"
        />

        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              ref={dropdownRef}
              className='absolute w-full bg-white px-5 py-3 rounded-md top-9 shadow-lg border max-h-80 overflow-auto'>
              <h2 className='text-base font-normal'>Resultados</h2>
              <ul className='font-light text-sm select-none cursor-pointer'>
                <li className='px-2 py-1 rounded-md hover:bg-slate-50'>This is a result</li>
                <li className='px-2 py-1 rounded-md hover:bg-slate-50'>This is a result</li>
                <li className='px-2 py-1 rounded-md hover:bg-slate-50'>This is a result</li>
              </ul>
              <hr className='my-2' />
              <Filters />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button className="border border-gray-300 bg-slate-50 px-2 rounded-md text-gray-400 hover:text-gray-900 hover:border-gray-400" onClick={handleFilterOptionClick}>
        {React.cloneElement(selectedIcon, {
          className: 'w-4 h-4 stroke-2',
        })}
      </button>
    </>
  )
}

export default SearchBar