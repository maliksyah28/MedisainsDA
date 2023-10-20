import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import CompanyDetailComponent from "../components/Company/CompanyDetailComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCompany, updateCompany } from "../api/companyApi";
import { getAllUsers } from "../api/userApi";
import Loading from "../components/Loading/Loading";

function CompanyDetail() {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("userInfo");
  const navigate = useNavigate();

  // if no accessToken navigate to login
  useEffect(() => {
    if (!userInfo) return navigate("/login");
  }, []);

  const accessToken = JSON.parse(userInfo)?.accessToken;
  const { companyName } = useParams();
  const { data, isLoading, isError, error } = useQuery("companyDetail", () =>
    getCompany({ accessToken, data: companyName })
  );
  const { data: userData } = useQuery("users", () => getAllUsers(accessToken));

  const updateSalesPicMutation = useMutation(updateCompany, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("companyDetail");
    },
  });
  // if (isLoading) return <Loading />;
  return (
    <Flex justifyContent="center">
      <Navbar user={user} />
      <CompanyDetailComponent
        data={data}
        userData={userData}
        updateSalesPicMutation={updateSalesPicMutation}
        accessToken={accessToken}
        user={user}
      />
    </Flex>
  );
}

export default CompanyDetail;
