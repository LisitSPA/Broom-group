import { updateOwnershipPercentage } from "@/redux/actions/versions";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Cell = ({ subsidiaryProfileId, ownerProfileId, investors }) => {
  const dispatch = useDispatch();
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
  }, [selectedVersion, ownerProfileId, investors]);

  const handlePercentageChange = (e) => {
    const newPercentage =
      e.target.value === "0" ? null : parseFloat(e.target.value) || null;
    setPercentage(newPercentage);
    const ownerships = [];
    const updatedOwnership = {
      ownerProfileId: ownerProfileId,
      subsidiaryProfileId: subsidiaryProfileId,
      percentage: newPercentage,
    };
    ownerships.push(updatedOwnership);
    dispatch(updateOwnershipPercentage(ownerships));
  };

  const cellClasses = classNames(
    "rounded-md w-full h-full border-none focus:outline-TealBlue text-center px-2",
    {
      "bg-slate-50": subsidiaryProfileId === ownerProfileId,
      "bg-white": subsidiaryProfileId !== ownerProfileId,
    }
  );

  return (
    <div className="flex h-full w-28 p-2 text-center">
      <input
        className={cellClasses}
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
