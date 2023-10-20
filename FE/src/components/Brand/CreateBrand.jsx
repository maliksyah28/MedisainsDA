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
  Select,
  Text,
  VStack,
  HStack,
  Box,
  Image,
} from "@chakra-ui/react";
import axiosInstance from "../../../services/axios";

export default function CreateBrand({
  isOpen,
  onClose,
  addNewBrandMutation,
  accessToken,
}) {
  const [imageSource, setImageSource] = useState();
  const [brandImage, setBrandImage] = useState();
  const [brandData, setBrandData] = useState({
    brandName: "",
    description: "",
  });

  const onAddNewBrand = async () => {
    const body = {
      ...brandData,
    };

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    if (brandImage) {
      const gambar = brandImage;
      const data = new FormData();
      const fileName = Date.now() + gambar.name;
      data.append("name", fileName);
      data.append("image", gambar);
      body.brandImage = `/public/brand/${fileName}`;
      try {
        await axiosInstance.post("/brand/upload", data, config);
      } catch (error) {
        return alert(error.response.data.message);
      }
    }
    addNewBrandMutation.mutate({
      accessToken,
      ...body,
    });
    setBrandData({
      brandName: "",
      description: "",
    });
    setImageSource();
    setBrandImage();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Brand</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* <Text
            htmlFor="image"
            fontWeight="500"
            fontSize="12px"
            lineHeight="16px"
            mb="4px"
          >
            Foto
          </Text> */}
          <FormLabel>Gambar Brand</FormLabel>
          <VStack align="start">
            {!imageSource ? (
              <FormControl width="120px" height="120px">
                <Box
                  align="center"
                  width="120px"
                  height="120px"
                  border="1px solid #008DEB"
                  borderRadius="4px"
                  fontWeight="500"
                  fontSize="25"
                >
                  <FormLabel
                    pl="50px"
                    pt="40px"
                    width="120px"
                    height="120px"
                    htmlFor="image"
                    fontWeight="500"
                    fontSize="25px"
                    cursor={"pointer"}
                  >
                    +
                  </FormLabel>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="image"
                    name="brandImage"
                    accept=".png, .svg"
                    onChange={(e) => {
                      setBrandImage(e.target.files[0]);
                      setImageSource(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </Box>
              </FormControl>
            ) : (
              <>
                <FormControl width="120px" height="120px">
                  <Box width="120px" height="120px">
                    <Image
                      border="1px solid #008DEB"
                      borderRadius="4px"
                      width="120px"
                      height="120px"
                      objectFit={"contain"}
                      src={imageSource}
                      alt="gambar produk"
                    />
                  </Box>
                </FormControl>
                <HStack
                  height="20px"
                  width="140px"
                  align="start"
                  marginBottom={8}
                >
                  <FormControl>
                    <FormLabel
                      pt="1"
                      bg="blue.100"
                      width="60px"
                      height="30px"
                      borderRadius="5px"
                      htmlFor="image"
                      cursor={"pointer"}
                      color="twitter.500"
                      textAlign={"center"}
                    >
                      Ubah
                    </FormLabel>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="image"
                      name="brandImage"
                      accept=".png, .jpg, .jpeg, .webp"
                      onChange={(e) => {
                        setBrandImage(e.target.files[0]);
                        setImageSource(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </FormControl>
                  <Button
                    onClick={() => {
                      setImageSource();
                      setBrandImage();
                    }}
                    borderRadius="5px"
                    height="32px"
                    textColor={"red"}
                  >
                    cancel
                  </Button>
                </HStack>
              </>
            )}
          </VStack>
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
          <Button colorScheme="telegram" onClick={onAddNewBrand}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
