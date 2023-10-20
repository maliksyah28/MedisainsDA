import { Text, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Content from "../Content";

function Welcome() {
  return (
    <Content>
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="semibold"
        marginStart="12"
      >
        Dashboard
      </Text>
      {/* <Box h="90%" w="90%" bg="#F5F6F6" mx="auto" marginTop={10}>
        kambing
      </Box> */}
    </Content>
  );
}

export default Welcome;
