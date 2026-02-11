import productList from '@/assets/data/json/productList.json'

export const useProducts = async () => {
  // 現在：本地 JSON
  return productList

  // 未來：換成後端時，只改這裡
  // const config = useRuntimeConfig()
  // return await $fetch(`${config.public.apiBase}/products`)
}
