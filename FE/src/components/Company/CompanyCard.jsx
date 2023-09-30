import { Td, Tr, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import EditCompany from "./EditCompany";

export default function CompanyCard({
  data,
  updateCompanyMutation,
  accessToken
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr key={data.id}>
        <Td>
          <Link to={`/company/${data.companyName}`}>{data.companyName}</Link>
        </Td>
        <Td>{data.phoneNumber}</Td>
        <Td>{data.creators?.username}</Td>
        <Td>{data.salesPICs?.username}</Td>
        <Td textAlign={"center"}>
          <Button colorScheme="green" onClick={onOpen}>
            Edit
          </Button>
          <Button colorScheme="red" marginLeft={6}>
            Delete
          </Button>
        </Td>
      </Tr>
      <EditCompany
        isOpen={isOpen}
        onClose={onClose}
        updateCompanyMutation={updateCompanyMutation}
        accessToken={accessToken}
        data={data}
      />
    </>
  );
}
