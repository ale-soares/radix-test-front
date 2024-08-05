import { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import getAllSensorData from "./services/getAllSensorData";
import getSensorData from "./services/getSensorData";

import { SensorData, equipmentId } from "./types/SensorData";

import Card from "./components/Card";
import SensorDataGraph from "./sections/SensorDataGraph";

import { calculateMeanValues } from "./utils/calculateMeanValues";

const App = () => {
  const [allSensorData, setAllSensorData] = useState<SensorData[]>([]);
  const [sensorData, setSensorData] = useState<SensorData[]>();
  const [uniqueSensorIds, setUniqueSensorIds] = useState<equipmentId[]>([]);
  const [selectedSensorId, setSelectedSensorId] = useState("");
  const [meanValues, setMeanValues] = useState({
    last24Hours: 0,
    last48Hours: 0,
    lastWeek: 0,
    lastMonth: 0,
  });

  const fetchAllSensorData = useCallback(async () => {
    try {
      const response: SensorData[] = await getAllSensorData();
      setAllSensorData(response);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  }, []);

  const getUniqueSensors = useCallback(() => {
    const unique: equipmentId[] = [];

    for (const sensor of allSensorData) {
      if (!unique.includes(sensor.equipmentId)) {
        unique.push(sensor.equipmentId);
      }
    }

    setUniqueSensorIds(unique);
  }, [allSensorData, setUniqueSensorIds]);

  const fetchSensorData = useCallback(async (equipmentId: equipmentId) => {
    try {
      const response: SensorData[] = await getSensorData(equipmentId);
      setSensorData(response);
      setMeanValues(calculateMeanValues(response));
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  }, []);

  const handleSensorIdChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;

      setSelectedSensorId(selectedValue);
      if (selectedSensorId) fetchSensorData(selectedValue);
    },
    [fetchSensorData, selectedSensorId]
  );

  useEffect(() => {
    fetchAllSensorData();
  }, [fetchAllSensorData]);

  useEffect(() => {
    getUniqueSensors();
  }, [allSensorData, getUniqueSensors]);

  console.log("sensor data", sensorData);
  return (
    <>
      <select
        className="text-theme-dark-gray rounded bg-opacity-25 p-1"
        onChange={(e) => handleSensorIdChange(e)}
        name="sensor-id-select"
        defaultValue="select"
      >
        <option value="select">Select Sensor ID</option>
        {uniqueSensorIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
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
      {sensorData ? <SensorDataGraph selectedSensorData={sensorData} /> : <></>}
    </>
  );
};

export default App;
