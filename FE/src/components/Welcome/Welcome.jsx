import { Text, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Content from "../Content";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken } from "../../api/userApi";
import { login } from "../../auth/authSlice";

function Welcome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  console.log(userData);
  const userInfo = localStorage.getItem("userInfo");

  useEffect(() => {
    if (!userInfo) return navigate("/login");
  }, []);

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
