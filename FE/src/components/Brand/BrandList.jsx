import React, { useState } from "react";
import Content from "../Content";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import BrandCard from "./BrandCard";
import CreateBrand from "./CreateBrand";
import ReactPaginate from "react-paginate";
import styles from "./brand.module.css";
import { useSearchParams } from "react-router-dom";

export default function BrandList({
  accessToken,
  data,
  addNewBrandMutation,
  updateBrandMutation,
  deleteBrandMutation,
  setBrandQuery,
  brandQuery,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState();
  let [searchParams, setSearchParams] = useSearchParams();
  const RenderData = () => {
    return data?.data?.data?.map((data) => {
      return (
        <BrandCard
          key={data.id}
          data={data}
          updateBrandMutation={updateBrandMutation}
          deleteBrandMutation={deleteBrandMutation}
          accessToken={accessToken}
        />
      );
    });
  };

  const handlePageClick = (e) => {
    setBrandQuery({ ...brandQuery, ["page"]: e.selected + 1 });
    setSearchParams({ page: e.selected + 1 });
  };

  const onSearchHandler = () => {
    setBrandQuery({ ...brandQuery, ["brandName"]: search });
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      setBrandQuery({ ...brandQuery, ["brandName"]: search });
    }
  };

  return (
    <Content>
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="semibold"
        marginStart="12"
      >
        Brand Management
      </Text>
      <Box minH="85vh" w="90%" bg="#F5F6F6" mx="auto" marginTop={10}>
        <Flex
          width="100%"
          justifyContent={"space-between"}
          marginTop={4}
          marginRight={8}
          marginBottom={10}
        >
          <InputGroup size="md" width={"20%"} marginLeft={8}>
            <Input
              pr="4.5rem"
              type={"text"}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={onKeyDownHandler}
            />
            <InputRightElement rounded={8}>
              <Button
                variant={"unstyle"}
                bgColor={"transparent"}
                rounded={8}
                onClick={onSearchHandler}
              >
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            colorScheme="telegram"
            width={"max-content"}
            marginRight={8}
            onClick={onOpen}
          >
            Add New Brand
          </Button>
        </Flex>
        <TableContainer
          justifyContent={"center"}
          border={"1px"}
          borderRadius="10px"
          mx={"3%"}
          mb="4%"
        >
          <Table variant="striped" colorScheme="teal" size="md">
            <TableCaption>List of Company</TableCaption>
            <Thead>
              <Tr justifyContent={"center"}>
                <Th>Brand Name</Th>
                <Th>Sales PIC</Th>
                <Th textAlign={"center"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <RenderData />
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <CreateBrand
        isOpen={isOpen}
        onClose={onClose}
        addNewBrandMutation={addNewBrandMutation}
        accessToken={accessToken}
      />
      {data && (
        <ReactPaginate
          forcePage={brandQuery.page - 1}
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(data.data.totalPages / brandQuery.pageSize)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={styles.pagination}
          pageLinkClassName={styles.pagenum}
          previousLinkClassName={styles.pagenum}
          nextLinkClassName={styles.pagenum}
          activeLinkClassName={styles.active}
          disabledClassName={styles.disabled}
        />
      )}
    </Content>
  );
}
