import { Box, Button, Flex, Icon, Image, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { HamburgerIcon, EditIcon } from "@chakra-ui/icons";
import { FaSignOutAlt } from "react-icons/fa";
import PasswordManage from "../ChangePassword/ChangePassword";
import { logout } from "../../auth/authSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  const onLogoutClick = () => {
    localStorage.removeItem("userInfo");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Flex
      direction="column"
      height="100vh"
      width="20vw"
      bg="telegram.700"
      position={"sticky"}
      left={0}
      top={0}
    >
      <Box mx="auto" w="70%">
        <Image src="/LOGOMedsains.png" alt="icon" />
      </Box>
      <Box>
        <Box
          h="10"
          cursor="pointer"
          paddingLeft={10}
          paddingBlock={2}
          // bg={location.pathname.includes("transaksi") ? "#005E9D" : "unset"}
        >
          {/* <Image src="/transaksi.svg" alt="transaksi" /> */}
          <Text color="white" ms="2">
            Profile
          </Text>
        </Box>
        {user.role === 1 && (
          <Box
            h="10"
            cursor="pointer"
            paddingLeft={10}
            paddingBlock={2}
            onClick={() => navigate("/account-management")}
            bg={
              location.pathname.includes("account-management")
                ? "#1E90FF"
                : "unset"
            }
          >
            {/* <Image src="/inventory.svg" alt="inventory" /> */}
            <Text color="white" ms="2">
              Account Management
            </Text>
          </Box>
        )}
        <Box
          h="10"
          cursor="pointer"
          paddingLeft={10}
          paddingBlock={2}
          onClick={() => navigate("/company")}
          bg={location.pathname.includes("company") ? "#1E90FF" : "unset"}
        >
          {/* <Image src="/inventory.svg" alt="inventory" /> */}
          <Text color="white" ms="2">
            Company
          </Text>
        </Box>
        <Box
          h="10"
          cursor="pointer"
          paddingLeft={10}
          paddingBlock={2}
          onClick={() => navigate("/brand")}
          bg={location.pathname.includes("brand") ? "#1E90FF" : "unset"}
        >
          {/* <Image src="/inventory.svg" alt="inventory" /> */}
          <Text color="white" ms="2">
            Brand
          </Text>
        </Box>
        {/* <Box
          h="10"
          cursor="pointer"
          p="2"
          bg={router.pathname.includes("Laporan") ? "#005E9D" : "unset"}
        >
          <Flex justifyContent="center">
            <Image src="/laporan.svg" alt="laporan" />
            <Text color="white" ms="2">
              Laporan
            </Text>
          </Flex>
        </Box> */}

        {/* <Box
          h="10"
          cursor="pointer"
          p="2"
          bg={router.pathname.includes("category") ? "#005E9D" : "unset"}
        >
          <Flex justifyContent="center">
            <HamburgerIcon color="white" h="5" w="5" />
            <Text color="white" ms="2">
              Kategori
            </Text>
          </Flex>
        </Box> */}

        {/* <Box
          h="10"
          cursor="pointer"
          p="2"
          bg={router.pathname.includes("resep") ? "#005E9D" : "unset"}
        >
          <Flex justifyContent="center">
            <EditIcon color="white" h="5" w="5" />
            <Text color="white" ms="2">
              Resep
            </Text>
          </Flex>
        </Box> */}
      </Box>
      <Spacer />

      {/* <Box width={"full"}> */}
      <Flex
        direction={"row"}
        width="max-content"
        mx="auto"
        alignItems="center"
        justify-content="space-between"
      >
        <Button onClick={handleButtonClick} disabled={buttonClicked} mb="10">
          <PasswordManage />
        </Button>
        <Button
          variant="outline"
          bgColor="twitter"
          color="white"
          mb="10"
          marginLeft={"10"}
          _hover={{}}
          _active={{ color: "black" }}
          onClick={onLogoutClick}
          // paddingInline={'10'}
        >
          <FaSignOutAlt color="white" h="5" w="5" />
        </Button>
      </Flex>
      {/* </Box> */}
    </Flex>
  );
}
