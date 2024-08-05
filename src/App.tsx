import { useEffect, useState, useCallback } from "react";
import getAllSensorData from "./services/getAllSensorData";
import { SensorData, equipmentId } from "./types/SensorData";

const App = () => {
  const [allSensorData, setAllSensorData] = useState<SensorData[]>([]);
  const [uniqueSensorIds, setUniqueSensorIds] = useState<equipmentId[]>([]);
  const [selectedSensor, setSelectedSensor] = useState(uniqueSensorIds[0]);

  const getUniqueSensors = useCallback(() => {
    const unique: equipmentId[] = [];

    for (const sensor of allSensorData) {
      if (!unique.includes(sensor.equipmentId)) {
        unique.push(sensor.equipmentId);
      }
    }

    setUniqueSensorIds(unique);
  }, [allSensorData, setUniqueSensorIds]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: SensorData[] = await getAllSensorData();
        setAllSensorData(response);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
    getUniqueSensors();
  }, [getUniqueSensors]);

  const handleSensorIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSensor(e.target.value);
  };

  return (
    <>
      <select
        className="text-theme-dark-gray"
        onChange={(e) => handleSensorIdChange(e)}
        name="sensor-id-select"
      >
        {uniqueSensorIds.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      {selectedSensor}
    </>
  );
};

export default App;
