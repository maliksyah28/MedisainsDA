"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { registerAdmin } from "../api/userApi";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function RegisterAdmin() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [addNewUser, setAddNewUser] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    role: 1,
  });

  const registerAdminMutation = useMutation(registerAdmin, {
    onSuccess: (data) => {
      toast({
        position: "top",
        title: "Account created.",
        description: data.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (data) => {
      toast({
        position: "top",
        title: `Error ${data.response.data.statusCode}`,
        description: data.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const onRegisterAdmin = (e) => {
    e.preventDefault();
    registerAdminMutation.mutate(addNewUser);
    setAddNewUser({
      username: "",
      email: "",
      fullname: "",
      password: "",
      role: 1,
    });
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        width={"100vw"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            width={"25vw"}
          >
            <form onSubmit={onRegisterAdmin}>
              <Stack spacing={4}>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    value={addNewUser.username}
                    type="text"
                    name="username"
                    onChange={(e) =>
                      setAddNewUser({
                        ...addNewUser,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="fullname" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    value={addNewUser.fullname}
                    name="fullname"
                    onChange={(e) =>
                      setAddNewUser({
                        ...addNewUser,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={addNewUser.email}
                    name="email"
                    onChange={(e) =>
                      setAddNewUser({
                        ...addNewUser,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={addNewUser.password}
                      onChange={(e) =>
                        setAddNewUser({
                          ...addNewUser,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    type="submit"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    // onSubmit={onRegisterAdmin}
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user? <Link color={"blue.400"}>Login</Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
