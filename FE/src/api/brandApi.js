import axiosInstance from "../../services/axios";

export const getAllBrand = async ({ queryKey }) => {
  let accessToken = queryKey[2];
  const headers = { Authorization: `Bearer ${accessToken}` };
  return await axiosInstance.get("/brand/", { headers, params: queryKey[1] });
};

export const createBrand = async ({ accessToken, ...data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.post("/brand/", data, config);
};

export const getBrand = async ({ accessToken, data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.get("/brand/" + data, config);
};

export const updateBrand = async ({ accessToken, id, ...data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.patch("/brand/" + id, data, config);
};

export const deleteBrand = async ({ accessToken, id }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.delete("/brand/" + id, config);
};

export const uploadBrandImage = async ({ accessToken, ...data }) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  return await axiosInstance.post("/brand/upload", data, config);
};
