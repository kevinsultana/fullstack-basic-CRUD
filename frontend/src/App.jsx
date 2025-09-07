import { Box, Button, transition, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateProduct from "./pages/CreateProduct";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </Box>
  );
}
