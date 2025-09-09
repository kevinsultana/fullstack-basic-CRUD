import { useProductStore } from "../store/product";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProductCard({ product }) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [newProduct, setProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.700");

  const { deleteProduct, editProduct } = useProductStore();

  const toast = useToast();

  const handleDelete = async (id) => {
    await deleteProduct(id);
    toast({
      title: "Product deleted.",
      description: "The product has been successfully deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEdit = async (id) => {
    // Implement the edit functionality here
    await editProduct(id, newProduct);
    setIsModalEditOpen(false);
    toast({
      title: "Product updated.",
      description: "The product has been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      rounded="lg"
      shadow={"lg"}
      overflow="hidden"
      _hover={{ transform: "scale(1.05)", shadow: "xl" }}
      transition="all 0.3s ease-in-out"
      bg={bgColor}
    >
      <VStack key={product._id} spacing={2} align="stretch">
        <Image
          src={product.image}
          alt={product.name}
          h={"200px"}
          w={"full"}
          objectFit="cover"
        />
        <Box p={4}>
          <Heading as="h3" size="md" mb={2} color={textColor}>
            {product.name}
          </Heading>
          <Text color={textColor}>{product.description}</Text>
          <Text fontWeight={"bold"} fontSize={"xl"} mt={2} color={textColor}>
            ${product.price}
          </Text>
          <HStack mt={4} spacing={4}>
            <IconButton
              onClick={() => setIsModalEditOpen(true)}
              icon={<FaEdit />}
              aria-label="Edit Product"
              colorScheme="blue"
            />
            <IconButton
              onClick={() => setIsModalDeleteOpen(true)}
              icon={<FaTrash />}
              aria-label="Delete Product"
              colorScheme="red"
            />
          </HStack>
        </Box>
      </VStack>

      <Modal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} mb={4}>
              <title>Edit Product</title>
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Description"
                value={newProduct.description}
                onChange={(e) =>
                  setProduct({ ...newProduct, description: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                value={newProduct.price}
                type="number"
                onChange={(e) =>
                  setProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                value={newProduct.image}
                onChange={(e) =>
                  setProduct({ ...newProduct, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4}>
              <Button
                colorScheme="blue"
                onClick={() => handleEdit(product._id)}
              >
                Edit
              </Button>
              <Button onClick={() => setIsModalEditOpen(false)}>Cancel</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this product?</Text>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4}>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
              <Button onClick={() => setIsModalDeleteOpen(false)}>
                Cancel
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
