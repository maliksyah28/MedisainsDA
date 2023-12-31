import {
  Td,
  Tr,
  Button,
  useDisclosure,
  Avatar,
  Text,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import EditCompany from "./EditCompany";

export default function CompanyCard({
  data,
  updateCompanyMutation,
  deleteCompanyMutation,
  accessToken,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const cancelRef = useRef();

  const onDeleteHandler = () => {
    deleteCompanyMutation.mutate({ accessToken, id: data.id });
    onDeleteClose();
  };

  return (
    <>
      <Tr key={data.id}>
        <Td>
          <Link to={`/company/${data.companyName}`}>
            {" "}
            <Flex
              alignItems={"center"}
              width={"fit-content"}
              _hover={{
                color: "teal.500",
              }}
            >
              <Avatar borderRadius={2} size={"sm"} name={data.companyName} />
              <Text fontWeight={"medium"} marginLeft={2}>
                {data.companyName}
              </Text>
            </Flex>
          </Link>
        </Td>
        <Td>{data.phoneNumber}</Td>
        <Td>{data.creators?.username}</Td>
        <Td>{data.salesPICs?.fullname}</Td>
        <Td textAlign={"center"}>
          <Button colorScheme="green" onClick={onOpen} size={"sm"}>
            Edit
          </Button>
          <Button
            colorScheme="red"
            marginLeft={2}
            size={"sm"}
            onClick={onDeleteOpen}
          >
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
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Company
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteHandler} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
