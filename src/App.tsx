import React, { useEffect, useState, useCallback } from "react";

import getAllSensorData from "./services/getAllSensorData";
import getSensorData from "./services/getSensorData";

import { SensorData, equipmentId } from "./types/SensorData";

import SensorMeasurements from "./sections/SensorMeasurements";
import SensorDataGraph from "./sections/SensorDataGraph";

const App = () => {
  const [allSensorData, setAllSensorData] = useState<SensorData[]>([]);
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [uniqueSensorIds, setUniqueSensorIds] = useState<equipmentId[]>([]);
  const [selectedSensorId, setSelectedSensorId] = useState("");

  const fetchAllSensorData = useCallback(async () => {
    try {
      const response: SensorData[] = await getAllSensorData();
      setAllSensorData(response);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  }, []);

  const getUniqueSensors = useCallback(() => {
    const unique: equipmentId[] = Array.from(
      new Set(allSensorData.map((sensor) => sensor.equipmentId))
    );
    setUniqueSensorIds(unique);
  }, [allSensorData]);

  const fetchSensorData = useCallback(async (equipmentId: equipmentId) => {
    try {
      const response: SensorData[] = await getSensorData(equipmentId);
      setSensorData(response);
    } catch (error) {
      console.error(`Error fetching sensor data for ${equipmentId}:`, error);
      setSensorData([]);
    }
  }, []);

  const handleSensorIdChange = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;

      setSelectedSensorId(selectedValue);
      if (selectedValue) {
        await fetchSensorData(selectedValue);
      }
    },
    [fetchSensorData]
  );

  useEffect(() => {
    fetchAllSensorData();
  }, [fetchAllSensorData]);

  useEffect(() => {
    getUniqueSensors();
  }, [allSensorData, getUniqueSensors]);

  return (
    <div className="text-body lg:px-96 pb-40 mt-10 text-center">
      <h1 className="text-header mb-10">Sensor Data Management</h1>
      <select
        className="text-theme-dark-gray rounded bg-opacity-25 p-1"
        onChange={(e) => handleSensorIdChange(e)}
        value={selectedSensorId} // Use value instead of defaultValue for controlled component
        name="sensor-id-select"
      >
        <option>Select Sensor ID</option>
        {uniqueSensorIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      {sensorData.length > 0 && (
        <>
          <SensorMeasurements selectedSensorData={sensorData} />
          <SensorDataGraph selectedSensorData={sensorData} />
        </>
      )}
    </div>
  );
};

export default App;
