import { Text, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Content from "../Content";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken } from "../../api/userApi";
import { login } from "../../auth/authSlice";
import { SearchIcon } from "@chakra-ui/icons";

function Welcome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (!userInfo) return navigate("/login");
  }, []);

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
