import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { SensorData } from "../types/SensorData";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

interface SensorDataProps {
  selectedSensorData: SensorData[];
}

const SensorDataGraph: React.FC<SensorDataProps> = ({ selectedSensorData }) => {
  const formatGraphData = () => {
    const labels: string[] = [];
    const values: number[] = [];

    selectedSensorData.forEach((data) => {
      labels.push(
        new Date(data.timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      );
      values.push(data.value);
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Sensor Values",
          data: values,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div>
      <div style={{ height: "400px", width: "600px" }}>
        <Line data={formatGraphData()} />
      </div>
    </div>
  );
};

export default SensorDataGraph;
