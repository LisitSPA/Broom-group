import React from 'react'
import Firm from './Firm'
import { useSelector } from 'react-redux';

const FirmContainer = () => {
  const { actualVersion } = useSelector(state => state);
  const { firms } = actualVersion.response;

  return (
    <div className='flex flex-col gap-6 justify-between w-8/12 items-center mx-auto my-12'>
      {firms.map((firm, index) => (
        <Firm
          key={index}
          firm={firm}
        />
      ))}

    </div>
  )
}

export default FirmContainer