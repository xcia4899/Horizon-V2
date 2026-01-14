<template>
  <div class="cart-show">
    <div class="cart-area">
      <div v-for="item in cartItems" :key="item.id" class="cartproductshow">
        <div>
          <img :src="item.images.main" :alt="item.name" >
        </div>

        <div class="itemname">{{ item.name }}</div>

        <div>
          <div>數量：{{ item.quantity }}</div>
          <div class="itemprice">
            小計：${{ item.subtotal.toLocaleString() }}
          </div>
        </div>

        <div class="delete">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="bottom-area">
      <h4>總金額：{{ totalPrice.toLocaleString() }} 元</h4>
      <a href="./cart.html">
        <button class="btn">結帳</button>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const cartItems = [
  {
    id: 1,
    name: "經典白T",
    price: 590,
    quantity: 2,
    subtotal: 1180,
    images: {
      main: "https://picsum.photos/100/100?1",
    },
  },
  {
    id: 2,
    name: "牛仔外套",
    price: 1280,
    quantity: 1,
    subtotal: 1280,
    images: {
      main: "https://picsum.photos/100/100?2",
    },
  },
];

const totalPrice = computed(() =>
  cartItems.reduce((sum, item) => sum + item.subtotal, 0)
);
</script>

<style scoped lang="scss">
.cartproductshow {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
}

.itemname {
  font-weight: bold;
}

.itemprice {
  color: #c00;
}
</style>
