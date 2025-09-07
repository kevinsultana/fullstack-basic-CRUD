import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";
import { Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router";

export default function HomePage() {
  const { products, getProducts } = useProductStore();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8} align="stretch" mb={8}>
        <Text
          textTransform={"uppercase"}
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          Current Product Store 🛒
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products?.data?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products?.data?.length === 0 && (
          <Text fontSize={{ base: "16", sm: "18" }} textAlign={"center"}>
            No products available.{" "}
            <Link to="/create">
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a new product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}
