import {
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  useDisclosure,
  Link as ChakraLink,
} from '@chakra-ui/react';
import Content from '../Content';
import NewContact from './NewContact';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

export default function ContactList({
  accessToken,
  addNewContactMutation,
  data,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const RenderData = () => {
    return data?.data?.data?.map((data) => {
      return (
        <ContactCard key={data.id} data={data} accessToken={accessToken} />
      );
    });
  };
  return (
    <Content>
      <Text
        fontSize={{ base: 'lg', md: '2xl' }}
        fontWeight="semibold"
        marginStart="12"
      >
        Contact Management
      </Text>
      <Box h="90%" w="90%" bg="#F5F6F6" mx="auto" marginTop={10}>
        <Flex
          flexDir={'row-reverse'}
          marginBottom={8}
          marginTop={4}
          marginRight={8}
        >
          <Button colorScheme="telegram" width={'max-content'} onClick={onOpen}>
            Add New Contact
          </Button>
        </Flex>
        <TableContainer
          justifyContent={'center'}
          border={'1px'}
          borderRadius="10px"
          mx={'3%'}
          mb="4%"
        >
          <Table variant="striped" colorScheme="teal" size="sm">
            <TableCaption>List of Contact</TableCaption>
            <Thead>
              <Tr justifyContent={'center'}>
                <Th>Name</Th>
                <Th>Contact</Th>
                <Th>Segment</Th>
                <Th>CreatedAT</Th>
                {/* <Th textAlign={"center"}>Action</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              <RenderData />
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <NewContact
        isOpen={isOpen}
        onClose={onClose}
        addNewContactMutation={addNewContactMutation}
        accessToken={accessToken}
      />
    </Content>
  );
}
