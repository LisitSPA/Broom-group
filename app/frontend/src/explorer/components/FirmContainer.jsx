import React from "react";
import Firm from "./Firm";
import { useSelector } from "react-redux";
const FirmContainer = React.memo(({ searchTerm }) => {
  const reduxState = useSelector((state) => state);
  let { firms } = reduxState.actualVersion.response;

  const filteredFirms = firms.filter((firm) => {
    if (!searchTerm || searchTerm.trim() === "") {
      return true;
    }

    return Object.values(firm).some((value) => {
      if (value && typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return false;
    });
  });

  return (
    <div className="flex flex-col gap-6 justify-between w-10/12 items-center mx-auto my-12">
      {filteredFirms?.map((firm, index) => (
        <Firm key={index} firm={firm} searchTerm={searchTerm} />
      ))}
    </div>
  );
});

export default FirmContainer;
