import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import CompanyDetailComponent from "../components/Company/CompanyDetailComponent";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCompany } from "../api/companyApi";

function CompantDetail() {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("userInfo");
  const accessToken = JSON.parse(userInfo).accessToken;
  const { companyName } = useParams();
  const { data, isLoading, isError, error } = useQuery("companyDetail", () =>
    getCompany({ accessToken, data: companyName })
  );
  return (
    <Flex justifyContent="center">
      <Navbar user={user} />
      <CompanyDetailComponent data={data} />
    </Flex>
  );
}

export default CompantDetail;
