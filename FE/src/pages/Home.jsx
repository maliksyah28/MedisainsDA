import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Flex } from "@chakra-ui/react";
import Welcome from "../components/Welcome/Welcome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");
  // if no accessToken navigate to login
  useEffect(() => {
    if (!userInfo) return navigate("/login");
  }, []);
  return (
    <Flex justifyContent="center">
      <Navbar user={user} />
      <Welcome />
    </Flex>
  );
}

export default Home;
