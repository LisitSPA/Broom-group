import React, { useState, useEffect, useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { openModal } from '@/redux/actions/modal';
import { motion, AnimatePresence } from "framer-motion";
import { 
  useSelector,
  useDispatch
} from 'react-redux';

const FirmsActionSelector = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, buttonRef, () => handleCloseDropdown());

  const handleOpenDropdown = () => {
    if (!isOpen) setIsOpen(true);
  };

  const handleCloseDropdown = () => {
    if (isOpen) setIsOpen(false);
  };

  const handleOpenModal = () => {
    dispatch(openModal("modalVersion"));
  }
  return (
    <div className="flex justify-between items-center gap-1 relative">
      <button className="text-sm bg-white p-3 h-7 rounded-md flex items-center gap-3" onClick={handleOpenModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
          />
        </svg>
        Añadir nueva sociedad
      </button>
      {/* <button
        className="flex justify-center items-center bg-white h-7 w-7 rounded-md"
        ref={buttonRef}
        onClick={handleOpenDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button> */}

      {/* <AnimatePresence>
        {isOpen && (
          <motion.div 
            className='absolute p-1 text-sm bg-white rounded-md w-full text-right top-9 shadow-lg'
            ref={dropdownRef} 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1 }}
          >
            <ul className='text-right'>
              <li className='p-2 rounded-md cursor-pointer hover:bg-slate-50'>eliminar sociedades</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default FirmsActionSelector;
