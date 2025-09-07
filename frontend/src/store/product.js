import { BaseUrl } from "../api/BaseUrl";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  selectedProduct: null,
  createProduct: async (newProduct) => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.image
    ) {
      return { error: "All fields are required" };
    }

    try {
      const response = await BaseUrl.post("/products", newProduct);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getProducts: async () => {
    try {
      const response = await BaseUrl.get("/products");
      set({ products: response.data });
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (id) => {
    try {
      const response = await BaseUrl.delete(`/products/${id}`);
      if (response.status === 200) {
        const { getProducts } = useProductStore.getState();
        getProducts();
      } else {
        console.log("Failed to delete the product");
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
