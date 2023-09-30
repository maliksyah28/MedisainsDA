import { Flex } from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';
import {
  IconButton,
  useToast,
  Button,
  Image,
  Text,
  Box,
  Heading,
  Divider,
} from '@chakra-ui/react';

import TableData from '../TableData';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function ListContact() {
  const toast = useToast();
  const [listUser, setListUser] = useState([]);
  // const fetchDataUser = async () => {
  //     try {
  //         const getUser =await axiosInstance.get('api/users')
  //         setListUser(getUser.data.data)
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }
  // console.log(listUser);
  // useEffect (()=> {
  //     fetchDataUser()
  // },[])

  const dataUser = React.useMemo(() => [...listUser], [listUser]);
  const columnFunction = () => [
    {
      Header: 'NAME',
      // accessor : "nik"
    },
    {
      Header: 'Contact',
      // accessor : "username",
    },
    {
      Header: 'Segment',
      // accessor : "roleName"
    },
    {
      Header: 'Sales_PIC',
      // accessor : "name"
    },
    {
      Header: 'Created',
      // accessor : "email"
    },
    {
      Header: 'Action',
      Cell: ({ row: { original } }) => {
        {
          return (
            <>
              <Button color="Black">
                {/* <Image width={4} height={4} src="delete.svg" alt="inventory" /> */}
              </Button>
              <Button color="Black">
                {/* <Image width={4} height={4} src="key.svg" alt="inventory" /> */}
              </Button>
            </>
          );
        }
      },
    },
  ];
  const columns = React.useMemo(columnFunction, []);

  //get localstorage datas
  let local = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <>
      <TableData columns={columns} data={dataUser} />
    </>
  );
}
