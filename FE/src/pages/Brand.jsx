import { Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import BrandList from "../components/Brand/BrandList";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  createBrand,
  deleteBrand,
  getAllBrand,
  updateBrand,
} from "../api/brandApi";
import Loading from "../components/Loading/Loading";

function Brand() {
  const toast = useToast();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("userInfo");
  let [searchParams, setSearchParams] = useSearchParams();
  const [brandQuery, setBrandQuery] = useState({
    brandName: "",
    page: searchParams.get("page") || 1,
    pageSize: 8,
    orderBy: "createdAt",
    order: "DESC",
  });

  // if no token navigate to login
  useEffect(() => {
    if (!userInfo) return navigate("/login");
  }, []);
  const accessToken = JSON.parse(userInfo)?.accessToken;

  const { data, isLoading } = useQuery(
    ["brand", brandQuery, accessToken],
    getAllBrand
  );

  const addNewBrandMutation = useMutation(createBrand, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("brand");
      toast({
        position: "top",
        title: "Success",
        description: data.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (data) => {
      toast({
        position: "top",
        title: `Error ${data.response.data.statusCode}`,
        description: data.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const updateBrandMutation = useMutation(updateBrand, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("brand");
      toast({
        position: "top",
        title: "Success",
        description: data.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (data) => {
      toast({
        position: "top",
        title: `Error ${data.response.data.statusCode}`,
        description: data.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const deleteBrandMutation = useMutation(deleteBrand, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("brand");
      toast({
        position: "top",
        title: "Success",
        description: data.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (data) => {
      toast({
        position: "top",
        title: `Error ${data.response.data.statusCode}`,
        description: data.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  // if (isLoading) return <Loading />;

  return (
    <Flex justifyContent="center">
      <Navbar user={user} />
      <BrandList
        accessToken={accessToken}
        data={data}
        addNewBrandMutation={addNewBrandMutation}
        updateBrandMutation={updateBrandMutation}
        deleteBrandMutation={deleteBrandMutation}
        setBrandQuery={setBrandQuery}
        brandQuery={brandQuery}
      />
    </Flex>
  );
}

export default Brand;
