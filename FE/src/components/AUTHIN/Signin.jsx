import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../auth/authSlice";
import { getUserByToken, loginUser } from "../../api/userApi";

export default function AuthIN() {
  // let local = JSON.parse(localStorage.getItem('userInfo'))
  // if (local.Token == false) { return <Navigate to="/" replace />

  const [uData, setuData] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getLocalStorage = localStorage.getItem("userInfo");
    getLocalStorage && navigate("/");
  }, []);

  //   const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const uDataHandleChange = (event) => {
    setuData(event.target.value);
  };
  const passHandleChange = (event) => {
    setPassword(event.target.value);
  };

  const loginClick = async () => {
    try {
      const body = {
        userData: uData,
        password: password,
      };
      const res = await loginUser(body);
      const data = res.data.data;
      const resUser = await getUserByToken(data.accessToken);

      dispatch(
        login({ ...resUser.data.data, ["accessToken"]: data.accessToken })
      );
      const userInfo = {
        accessToken: data.accessToken,
      };
      const strUser = JSON.stringify(userInfo);
      localStorage.setItem("userInfo", strUser);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //   const userRole = useSelector((state) => state.auth.Token);
  //   console.log(userRole);

  // console.log(local.RoleId);
  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: '100vh',
    //   }}
    // >
    <Box
      minH="100vh"
      minW="200vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Stack spacing={4}>
          <Heading>Login</Heading>
          <FormControl id="uData">
            <FormLabel>Data User</FormLabel>
            <Input
              type="text"
              placeholder="Email or username"
              value={uData}
              onChange={uDataHandleChange}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={passHandleChange}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={loginClick}>
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
    // </div>
  );
}
