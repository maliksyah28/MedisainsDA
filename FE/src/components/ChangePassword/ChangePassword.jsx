import React, { useState, useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { changePass, getUserByToken } from '../../api/userApi';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
export default function PasswordManage() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const getIDStore = useSelector((state) => state.auth.id);

  const oldPasswordHandleChange = (event) => {
    setOldPassword(event.target.value);
  };
  const newPasswordHandleChange = (event) => {
    setNewPassword(event.target.value);
  };
  const ConfirmPasswordHandleChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  let local = JSON.parse(localStorage.getItem('userInfo'));
  const toast = useToast();
  const CPClick = async () => {
    try {
      const body = {
        id: getIDStore,
        oldPassword: oldPassword,
        newPassword: newPassword,
        ConfirmPassword: ConfirmPassword,
        token: local.accessToken,
      };
      const res = await changePass(body);
      if (res.status === 200) {
        toast({
          description: res.data.message,
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
          onClose,
        });
      } else {
        toast({
          description: res.data.message,
          position: 'top',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      onClose;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <EditIcon
        color="blackAlpha.400"
        h="5"
        w="5"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      />
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                placeholder="Current Password "
                type="text"
                value={oldPassword}
                onChange={oldPasswordHandleChange}
              />
              <FormLabel>Current Password</FormLabel>
            </FormControl>
            <FormControl>
              <Input
                placeholder="New Password"
                type="text"
                value={newPassword}
                onChange={newPasswordHandleChange}
              />
              <FormLabel>New Password</FormLabel>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Confirm Password"
                type="text"
                value={ConfirmPassword}
                onChange={ConfirmPasswordHandleChange}
              />
              <FormLabel>Confirm Password</FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={CPClick}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
