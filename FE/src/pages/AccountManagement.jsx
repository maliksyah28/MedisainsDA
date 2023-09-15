import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import AccountManagementContent from "../components/AccountManagementContent/AccountManagementContent";
import { useQuery } from "react-query";
import { getAllUsers } from "../api/userApi";

export default function AccountManagement() {
  const user = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("userInfo");
  const { data, isLoading, isError, error } = useQuery("users", () =>
    getAllUsers(JSON.parse(userInfo).accessToken)
  );
  if (isLoading) return <div>Loading..............</div>;
  return (
    <Flex justifyContent="center">
      <Navbar user={user} />
      <AccountManagementContent data={data} />
    </Flex>
  );
}
