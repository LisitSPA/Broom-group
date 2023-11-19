import React from 'react';
import Firm from './Firm';
import { useSelector } from 'react-redux';
const FirmContainer = React.memo(({ searchTerm }) => {
  console.log('paso por aqio');
  const reduxState = useSelector(state => state);
  console.log('Valor actual de searchTerm en FirmContainer:', searchTerm);
  let { firms } = reduxState.actualVersion.response;
  console.log('Valor actual de firms:', firms);
  
  const filteredFirms = firms.filter((firm) => {
    if (!searchTerm || searchTerm.trim() === "") {
      return true;
    }

  
    return Object.values(firm).some((value) => {
      if (value && typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return false;
    });
  });

  console.log('Firms sin filtrar:', firms);
  console.log('Firms filtradas:', filteredFirms);
  return (
    <div className='flex flex-col gap-6 justify-between w-8/12 items-center mx-auto my-12'>
      {filteredFirms?.map((firm, index) => (
        <Firm
          key={index}
          firm={firm}
          searchTerm={searchTerm}
        />
      ))}
    </div>
  );
});

export default FirmContainer;
