import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RowFirmCard from "./RowFirmCard";
import Cell from "./Cell";
import { updateOwnershipPercentage } from "@/redux/actions/versions";

const Matrix = () => {
  const dispatch = useDispatch();
  const { actualVersion } = useSelector((state) => state);
  const { firms, filteredData, firmsSignature, investorsSignature } =
    actualVersion.response;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const listItems = filteredData || firms;
    setItems(listItems);

    return () => setItems([]);
  }, [firms, filteredData]);

  const getFormattedInvestors = () => {
    const formattedInvestors = updatedItems
      .map((item) => {
        const { firmProfileId, investors } = item;

        if (investors && investors.length > 0) {
          return investors.map((investor) => ({
            subsidiaryProfileId: firmProfileId,
            ownerProfileId:
              investor.ownerFirmProfileId || investor.ownerProfileId || "",
            percentage: investor.percentage || 0,
          }));
        }
      })
      .flat();

    dispatch(updateOwnershipPercentage(formattedInvestors));
  };

  let updatedItems = [...items];

  const handlePercentageToSave = (
    newPercentage,
    subsidiaryProfileId,
    ownerProfileId
  ) => {
    // Clonar el array de items para no modificar el estado directamente

    // Buscar el índice del item que coincide con subsidiaryProfileId
    const subsidiaryIndex = updatedItems.findIndex(
      (item) => item.firmProfileId === subsidiaryProfileId
    );

    if (subsidiaryIndex !== -1) {
      // Buscar el índice del investor en el array de investors
      const investorIndex = updatedItems[subsidiaryIndex].investors.findIndex(
        (investor) => investor.ownerProfileId === ownerProfileId
      );

      if (investorIndex !== -1) {
        // Si el investor existe, actualizar el porcentaje
        updatedItems[subsidiaryIndex].investors[investorIndex].percentage =
          newPercentage;
      } else {
        // Si el investor no existe, agregar uno nuevo
        updatedItems[subsidiaryIndex].investors.push({
          subsidiaryProfileId,
          ownerProfileId,
          percentage: newPercentage,
        });
      }

      getFormattedInvestors(updatedItems);
    }
  };

  if (!items?.length)
    return <p style={{ margin: "1rem" }}>No se encotraron resultados!</p>;

  return (
    <>
      {items?.map((subsidiary_firm, subsidiary_idx) => (
        <div className="flex hover:outline hover:outline-1 outline-TealBlue/60">
          <RowFirmCard
            key={`subsidiary_firm_${subsidiary_idx}`}
            firmName={subsidiary_firm.name}
            firmRut={subsidiary_firm.rut}
          />

          {items?.map((owner_firm, owner_idx) => (
            <Cell
              key={`owner_firm_${subsidiary_firm.firmProfileId}`}
              subsidiaryProfileId={subsidiary_firm.firmProfileId}
              ownerProfileId={owner_firm.firmProfileId}
              investors={subsidiary_firm.investors}
              handlePercentageToSave={handlePercentageToSave}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Matrix;
