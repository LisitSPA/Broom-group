import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Cell = ({
  subsidiaryProfileId,
  ownerProfileId,
  investors,
  handlePercentageToSave,
  error,
}) => {
  const [percentage, setPercentage] = useState(null);
  const selectedVersion = useSelector(
    (state) => state.selectedVersion.selectedVersion
  );

  useEffect(() => {
    const investor = investors?.find(
      (inv) => inv.ownerFirmProfileId === ownerProfileId
    );

    if (investor) {
      setPercentage(investor.percentage);
    } else {
      setPercentage(null);
    }

    return () => setPercentage(null);
  }, [selectedVersion, ownerProfileId, investors]);

  const handlePercentageChange = (e) => {
    const newPercentage =
      e.target.value === "0" ? null : parseFloat(e.target.value) || null;

    setPercentage(newPercentage);
    handlePercentageToSave(newPercentage, subsidiaryProfileId, ownerProfileId);
  };

  const cellClasses = classNames(
    "rounded-md w-full h-full border border-solid-white focus:outline-TealBlue hover:border-TealBlue text-center px-2",
    {
      "bg-slate-50 border-none": subsidiaryProfileId === ownerProfileId,
      "bg-white": subsidiaryProfileId !== ownerProfileId,
    }
  );

  return (
    <div className="flex h-full w-28 p-2 text-center">
      <input
        className={cellClasses}
        style={{ border: error && "2px solid #f07167" }}
        type="number"
        min="0"
        max="100"
        step="1"
        value={percentage || ""}
        onChange={handlePercentageChange}
        disabled={subsidiaryProfileId === ownerProfileId}
      />
    </div>
  );
};

export default Cell;
