'use client';
import { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { createContact } from '../../api/contactApi';
import { useToast } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export default function NewContact({
  isOpen,
  onClose,
  addNewContactMutation,
  accessToken,
}) {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [addNewContact, setAddNewContact] = useState({
    salutation: '',
    name: '',
    jobTitle: '',
    gender: '',
    company: '',
    email: '',
    segment: '',
    province: '',
    phone: '',
    city: '',
    address: '',
    postCode: '',
  });
  const onAddNewContact = () => {
    addNewContactMutation.mutate({ ...addNewContact, accessToken });
    setAddNewContact({
      salutation: '',
      name: '',
      jobTitle: '',
      gender: '',
      company: '',
      email: '',
      segment: '',
      province: '',
      phone: '',
      city: '',
      address: '',
      postCode: '',
    });
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>salutation</FormLabel>
              <Input
                type="text"
                name="salutation"
                value={addNewContact.salutation}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={addNewContact.name}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Job Title</FormLabel>
              <Input
                type="text"
                name="jobTitle"
                value={addNewContact.jobTitle}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>gender</FormLabel>
              <Input
                type="text"
                name="gender"
                value={addNewContact.gender}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Company</FormLabel>
              <Input
                type="text"
                name="company"
                value={addNewContact.company}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>email</FormLabel>
              <Input
                type="text"
                name="email"
                value={addNewContact.email}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>segment</FormLabel>
              <Input
                type="text"
                name="segment"
                value={addNewContact.segment}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>province</FormLabel>
              <Input
                type="text"
                name="province"
                value={addNewContact.province}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>phone</FormLabel>
              <Input
                type="text"
                name="phone"
                value={addNewContact.phone}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>city</FormLabel>
              <Input
                type="text"
                name="city"
                value={addNewContact.city}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>address</FormLabel>
              <Input
                type="text"
                name="address"
                value={addNewContact.address}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>postCode</FormLabel>
              <Input
                type="text"
                name="postCode"
                value={addNewContact.postCode}
                onChange={(e) =>
                  setAddNewContact({
                    ...addNewContact,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="telegram" onClick={onAddNewContact}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
