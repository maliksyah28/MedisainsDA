import axiosInstance from "../../services/axios";
const accessToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;

export const getAllCompanies = async ({ queryKey }) => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  return await axiosInstance.get("/company/", { headers, params: queryKey[1] });
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

export const updateCompany = async ({ accessToken, id, ...data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };
  return await axiosInstance.patch("/company/" + id, data, config);
};
