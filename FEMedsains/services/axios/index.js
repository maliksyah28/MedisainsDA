import axios from "axios";
// import { BASE_URL } from "constants";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default axiosInstance;
