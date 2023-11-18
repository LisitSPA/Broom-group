import React from "react";
import RowFirmCard from "./RowFirmCard";
import Cell from "./Cell";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";

const Matrix = () => {
  const { actualVersion } = useSelector((state) => state);
  const { firms, filteredData, firmsSignature, investorsSignature } =
    actualVersion.response;
  const listFirms = filteredData || firms;

  const firmsProfileIdsString = listFirms
    ?.map((firm) => firm.firmProfileId)
    .sort((a, b) => a - b)
    .join("");
  const firmsHash = CryptoJS.SHA256(firmsProfileIdsString).toString();

  const investorsProfileIdsString = listFirms
    ?.map((firm) =>
      firm?.investors?.map((investor) => investor.ownerFirmProfileId).flat()
    )
    .flat()
    .sort((a, b) => a - b)
    .join("");
  const investorsHash = CryptoJS.SHA256(investorsProfileIdsString).toString();

  if (!listFirms?.length) {
    return <p style={{ margin: "1rem" }}>No se encotraron resultados!</p>;
  }

  return (
    <>
      {listFirms?.map((subsidiary_firm, subsidiary_idx) => (
        <div className="flex hover:outline hover:outline-1 outline-TealBlue/60">
          <RowFirmCard
            key={subsidiary_idx}
            firmName={subsidiary_firm.name}
            firmRut={subsidiary_firm.rut}
          />

          {listFirms?.map((owner_firm, owner_idx) => (
            <Cell
              key={owner_idx}
              subsidiaryProfileId={subsidiary_firm.firmProfileId}
              ownerProfileId={owner_firm.firmProfileId}
              investors={subsidiary_firm.investors}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Matrix;
