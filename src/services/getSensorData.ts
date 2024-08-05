import axiosInstance from "./../api/index";
import { equipmentId } from "../types/SensorData";

async function getSensorData(equipmentId: equipmentId) {
  try {
    const response = await axiosInstance.get(`/${equipmentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default getSensorData;
