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
}));
