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
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import EditBrand from "./EditBrand";
export default function BrandCard({
  data,
  updateBrandMutation,
  deleteBrandMutation,
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
    deleteBrandMutation.mutate({ accessToken, id: data.id });
    onDeleteClose();
  };

  return (
    <>
      <Tr key={data.id}>
        <Td>
          <Link to={`/brand/${data.brandName}`}>
            {" "}
            <Flex
              alignItems={"center"}
              width={"fit-content"}
              _hover={{
                color: "teal.500",
              }}
            >
              <Avatar
                borderRadius={2}
                size={"sm"}
                name={data.brandName}
                src={import.meta.env.VITE_BASE_URL + data.brandImage}
              />
              <Text fontWeight={"medium"} marginLeft={2}>
                {data.brandName}
              </Text>
            </Flex>
          </Link>
        </Td>
        <Td>{data.brandPICs?.username}</Td>
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
      <EditBrand
        isOpen={isOpen}
        onClose={onClose}
        updateBrandMutation={updateBrandMutation}
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
              Delete Brand
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
