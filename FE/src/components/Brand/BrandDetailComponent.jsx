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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function BrandDetailComponent({
  data,
  userData,
  updateBrandPicMutation,
  accessToken,
  user,
}) {
  return (
    <Content>
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="semibold"
        marginStart="12"
      >
        {data?.data?.data?.brandName}
      </Text>
      <Box minH="90%" w="90%" bg="#F5F6F6" mx="auto" marginTop={10}>
        <Tabs isLazy>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Vendor Overview</Tab>
            <Tab>Edit</Tab>
            <Tab>Product</Tab>
            <Tab>History Report</Tab>
            <Tab isDisabled={user.role !== 1}>Restore</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>OverView</p>
            </TabPanel>
            <TabPanel>
              <p>Vendor Overview</p>
            </TabPanel>
            <TabPanel>
              <p>Edit</p>
            </TabPanel>
            <TabPanel>
              <p>Product</p>
            </TabPanel>
            <TabPanel>
              <p>History Report</p>
            </TabPanel>
            <TabPanel>
              <p>Restore</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* <AlertDialog
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
      </AlertDialog> */}
    </Content>
  );
}
