import React, { useEffect, useState } from "react";
import SimulationCard from "./SimulationCard";
import axios from "axios";

const SimulationsContainer = () => {
  const [simulationsList, setSimulationsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/matrix/?onlySimulated=true"
        );
        const responseData = response.data.versions;

        setSimulationsList(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-between w-8/12 mx-auto my-12">
      <h1 className="w-full mx-auto font-light text-xl text-left mb-2">
        {`${simulationsList?.length || ""} Simulaciones`}
      </h1>
      <div className="flex flex-col w-full gap-6">
        {simulationsList?.map((simulation) => (
          <SimulationCard
            key={`simulation-${simulation.versionNumber}`}
            {...simulation}
          />
        ))}
      </div>
    </div>
  );
};

export default SimulationsContainer;
