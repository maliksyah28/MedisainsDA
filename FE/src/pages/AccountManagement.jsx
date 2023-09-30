import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Flex, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import AccountManagementContent from "../components/AccountManagementContent/AccountManagementContent";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAllUsers, register } from "../api/userApi";

export default function AccountManagement() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("userInfo");
  const accessToken = JSON.parse(userInfo).accessToken;
  const { data, isLoading, isError, error } = useQuery("users", () =>
    getAllUsers(accessToken)
  );

  const addNewUserMutation = useMutation(register, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      toast({
        position: "top",
        title: "Account created.",
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

  if (isLoading) return <div>Loading..............</div>;
  return (
    <Flex justifyContent="center">
      <Navbar user={user} />
      <AccountManagementContent
        data={data}
        addNewUserMutation={addNewUserMutation}
        accessToken={accessToken}
      />
    </Flex>
  );
}
