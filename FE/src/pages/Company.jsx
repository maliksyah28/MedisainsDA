import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Flex, useToast } from "@chakra-ui/react";
import CompanyList from "../components/Company/CompanyList";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  createCompany,
  getAllCompanies,
  updateCompany
} from "../api/companyApi";

function Company() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const userInfo = localStorage.getItem("userInfo");
  const accessToken = JSON.parse(userInfo).accessToken;
  const user = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useQuery("company", () =>
    getAllCompanies(accessToken)
  );
  const addNewCompanyMutation = useMutation(createCompany, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("company");
      toast({
        position: "top",
        title: "Company Created",
        description: data.data.message,
        status: "success",
        duration: 2000,
        isClosable: true
      });
    },
    onError: (data) => {
      toast({
        position: "top",
        title: `Error ${data.response.data.statusCode}`,
        description: data.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true
      });
    }
  });

  const updateCompanyMutation = useMutation(updateCompany, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("company");
      toast({
        position: "top",
        title: "Company Created",
        description: data.data.message,
        status: "success",
        duration: 2000,
        isClosable: true
      });
    },
    onError: (data) => {
      toast({
        position: "top",
        title: `Error ${data.response.data.statusCode}`,
        description: data.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true
      });
    }
  });
  return (
    <Flex justifyContent="center">
      <Navbar user={user} />
      <CompanyList
        accessToken={accessToken}
        data={data}
        addNewCompanyMutation={addNewCompanyMutation}
        updateCompanyMutation={updateCompanyMutation}
      />
    </Flex>
  );
}

export default Company;
