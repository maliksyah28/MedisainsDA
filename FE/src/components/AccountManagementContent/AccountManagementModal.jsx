import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function AccountManagementModal({
  isOpen,
  onClose,
  addNewUserMutation,
  accessToken,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(false);
  const [userRegister, setUserRegister] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    role: null,
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const onAddNewUser = () => {
    addNewUserMutation.mutate({ ...userRegister, accessToken });
    setUserRegister({
      username: "",
      fullname: "",
      email: "",
      password: "",
      role: null,
    });
    setConfirmPassword("");
    onClose();
  };
  useEffect(() => {
    if (confirmPassword !== userRegister.password) {
      setFormError(true);
    } else {
      setFormError(false);
    }
  }, [confirmPassword]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={userRegister.username}
              onChange={(e) =>
                setUserRegister({
                  ...userRegister,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Fullname</FormLabel>
            <Input
              type="text"
              name="fullname"
              value={userRegister.fullname}
              onChange={(e) =>
                setUserRegister({
                  ...userRegister,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              name="email"
              value={userRegister.email}
              onChange={(e) =>
                setUserRegister({
                  ...userRegister,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Roles</FormLabel>
            <Select
              placeholder="Select roles"
              name="role"
              onChange={(e) =>
                setUserRegister({
                  ...userRegister,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value="1">Admin</option>
              <option value="2">Employee</option>
              <option value="3">Purchasing</option>
            </Select>
          </FormControl>
          <FormControl id="password" isRequired isInvalid={formError}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userRegister.password}
                onChange={(e) =>
                  setUserRegister({
                    ...userRegister,
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
            <FormErrorMessage>Password Berbeda !!</FormErrorMessage>
          </FormControl>
          <FormControl id="confirmPassword" isRequired isInvalid={formError}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            <FormErrorMessage>Password Berbeda !!</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="telegram" onClick={onAddNewUser}>
            Add User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
