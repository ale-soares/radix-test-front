import { useEffect, useState } from "react";
import getAllSensorData from "./services/getAllSensorData";
import { SensorData } from "./types/SensorData";

const App = () => {
  const [allSensorData, setAllSensorData] = useState<SensorData[]>([]);

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
  }, []);

  console.log(allSensorData);

  return (
    <>
      <h1>app</h1>
    </>
  );
};

export default App;
