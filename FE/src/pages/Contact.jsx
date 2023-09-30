import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ListContact from '../components/Contact/ContactList';
import NewContact from '../components/Contact/NewContact';

function Contact() {
  const user = useSelector((state) => state.auth);
  return (
    <Flex>
      <Navbar user={user} />
      <NewContact />
    </Flex>
  );
}

export default Contact;
