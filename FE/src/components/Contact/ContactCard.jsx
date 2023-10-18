import { Td, Tr, Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
export default function ContactCard({ data, accessToken }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr key={data.id}>
        <Td>
          <Link to={`/company/${data.id}`}>{data.name}</Link>
        </Td>
        <Td>{data.email}</Td>

        <Td>{data.segment}</Td>
        <Td>{moment(data.createdAt).format('LLL')}</Td>

        {/* <Td textAlign={"center"}> */}
        {/* <Button colorScheme="green" onClick={onOpen}>
            Edit
          </Button>
          <Button colorScheme="red" marginLeft={6}>
            Delete
          </Button> */}
        {/* </Td> */}
      </Tr>
      {/* <EditCompany
        isOpen={isOpen}
        onClose={onClose}
        updateCompanyMutation={updateCompanyMutation}
        accessToken={accessToken}
        data={data}
      /> */}
    </>
  );
}
