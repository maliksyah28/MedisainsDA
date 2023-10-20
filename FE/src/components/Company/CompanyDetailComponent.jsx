import React, { useRef, useState } from "react";
import Content from "../Content";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Select,
  Text,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function CompanyDetailComponent({
  data,
  userData,
  updateSalesPicMutation,
  accessToken,
  user,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState("placeholder");
  const cancelRef = useRef();
  const companyId = data?.data?.data?.id;
  const onAddSalesHandler = () => {
    updateSalesPicMutation.mutate({
      salesPIC: selectedOption,
      id: companyId,
      accessToken,
    });
    setSelectedOption("placeholder");
    onClose();
  };

  const onCancelHandler = () => {
    setSelectedOption("placeholder");
    onClose();
  };

  const onSelectHandler = (e) => {
    onOpen();
    setSelectedOption(e.target.value);
  };

  const GetUsers = () => {
    return userData?.data?.data?.map((e) => (
      <option value={e.id} key={e.id} style={{ color: "black" }}>
        {e.fullname}
      </option>
    ));
  };
  const GetDate = () => {
    console.log(data);
    const date = new Date(data?.data?.data?.createdAt);
    return date.toLocaleString("ID-id", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isDisabledSelect =
    user.role !== 1 && user.id !== data?.data?.data?.creator;

  return (
    <Content>
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="semibold"
        marginStart="12"
      >
        {data?.data?.data?.companyName}
      </Text>
      <Box minH="90%" w="90%" bg="#F5F6F6" mx="auto" marginTop={10}>
        <Flex p={10}>
          <Box
            minH={"20"}
            maxH={"50vh"}
            backgroundColor={"white"}
            width={"25vw"}
            rounded={5}
          >
            <VStack paddingInline={3}>
              <Flex width={"full"} paddingTop={2} marginBottom={2}>
                <Avatar
                  borderRadius={2}
                  size={"xl"}
                  name={data?.data?.data?.companyName}
                />
                <Box marginLeft={2}>
                  <Text fontSize={"md"} as={"b"}>
                    {data?.data?.data?.companyName}
                  </Text>
                  <Text fontSize={"xs"}>
                    {data?.data?.data?.description || ""}
                  </Text>
                </Box>
              </Flex>
              <Select
                width={"60%"}
                size={"sm"}
                bgColor={"telegram.500"}
                borderColor={"telegram.500"}
                color={"white"}
                rounded={5}
                value={selectedOption}
                onChange={onSelectHandler}
                isDisabled={isDisabledSelect}
              >
                <option disabled value={"placeholder"}>
                  ASSIGNMENT TO
                </option>
                <GetUsers />
              </Select>

              <Box w={"full"} paddingTop={5}>
                <Flex justifyContent={"space-between"}>
                  <Text>Creator:</Text>
                  <Text fontWeight={"light"} align={"right"}>
                    {data?.data?.data?.creators?.fullname}
                  </Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text>Sales PIC:</Text>
                  <Text
                    maxWidth={"50%"}
                    fontWeight={"light"}
                    align={"right"}
                    noOfLines={1}
                  >
                    {data?.data?.data?.salesPICs?.fullname || "null"}
                  </Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text>Created:</Text>
                  <Text fontWeight={"light"} align={"right"}>
                    <GetDate />
                  </Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text>Phone:</Text>
                  <Text fontWeight={"light"} align={"right"}>
                    {data?.data?.data?.phoneNumber}
                  </Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text>Address:</Text>
                  <Text fontWeight={"light"} align={"right"} maxWidth={"50%"}>
                    {data?.data?.data?.address}
                  </Text>
                </Flex>
              </Box>
            </VStack>
          </Box>
          <Flex direction="column" paddingLeft={10}>
            <Box h={"30vh"} w={"50vw"} bg={"blue.200"} rounded={5}>
              50vw
            </Box>
            <Box
              h={"100vh"}
              w={"50vw"}
              bg={"yellow.300"}
              marginTop={10}
              rounded={5}
            >
              c
            </Box>
          </Flex>
        </Flex>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Assign Sales PIC
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCancelHandler}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onAddSalesHandler} ml={3}>
                Add
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Content>
  );
}
