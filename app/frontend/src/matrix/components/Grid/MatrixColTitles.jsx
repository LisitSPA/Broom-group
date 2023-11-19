import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MatrixColTitles = () => {
  const { actualVersion } = useSelector((state) => state);
  const { firms, filteredData } = actualVersion.response;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const listFirms = filteredData || firms;
    setItems(listFirms);
  }, [firms, filteredData]);

  return (
    <>
      {items?.map((firm, index) => (
        <div
          className="flex w-28 p-3 text-sm pb-3 bg-gray-50 items-end"
          key={`MatrixColTitles_${index}`}
        >
          <div className="flex flex-col text-center justify-center">
            <div className="max-h-32 break-words text-ellipsis overflow-hidden">
              {firm.name}
            </div>
            <div className="text-center mt-2 shrink-0">{firm.rut}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MatrixColTitles;
