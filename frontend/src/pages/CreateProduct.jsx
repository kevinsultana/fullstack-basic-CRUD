import { useProductStore } from "../store/product";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Toast,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const toast = useToast();
  const navigate = useNavigate();

  const handleCreateProduct = async () => {
    const data = await createProduct(newProduct);
    if (data?.success === true) {
      toast({ title: "Product created successfully", status: "success" });
      setNewProduct({ name: "", description: "", price: "", image: "" });
      navigate("/", { replace: true });
    } else if (data?.success === false) {
      toast({ title: "Failed to create product", status: "error" });
    } else if (data?.error) {
      toast({ title: data.error, status: "warning" });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8} align={"stretch"}>
        <Heading size="lg" textAlign={"center"} mt={4}>
          Create New Product
        </Heading>
        <Box
          p={6}
          shadow={"md"}
          bg={useColorModeValue("white", "gray.800")}
          rounded={"lg"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleCreateProduct} w={"full"}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
