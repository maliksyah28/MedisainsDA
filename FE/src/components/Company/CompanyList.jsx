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
  Link as ChakraLink
} from "@chakra-ui/react";
import Content from "../Content";
import CreateCompany from "./CreateCompany";
import { Link } from "react-router-dom";

export default function CompanyList({
  accessToken,
  addNewCompanyMutation,
  data
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(data);
  const RenderData = () => {
    return data?.data?.data.map((data) => {
      return (
        <Tr key={data.id}>
          <Td>
            <Link to={`/company/${data.companyName}`}>
              <ChakraLink>{data.companyName}</ChakraLink>
            </Link>
          </Td>
          <Td>{data.phoneNumber}</Td>
          <Td>{data.creators?.username}</Td>
          <Td>{data.salesPICs?.username}</Td>
          <Td textAlign={"center"}>
            <Button colorScheme="green">Edit</Button>
            <Button colorScheme="red" marginLeft={6}>
              Delete
            </Button>
          </Td>
        </Tr>
      );
    });
  };
  return (
    <Content>
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="semibold"
        marginStart="12"
      >
        Company Management
      </Text>
      <Box h="90%" w="90%" bg="#F5F6F6" mx="auto" marginTop={10}>
        <Flex
          flexDir={"row-reverse"}
          marginBottom={8}
          marginTop={4}
          marginRight={8}
        >
          <Button colorScheme="telegram" width={"max-content"} onClick={onOpen}>
            Add New Company
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
            <TableCaption>List of Company</TableCaption>
            <Thead>
              <Tr justifyContent={"center"}>
                <Th>Company Name</Th>
                <Th>Phone Number</Th>
                <Th>Creator</Th>
                <Th>Sales PIC</Th>
                <Th textAlign={"center"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <RenderData />
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <CreateCompany
        isOpen={isOpen}
        onClose={onClose}
        addNewCompanyMutation={addNewCompanyMutation}
        accessToken={accessToken}
      />
    </Content>
  );
}
