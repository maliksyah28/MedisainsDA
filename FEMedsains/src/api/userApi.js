import axiosInstance from "../../services/axios";

export const login = async (data) => {
  return await axiosInstance.post("/auth/login", data);
};

export const registerAdmin = async (data) => {
  return await axiosInstance.post("/auth/admin-register", data);
};

export const register = async (data) => {
  return await axiosInstance.post("/auth/register", data);
};

export const changePass = async (data) => {
  return await axiosInstance.patch("/auth/changePass", data);
};
