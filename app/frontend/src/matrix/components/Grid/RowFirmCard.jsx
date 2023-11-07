import React from 'react'

const RowFirmCard = ({
  firmName,
  firmRut
}) => {
  return (
    <div className="w-[calc(27.8vw)] sticky left-0 p-2 bg-slate-100">
      <div className="flex justify-between w-full bg-white text-sm p-2 px-5 rounded-md ">
        <div className="w-3/5">
          {firmRut}
        </div>
        <div className="w-2/5 text-end">
          {firmName}
        </div>
      </div>
    </div>
  )
}

export default RowFirmCard