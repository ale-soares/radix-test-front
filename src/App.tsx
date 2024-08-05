import { useEffect, useState, useCallback } from "react";

import getAllSensorData from "./services/getAllSensorData";
import getSensorData from "./services/getSensorData";

import { SensorData, equipmentId } from "./types/SensorData";

import Card from "./components/Card";

const App = () => {
  const [allSensorData, setAllSensorData] = useState<SensorData[]>([]);
  const [sensorData, setSensorData] = useState<SensorData>();
  const [uniqueSensorIds, setUniqueSensorIds] = useState<equipmentId[]>([]);
  const [selectedSensorId, setSelectedSensorId] = useState(uniqueSensorIds[0]);

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
      const response: SensorData = await getSensorData(equipmentId);
      setSensorData(response);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  }, []);

  const handleSensorIdChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSensorId(e.target.value);
      if (selectedSensorId) fetchSensorData(e.target.value);
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
      {sensorData &&
        sensorData.map((sensor: SensorData) => (
          <>
            <h1>{sensor.equipmentId}</h1>
            <Card key={sensor._id} title="das" value={sensor.value} />
          </>
        ))}
    </>
  );
};

export default App;
