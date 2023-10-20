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
} from "@chakra-ui/react";

export default function EditBrand({
  isOpen,
  onClose,
  updateBrandMutation,
  accessToken,
  data,
}) {
  const [brandData, setBrandData] = useState({
    ...data,
  });

  const onUpdateBrand = () => {
    updateBrandMutation.mutate({ ...brandData, id: data.id, accessToken });
    setBrandData({
      brandName: "",
      description: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Brand</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Brand Name</FormLabel>
            <Input
              type="text"
              name="brandName"
              value={brandData.brandName}
              onChange={(e) =>
                setBrandData({
                  ...brandData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              value={brandData.description}
              onChange={(e) =>
                setBrandData({
                  ...brandData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="telegram" onClick={onUpdateBrand}>
            Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
