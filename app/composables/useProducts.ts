import productList from "@/assets/data/json/productList.json";

export interface DetailContent {
  title: string;
  text: string[];
}
export interface ProductDetail {
  section: string;
  content: DetailContent[];
}
export interface FeatureItem {
  id: string;         
  title:string;
  subtitle?: string;   
  icon?: string;       
  desc?: string[];      
}
export interface highlights{
  title:string;
  description:string;
  items:FeatureItem[]
}
export interface ProductImages {
  main: string;
  thumbnails: string[];
}
export interface Product {
  id: string;
  brand: string;
  name: string;
  subtitle: string;
  category: string;

  discount: number;
  price: number;
  onsale: boolean;

  color: string;
  description: string;

  images: ProductImages;
  details: ProductDetail[];
  highlights:highlights

  tags: string[];
}

export const useProducts = async () => {
  // 現在：本地 JSON
  return productList;

  // 未來：換成後端時，只改這裡
  // const config = useRuntimeConfig()
  // return await $fetch(`${config.public.apiBase}/products`)
};
