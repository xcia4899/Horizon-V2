// useProducts.ts
import productList from "@/assets/data/json/productList.json";
import type {Product} from "~/types/data/products"


  // 未來：換成後端時，只改這裡
  // const config = useRuntimeConfig()
  // return await $fetch(`${config.public.apiBase}/products`)
export const useProducts = async (): Promise<Product[]> => {
  // 現在：本地 JSON
  return productList as Product[];

};
