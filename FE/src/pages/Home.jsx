import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Flex } from "@chakra-ui/react";
import Welcome from "../components/Welcome/Welcome";

function Home() {
  return (
    <Flex justifyContent="center">
      <Navbar />
      <Welcome />
    </Flex>
  );
}

export default Home;
