import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllUsers } from "../api/userApi";
import BrandDetailComponent from "../components/Brand/BrandDetailComponent";
import { getBrand, updateBrand } from "../api/brandApi";

export default function BrandDetail() {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  // if no accessToken navigate to login
  useEffect(() => {
    if (!userInfo) return navigate("/login");
  }, []);

  const accessToken = JSON.parse(userInfo)?.accessToken;
  const { brandName } = useParams();
  const { data, isLoading } = useQuery("brandDetail", () =>
    getBrand({ accessToken, data: brandName })
  );

  const { data: userData } = useQuery("users", () => getAllUsers(accessToken));
  const updateBrandPicMutation = useMutation(updateBrand, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("brandDetail");
    },
  });
  return (
    <Flex justifyContent="center">
      <Navbar user={user} />
      <BrandDetailComponent
        data={data}
        userData={userData}
        updateBrandPicMutation={updateBrandPicMutation}
        accessToken={accessToken}
        user={user}
      />
    </Flex>
  );
}
