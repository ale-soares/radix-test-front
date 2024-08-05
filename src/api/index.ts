import axios from "axios";

const api = axios.create({
  baseURL: "https://radix-test-one.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default api;
