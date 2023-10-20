import axiosInstance from "../../services/axios";

export const getAllCompanies = async ({ queryKey }) => {
  let accessToken = queryKey[2];
  const headers = { Authorization: `Bearer ${accessToken}` };
  return await axiosInstance.get("/company/", { headers, params: queryKey[1] });
};

export const createCompany = async ({ accessToken, ...data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.post("/company/", data, config);
};

export const getCompany = async ({ accessToken, data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.get("/company/" + data, config);
};

export const updateCompany = async ({ accessToken, id, ...data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.patch("/company/" + id, data, config);
};

export const deleteCompany = async ({ accessToken, id }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.delete("/company/" + id, config);
};
