import { SensorData } from "../types/SensorData";

export const calculateMeanValues = (data: SensorData[]) => {
  const now = new Date().getTime();

  const filterAndCalculateMean = (hours: number) => {
    console.log("calc mean data", data);
    const cutoff = now - hours * 60 * 60 * 1000;
    const filteredData = data.filter(
      (d) => new Date(d.timestamp).getTime() >= cutoff
    );
    const sum = filteredData.reduce((acc, curr) => acc + curr.value, 0);
    return filteredData.length ? sum / filteredData.length : 0;
  };

  return {
    last24Hours: parseFloat(filterAndCalculateMean(24).toFixed(2)),
    last48Hours: parseFloat(filterAndCalculateMean(48).toFixed(2)),
    lastWeek: parseFloat(filterAndCalculateMean(168).toFixed(2)), // 7 days * 24 hours
    lastMonth: parseFloat(filterAndCalculateMean(720).toFixed(2)), // 30 days * 24 hours
  };
};
