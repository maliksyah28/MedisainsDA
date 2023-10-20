import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Flex, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ListContact from '../components/Contact/ContactList';
import NewContact from '../components/Contact/NewContact';
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  createContact,
  getAllContact,
} from "../api/contactApi";
function Contact() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const userInfo = localStorage.getItem("userInfo");
  const accessToken = JSON.parse(userInfo).accessToken;
  const user = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useQuery("contact", () =>
    getAllContact(accessToken)
  );
  const addNewContactMutation = useMutation(createContact, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("contact");
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
      <ListContact
        accessToken={accessToken}
        data={data}
        addNewContactMutation={addNewContactMutation}
      />
    </Flex>
  );
}

export default Contact;
