import React from 'react'
import { ChevronDownIcon } from '../matrix/assets/Icons'

const Header = () => {
  return (
    <div className='flex justify-between w-full sticky top-0 bg-gradient-to-r from-RoseRed via-SlateGray to-AquaTeal text-white px-10 pt-10 pb-5'>
      <div className='container mx-auto flex items-center w-full justify-between'>
        <div className='flex items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-w-12 stroke-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
          <div className='font-light leading-tight text-lg'>
            <h2>Escenarios</h2>
            <h2>simulados</h2>
          </div>
        </div>

        <div className='flex h-8 w-5/12 gap-1'>
          <input type="text"
            className='rounded-md w-full px-2 text-right text-sm border outline-none'
            placeholder='selecciona o busca una matriz simulada'
          />
          <button className='flex justify-center items-center w-8 bg-white rounded-md border'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 stroke-gray-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Header