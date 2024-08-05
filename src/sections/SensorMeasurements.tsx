import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { SensorData } from "../types/SensorData";

import Card from "./../components/Card";

import { calculateMeanValues } from "./../utils/calculateMeanValues";

interface SensorMeasurementsProps {
  selectedSensorData: SensorData[];
}

const SensorMeasurements: React.FC<SensorMeasurementsProps> = ({
  selectedSensorData,
}) => {
  const [meanValues, setMeanValues] = useState({
    last24Hours: 0,
    last48Hours: 0,
    lastWeek: 0,
    lastMonth: 0,
  });

  useEffect(() => {
    setMeanValues(calculateMeanValues(selectedSensorData));
  }, [selectedSensorData]);

  return (
    <>
      <Card
        key={uuidv4()}
        title="Last 24 Hours"
        value={meanValues.last24Hours}
      />
      <Card
        key={uuidv4()}
        title="Last 48 Hours"
        value={meanValues.last48Hours}
      />
      <Card key={uuidv4()} title="Last Week" value={meanValues.lastWeek} />
      <Card key={uuidv4()} title="Last Month" value={meanValues.lastMonth} />
    </>
  );
};

export default SensorMeasurements;
