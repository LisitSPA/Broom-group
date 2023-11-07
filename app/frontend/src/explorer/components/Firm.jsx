import React, {
  useState,
  useEffect
} from 'react'
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon, DotIcon } from '../../shared/assets/Icons'
import { useSelector, useDispatch } from 'react-redux';
import { callFirm } from '@/redux/actions/firms';

const translateLevels = (ownersMap, firms) => {
  console.log(ownersMap, firms)
  if (ownersMap) {
    const { levels } = ownersMap

    // levels.forEach(level => {

    // })
  }
}

const Firm = ({firm}) => {
  const dispatch = useDispatch();
  const { 
    firmOwnersMap,
    actualVersion
  } = useSelector(state => state);
  const { response } = firmOwnersMap;
  const { firms } = actualVersion.response;

  const [firmId, setFirmId] = useState(firm.firmId)
  const [isOpen, setIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [firmStructure, setFirmStructure] = useState(null)

  const handleCheckbox = () => {
    setIsChecked(!isChecked)
  }

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    translateLevels(firmStructure, firms)
    if (!firmStructure) {
      dispatch(callFirm(firmId))
    }
  }, [isOpen])

  useEffect(() => {
    if (!firmStructure && response.firmId === firmId) {
      setFirmStructure(response.ownersMap)
    }
  }, [response])

  const classes = classNames('flex justify-between items-center p-6 z-20 rounded-md', {
    'bg-LightGray rounded-b-none': isOpen,
    'bg-white': !isOpen,
    'outline outline-1 outline-sky-400': isChecked
  });

  return (
    <AnimatePresence>
      <motion.div
        className="w-full border shadow-md rounded-md"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ height: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={classes}>
          <div className='flex flex-col w-3/12 shrink-0'>
            <div className='flex justify-start items-center gap-1 text-xs'>
              <input type="checkbox" checked={isChecked} onChange={handleCheckbox} />
              <label className='select-none' onClick={handleCheckbox}>Incluir en la exportación</label>
            </div>
            <h2 className='select-none text-lg'>{firm.name}</h2>
          </div>

          <div className='flex justify-between gap-1 items-center w-8/12 px-2'>
            <div className='flex flex-col justify-center items-center'>
              <div className='font-light text-lg'>{firm.rut}</div>
              <div className='text-sm'>Rut</div>
            </div>
            <div className='flex flex-col justify-center items-center w-1/5'>
              <div className='font-light text-lg text-center'>{firm.country}</div>
              <div className='text-sm'>País</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='font-light text-lg'>{firm.sapCode || '-'}</div>
              <div className='text-sm'>SAP code</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='font-light text-lg'>-</div>
              <div className='text-sm'>Soc.Finales</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <div className='font-light text-lg'>-</div>
              <div className='text-sm'>Niveles</div>
            </div>
          </div>

          <div className='flex justify-end align-middle w-1/12'>
            <button onClick={toggleOpen}>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDownIcon className='w-5 h-5 z-0' />
              </motion.div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='flex flex-row p-6 bg-white z-10 rounded-b-md'
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className='w-full'>
                <table class="w-full text-sm">
                  <thead>
                    <tr className='border-b text-left'>
                      <th className='w-16 text-center'>Nivel</th>
                      <th className='w-20 text-center'>%</th>
                      <th>Propietaria</th>
                      <th>Rut propietaria</th>
                      <th className='w-2/5'>Subsidiaria/s</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='hover:bg-slate-100'>
                      <td className='text-center'>1</td>
                      <td className='text-center'>10%</td>
                      <td>Lorem Ipsum</td>
                      <td>11.111.111-1</td>
                      <td className='flex items-center gap-2'>
                        <div className='flex flex-wrap items-center gap-1 my-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span className='border p-1 bg-slate-100 rounded-md'>
                            Nombre de la sociedad
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className='hover:bg-slate-100'>
                      <td className='text-center'>1</td>
                      <td className='text-center'>10%</td>
                      <td>Lorem Ipsum</td>
                      <td>11.111.111-1</td>
                      <td className='flex items-center gap-2'>
                        <div className='flex flex-wrap items-center gap-1 my-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span className='border p-1 bg-slate-100 rounded-md'>
                            Nombre de la sociedad
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className='hover:bg-slate-100 border-t'>
                      <td className='text-center'>2</td>
                      <td className='text-center'>10%</td>
                      <td>Lorem Ipsum</td>
                      <td>11.111.111-1</td>
                      <td className='flex items-center gap-2'>
                        <div className='flex flex-wrap items-center gap-1 my-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span className='border p-1 bg-slate-100 rounded-md'>
                            Nombre de la sociedad
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

export default Firm