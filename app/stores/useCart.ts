import { defineStore } from "pinia";

import type { Product } from "@/composables/useProducts";

type CartItem = {
  product: Product;
  quantity: number;
};

export const useCartStore = defineStore("cart", () => {
  //初始化判斷localStorage有無購物車資料
  const carts = ref<CartItem[]>(
    import.meta.client ? JSON.parse(localStorage.getItem("cart") || "[]") : [],
  );

  const addToCart = (product: Product) => {
    const item = carts.value.find((i) => i.product.id === product.id);

    if (item) {
      item.quantity++;
      return;
    }

    carts.value.push({
      product,
      quantity: 1,
    });
  };
  const removeFromCart = (productId: string) => {
    carts.value = carts.value.filter((item) => item.product.id !== productId);
  };

  //cart更動時存入localStorage的"cart"
  watch(
    () => carts.value,
    (val) => {
      localStorage.setItem("cart", JSON.stringify(val));
    },
    { deep: true },
  );

  return { carts, addToCart, removeFromCart };
});
