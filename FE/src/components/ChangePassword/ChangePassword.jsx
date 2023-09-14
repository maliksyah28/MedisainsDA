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
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
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

  const oldPasswordHandleChange = (event) => {
    setOldPassword(event.target.value);
  };
  const newPasswordHandleChange = (event) => {
    setNewPassword(event.target.value);
  };
  const ConfirmPasswordHandleChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const CPClick = async () => {
    try {
      const resID = await getUserByToken();
      console.log(resID);
      const body = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        ConfirmPassword: ConfirmPassword,
      };
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        <EditIcon color="white" h="5" w="5" />
      </Button>
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
