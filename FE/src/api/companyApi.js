import axiosInstance from "../../services/axios";

export const getAllCompanies = async (data) => {
  const config = {
    headers: { Authorization: `Bearer ${data}` }
  };
  return await axiosInstance.get("/company/", config);
};

export const createCompany = async ({ accessToken, ...data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
  return await axiosInstance.post("/company/", data, config);
};

export const getCompany = async ({ accessToken, data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
  return await axiosInstance.get("/company/" + data, config);
};
