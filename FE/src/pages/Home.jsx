import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Flex } from "@chakra-ui/react";
import Welcome from "../components/Welcome/Welcome";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.auth);
  return (
    <Flex justifyContent="center">
      <Navbar user={user} />
      <Welcome />
    </Flex>
  );
}

export default Home;
