import axiosInstance from "../../services/axios";

export const loginUser = async (data) => {
  return await axiosInstance.post("/auth/login", data);
};

export const registerAdmin = async (data) => {
  return await axiosInstance.post("/auth/admin-register", data);
};

export const register = async ({ accessToken, ...data }) => {
  console.log(accessToken);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.post("/auth/register", data, config);
};

export const changePass = async (data) => {
  return await axiosInstance.patch("/user/changePass", data);
};

export const getUserByToken = async (data) => {
  // const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: `Bearer ${data}` },
  };
  return await axiosInstance.get("/user/user-token", config);
};

export const getAllUsers = async (data) => {
  const config = {
    headers: { Authorization: `Bearer ${data}` },
  };
  return await axiosInstance.get("/user/users", config);
};
