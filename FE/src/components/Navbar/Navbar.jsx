import { Box, Button, Flex, Icon, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { HamburgerIcon, EditIcon } from "@chakra-ui/icons";

export default function Navbar({ user }) {
  return (
    <Flex direction="column" height="100vh" width="20vw" bg="twitter.500">
      <Box mx="auto" w="70%">
        <Image src="/adminmedbox.svg" h="32" alt="icon" />
      </Box>
      <Box
        h="10"
        cursor="pointer"
        p="2"
        // bg={router.pathname.includes("transaksi") ? "#005E9D" : "unset"}
      >
        <Flex justifyContent="center">
          {/* <Image src="/transaksi.svg" alt="transaksi" /> */}
          <Text color="white" ms="2">
            Transaksi
          </Text>
        </Flex>
      </Box>
      <Box
        h="10"
        cursor="pointer"
        p="2"
        // bg={router.pathname.includes("inventory") ? "#005E9D" : "unset"}
      >
        <Flex justifyContent="center">
          {/* <Image src="/inventory.svg" alt="inventory" /> */}
          <Text color="white" ms="2">
            Inventory
          </Text>
        </Flex>
      </Box>
      <Box
        h="10"
        cursor="pointer"
        p="2"
        // bg={router.pathname.includes("Laporan") ? "#005E9D" : "unset"}
      >
        <Flex justifyContent="center">
          {/* <Image src="/laporan.svg" alt="laporan" /> */}
          <Text color="white" ms="2">
            Laporan
          </Text>
        </Flex>
      </Box>
      <Box
        h="10"
        cursor="pointer"
        p="2"
        // bg={router.pathname.includes("category") ? "#005E9D" : "unset"}
      >
        <Flex justifyContent="center">
          <HamburgerIcon color="white" h="5" w="5" />
          <Text color="white" ms="2">
            Kategori
          </Text>
        </Flex>
      </Box>

      <Box
        h="10"
        cursor="pointer"
        p="2"
        // bg={router.pathname.includes("resep") ? "#005E9D" : "unset"}
      >
        <Flex justifyContent="center">
          <EditIcon color="white" h="5" w="5" />
          <Text color="white" ms="2">
            Resep
          </Text>
        </Flex>
      </Box>
      <Spacer />

      <Flex
        direction="column"
        width="max-content"
        mx="auto"
        alignItems="center"
      >
        <Button
          variant="outline"
          bgColor="twitter"
          color="white"
          mb="10"
          _hover={{}}
          _active={{ color: "black" }}
          paddingInline={"10"}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}
