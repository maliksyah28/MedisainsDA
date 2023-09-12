import { Flex } from "@chakra-ui/react";
import React from "react";
function Content({ children }) {
  return (
    <Flex width="85%" direction="column">
      {children}
    </Flex>
  );
}

export default Content;
