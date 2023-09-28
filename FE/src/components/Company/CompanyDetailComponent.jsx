import React from "react";
import Content from "../Content";
import { Box, Text } from "@chakra-ui/react";

export default function CompanyDetailComponent({ data }) {
  console.log(data?.data?.data);
  return (
    <Content>
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="semibold"
        marginStart="12"
      >
        {data?.data?.data?.companyName}
      </Text>
      <Box h="90%" w="90%" bg="#F5F6F6" mx="auto" marginTop={10}>
        {data?.data?.data?.companyName}
      </Box>
    </Content>
  );
}
