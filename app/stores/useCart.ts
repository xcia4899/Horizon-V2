import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Product } from "@/composables/useProducts";

type CartItem = {
  product: Product;
  quantity: number;
};

const CART_KEY = "cart";

export const useCartStore = defineStore("cart", () => {
  const carts = ref<CartItem[]>([]);

  // 初始化購物車
  const initCart = () => {
    if (!import.meta.client) return;

    const saved = localStorage.getItem(CART_KEY);
    if (!saved) {
      carts.value = [];
      return;
    }

    try {
      carts.value = JSON.parse(saved);
    } catch (error) {
      console.error("讀取購物車失敗:", error);
      carts.value = [];
    }
  };

  const addToCart = (product: Product) => {
    const item = carts.value.find((i) => i.product.id === product.id);

    if (item) {
      item.quantity += 1;
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

  const updateQuantity = (productId: string, quantity: number) => {
    const item = carts.value.find((i) => i.product.id === productId);
    if (!item) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    item.quantity = quantity;
  };

  const clearCart = () => {
    carts.value = [];
  };

  // carts 有變動就同步到 localStorage
  watch(
    carts,
    (val) => {
      if (!import.meta.client) return;
      localStorage.setItem(CART_KEY, JSON.stringify(val));
    },
    { deep: true }
  );

  return {
    carts,
    initCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});