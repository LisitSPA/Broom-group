import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RowFirmCard from "./RowFirmCard";
import Cell from "./Cell";
import { updateOwnershipPercentage } from "@/redux/actions/versions";

const Matrix = () => {
  const dispatch = useDispatch();
  const { actualVersion } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState({});
  const { firms, filteredData } = actualVersion.response;
  const [items, setItems] = useState([]);
  //Se crea state para almacenar los valores de la búsqueda del cuadrante derecho al realizar una búsqueda
  const [items2, setItems2] = useState([]);
  const textError = "El porcentaje total no suma 100%";

  const getErrorList = (items) => {
    const errorList = items?.reduce((errors, profile) => {
      const { firmProfileId, investors } = profile;
      let totalPercentage = 0;
      if (investors.length > 0) {
        totalPercentage = calculateTotalPercentage(investors);
      }
      if (totalPercentage !== 100) {
        errors[firmProfileId] = textError;
      }

      return errors;
    }, {});
    return errorList;
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    const listItems = filteredData || firms;
    setErrorState(getErrorList(listItems));
    setItems(listItems);
    //Se almacena consulta para cuadrante del lado derecho
    setItems2(firms);

    return () => {
      clearTimeout(timeout);
      setItems([]);
    };
  }, [firms, filteredData]);

  const calculateTotalPercentage = (investors) => {
    return investors.reduce((sum, investor) => sum + investor.percentage, 0);
  };

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
        (investor) => investor.ownerFirmProfileId === ownerProfileId
      );

      if (investorIndex !== -1) {
        // Si el investor existe, actualizar el porcentaje
        updatedItems[subsidiaryIndex].investors[investorIndex].percentage =
          newPercentage;
      } else {
        // Si el investor no existe, agregar uno nuevo
        updatedItems[subsidiaryIndex].investors.push({
          subsidiaryProfileId,
          ownerFirmProfileId: ownerProfileId,
          percentage: newPercentage,
        });
      }

      getFormattedInvestors(updatedItems);
    }

    const totalPercentage = calculateTotalPercentage(
      updatedItems[subsidiaryIndex].investors
    );

    const newErrorState = { ...errorState };

    if (totalPercentage !== 100) {
      newErrorState[subsidiaryProfileId] = textError;
    } else {
      newErrorState[subsidiaryProfileId] = "";
    }
    setErrorState(newErrorState);
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : items && items.length ? (
        <>
          {items?.map((subsidiary_firm, subsidiary_idx) => (
            <div className="flex hover:outline hover:outline-1 outline-TealBlue/60">
              <RowFirmCard
                key={`subsidiary_firm_${subsidiary_idx}`}
                firmName={subsidiary_firm.name}
                firmRut={subsidiary_firm.rut}
                error={errorState[subsidiary_firm.firmProfileId]}
              />

              {items2?.map((owner_firm, owner_idx) => (
                <Cell
                  key={`owner_firm_${owner_idx}`}
                  subsidiaryProfileId={subsidiary_firm.firmProfileId}
                  ownerProfileId={owner_firm.firmProfileId}
                  investors={subsidiary_firm.investors}
                  handlePercentageToSave={handlePercentageToSave}
                  error={
                    errorState[subsidiary_firm.firmProfileId] &&
                    owner_firm.firmProfileId !== subsidiary_firm.firmProfileId
                  }
                />
              ))}
            </div>
          ))}
        </>
      ) : (
        <p style={{ margin: "1rem" }}>No se encontraron resultados.</p>
      )}
    </>
  );
};

export default Matrix;
