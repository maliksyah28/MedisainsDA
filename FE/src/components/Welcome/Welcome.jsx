import { Text, Flex } from "@chakra-ui/react";
import React from "react";
import Content from "../Content";

function Welcome() {
  return (
    <Content>
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="semibold"
        marginStart="20"
      >
        Kategori
      </Text>
    </Content>
  );
}

export default Welcome;
