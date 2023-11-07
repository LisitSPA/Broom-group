import React, {
  useRef,
  useState,
} from 'react'
import useOutsideClick from '../../hooks/useOutsideClick'
import { motion, AnimatePresence } from "framer-motion";

const VersionSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  useOutsideClick(dropdownRef, buttonRef, () => handleCloseDropdown())
  
  const handleOpenDropdown = () => {
    if (!isOpen) setIsOpen(true)
  }

  const handleCloseDropdown = () => {
    if (isOpen) setIsOpen(false)
  }

  return (
    <>
      <div className='flex justify-center w-full'>
        <div className='flex w-3/5 relative'>
          <div className='flex w-full h-8'>
            <input 
              className='flex w-full rounded-l-md text-center text-sm pl-8 outline-none'
              onClick={handleOpenDropdown}
              placeholder='Buscar una versión' 
              type="text"
            />
            <button 
              className='flex justify-center items-center w-8 bg-white rounded-r-md'
              ref={buttonRef}
              onClick={handleOpenDropdown}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className='w-full top-9 flex p-1 rounded-md absolute bg-white shadow-xl z-30 max-h-48 overflow-auto'
                ref={dropdownRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1 }}
              >
                <ul className='w-full text-center text-sm'>
                  <li className='py-2 hover:bg-slate-50 cursor-pointer'>This is a version</li>
                  <li className='py-2 hover:bg-slate-50 cursor-pointer'>This is a version</li>
                  <li className='py-2 hover:bg-slate-50 cursor-pointer'>This is a version</li>
                  <li className='py-2 hover:bg-slate-50 cursor-pointer'>This is a version</li>
                  <li className='py-2 hover:bg-slate-50 cursor-pointer'>This is a version</li>
                  <li className='py-2 hover:bg-slate-50 cursor-pointer'>This is a version</li>
                  <li className='py-2 hover:bg-slate-50 cursor-pointer'>This is a version</li>
                  <li className='py-2 hover:bg-slate-50 cursor-pointer'>This is a version</li>
                  <li className='py-2 hover:bg-slate-50 cursor-pointer'>This is a version</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default VersionSelector