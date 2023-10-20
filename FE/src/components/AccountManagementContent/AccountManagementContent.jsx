import {
  Text,
  Box,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  TableCaption,
  Td,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Content from "../Content";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import AccountManagementModal from "./AccountManagementModal";
import { getAllUsers } from "../../api/userApi";

const roles = {
  1: "superadmin",
  2: "employee",
  3: "purchasing",
};

function AccountManagementContent({ data, addNewUserMutation, accessToken }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userInfo = localStorage.getItem("userInfo");
  useEffect(() => {
    if (!userInfo) return navigate("/login");
  }, []);

  const RenderData = () => {
    return data?.data?.data.map((data) => {
      return (
        <Tr key={data.id}>
          <Td>{data.username}</Td>
          <Td>{data.fullname}</Td>
          <Td>{data.email}</Td>
          <Td>{roles[data.role]}</Td>
          <Td textAlign={"center"}>
            <Button colorScheme="green" size={"sm"}>
              Edit
            </Button>
            <Button colorScheme="red" marginLeft={6} size={"sm"}>
              Delete
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <>
      <Content>
        <Text
          fontSize={{ base: "lg", md: "2xl" }}
          fontWeight="semibold"
          marginStart="12"
        >
          Account Management
        </Text>
        <Box h="90%" w="90%" bg="#F5F6F6" mx="auto" marginTop={10}>
          <Flex
            flexDir={"row-reverse"}
            marginBottom={8}
            marginTop={4}
            marginRight={8}
          >
            <Button
              colorScheme="telegram"
              width={"max-content"}
              onClick={onOpen}
            >
              Add New User
            </Button>
          </Flex>
          <TableContainer
            justifyContent={"center"}
            border={"1px"}
            borderRadius="10px"
            mx={"3%"}
            mb="4%"
          >
            <Table variant="striped" colorScheme="teal" size="sm">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr justifyContent={"center"}>
                  <Th>Username</Th>
                  <Th>Fullname</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th textAlign={"center"}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <RenderData />
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Content>
      <AccountManagementModal
        isOpen={isOpen}
        onClose={onClose}
        addNewUserMutation={addNewUserMutation}
        accessToken={accessToken}
      />
    </>
  );
}

export default AccountManagementContent;
