import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Select
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function CreateCompany({
  isOpen,
  onClose,
  addNewCompanyMutation,
  accessToken
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(false);
  const [companyData, setCompanyData] = useState({
    companyName: "",
    phoneNumber: "",
    address: "",
    description: ""
  });

  const onAddNewCompany = () => {
    addNewCompanyMutation.mutate({ ...companyData, accessToken });
    setCompanyData({
      companyName: "",
      phoneNumber: "",
      address: "",
      description: ""
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Company</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              name="companyName"
              value={companyData.companyName}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  [e.target.name]: e.target.value
                })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              value={companyData.phoneNumber}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  [e.target.name]: e.target.value
                })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              name="address"
              value={companyData.address}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  [e.target.name]: e.target.value
                })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              value={companyData.description}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  [e.target.name]: e.target.value
                })
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="telegram" onClick={onAddNewCompany}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
