import React, { 
  useState,
  useEffect,
  useRef
} from 'react';
import { TableCellsIcon, ChevronDownIcon } from '../../assets/Icons';
import useOutsideClick from '../../hooks/useOutsideClick';
import { motion, AnimatePresence } from 'framer-motion';
import { openModal } from '@/redux/actions/modal';
import { 
  useSelector,
  useDispatch
} from 'react-redux';

const ImportExportSelector = () => {
  const dispatch = useDispatch();
  const { modal } = useSelector(state => state.modal);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useOutsideClick(dropdownRef, buttonRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }

  const handleOpenModal = () => {
    dispatch(openModal('ThisIsAModal'));
  }

  return (
    <div className='w-2/5 flex justify-between gap-1 text-xs relative'>
      <button 
        className='flex items-center justify-center gap-2 bg-white w-full rounded-md text-Turquoise'
        onClick={handleOpenModal}
      >
        <TableCellsIcon className="w-5 h-5 stroke-1" />
        Importar matriz
      </button>
      <button ref={buttonRef} onClick={handleOpen} className='flex justify-center items-center bg-white w-12 rounded-md'>
        <ChevronDownIcon className="w-4 h-4 stroke-Turquoise stroke-2" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1 }}
            className='absolute bg-white p-1 w-full rounded-md top-10 z-50 shadow-lg'
          >
            <ul className='text-right'>
              <li className='p-2 rounded-md cursor-pointer hover:bg-slate-50'>Exportar matriz</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ImportExportSelector;
