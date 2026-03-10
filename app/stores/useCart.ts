import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
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

  // 檢查資料是否符合 CartItem 結構
  // 用來過濾 localStorage 裡格式錯誤的資料
  const isValidCartItem = (item: unknown): item is CartItem => {
    // 必須是物件
    if (!item || typeof item !== "object") return false;

    const cartItem = item as CartItem;

    // 檢查必要欄位
    return !!(
      cartItem.product &&
      typeof cartItem.product.id === "string" &&
      typeof cartItem.product.price === "number" &&
      typeof cartItem.quantity === "number"
    );
  };

  // 初始化購物車（從 localStorage 讀取）
  const initCart = () => {
    // SSR 沒有 localStorage
    if (!import.meta.client) return;

    try {
      const saved = localStorage.getItem(CART_KEY);

      // 沒資料 → 空購物車
      if (!saved) {
        carts.value = [];
      } else {
        const raw = JSON.parse(saved);

        // 確保是陣列並過濾錯誤資料
        carts.value = Array.isArray(raw) ? raw.filter(isValidCartItem) : [];
      }
    } catch {
      // JSON 壞掉 → 清空
      carts.value = [];
    } finally {
      // 初始化完成，watch 才開始同步
      isReady.value = true;
    }
  };

  const addToCart = (product: Product) => {
    if (!product?.id) return;
    const item = carts.value.find((i) => i?.product?.id === product.id);

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
    if (!productId) return;
    carts.value = carts.value.filter(
      (item) => item.product && item.product.id !== productId,
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const item = carts.value.find((i) => i?.product.id === productId);
    if (!item) return;

    const q = Number(quantity);

    if (!Number.isFinite(q) || q <= 0) {
      removeFromCart(productId);
      return;
    }

    item.quantity = Math.floor(q);
  };

  const clearCart = () => {
    carts.value = [];
  };
  const totalPrice = computed(() => {
    return carts.value.reduce((sum, item) => {
      if (!item?.product) return sum;
      return sum + item.quantity * item.product.price;
    }, 0);
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
