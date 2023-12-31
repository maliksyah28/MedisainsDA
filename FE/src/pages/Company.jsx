import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Flex, useToast } from "@chakra-ui/react";
import CompanyList from "../components/Company/CompanyList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  updateCompany,
} from "../api/companyApi";
import Loading from "../components/Loading/Loading";

function Company() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [companyQuery, setCompanyQuery] = useState({
    companyName: "",
    page: searchParams.get("page") || 1,
    pageSize: 8,
    orderBy: "createdAt",
    order: "DESC",
  });
  const userInfo = localStorage.getItem("userInfo");

  // if no token navigate to login
  useEffect(() => {
    if (!userInfo) return navigate("/login");
  }, []);
  const accessToken = JSON.parse(userInfo)?.accessToken;
  const user = useSelector((state) => state.auth);

  const { data, isLoading, isError, error } = useQuery(
    ["company", companyQuery, accessToken],
    getAllCompanies
  );
  const addNewCompanyMutation = useMutation(createCompany, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("company");
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

  const updateCompanyMutation = useMutation(updateCompany, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("company");
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

  const deleteCompanyMutation = useMutation(deleteCompany, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("company");
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
      <CompanyList
        accessToken={accessToken}
        data={data}
        addNewCompanyMutation={addNewCompanyMutation}
        updateCompanyMutation={updateCompanyMutation}
        deleteCompanyMutation={deleteCompanyMutation}
        setCompanyQuery={setCompanyQuery}
        companyQuery={companyQuery}
      />
    </Flex>
  );
}

export default Company;
