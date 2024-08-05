import axiosInstance from "./../api/index";

async function getAllSensorData() {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default getAllSensorData;
