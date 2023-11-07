import React from 'react'

const SimulationCard = () => {
  return (
    <div className='flex flex-col w-full rounded-md border p-4 bg-white gap-2 hover:outline hover:outline-1 outline-slate-300'>
      <div className='flex justify-between items-center'>
        <h2>Simulation Title</h2>
        <div className='flex justify-end gap-1'>
          <button className='flex justify-center items-center h-8 w-8 border rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
          <button className='flex justify-center items-center h-8 w-8 border rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
      <div className='rounded-md p-3 text-sm font-light border bg-gray-50'>
        <span className='font-normal'>Descripción: </span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore autem voluptates voluptas fuga natus explicabo!
      </div>
      <div className='flex justify-between items-baseline'>
        <div className='flex flex-col text-xs font-light'>
          <div className='text-sm'>
            2021-08-31 12:00:00
          </div>
          <div>
            creado por <span className='font-medium'>creator</span>
          </div>

        </div>

        <div className='flex justify-end gap-2 text-sm self-end'>
          <button className='flex justify-center gap-2 items-center rounded-md py-1 px-2 border border-sky-600 text-sky-600'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
            </svg>
            Matriz
          </button>
          <button className='flex justify-center items-center rounded-md py-1 px-2 border border-Turquoise text-Turquoise'>Exportar matriz simulada</button>
        </div>
      </div>
    </div>
  )
}

export default SimulationCard