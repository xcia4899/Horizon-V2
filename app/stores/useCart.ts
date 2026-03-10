import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Product } from "@/composables/useProducts";

type CartItem = {
  product: Product;
  quantity: number;
};

const CART_KEY = "cart";

export const useCartStore = defineStore("cart", () => {
  // 初始化購物車
  const carts = ref<CartItem[]>([]);
  const isReady = ref(false);

  const initCart = () => {
    if (!import.meta.client) return;
    try {
      carts.value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      carts.value = [];
    }
    isReady.value = true;
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

    const q = Number(quantity)

    if (!q || q <= 0) {
      removeFromCart(productId);
      return;
    }

    item.quantity = quantity;
  };

  const clearCart = () => {
    carts.value = [];
  };
  const totalPrice = computed(() => {
    return carts.value.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    );
  });
  const totalQuantity = computed(() =>
    carts.value.reduce((total, item) => total + item.quantity, 0),
  );
  //   carts 有變動就同步到 localStorage
  watch(
    carts,
    (val) => {
      if (!import.meta.client) return;
      if (!isReady.value) return;
      localStorage.setItem(CART_KEY, JSON.stringify(val));
    },
    { deep: true },
  );

  return {
    carts,
    initCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalQuantity,
  };
});
