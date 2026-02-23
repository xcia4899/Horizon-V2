<template>
  <div class="products-view">
    <div
      v-for="product in productListView"
      :key="product.id"
      class="product-card"
    >
      <div class="card-media">
        <div class="card-image">
          <img :src="product.images.main" :alt="product.name" />
        </div>
        <div class="card-barnd">{{ product.brand }}</div>
      </div>
      <div class="card-content">
        <h4 class="card-title">{{ product.name }}</h4>
        <h5 class="card-text">{{ product.description }}</h5>

        <div class="card-price">
          <p v-show="product.onsale" class="discount">
            特價$ {{ product.discount.toLocaleString() }}
          </p>
          <p class="price" :class="{ strike: product.onsale }">
            NT$ {{ product.price.toLocaleString() }}
          </p>
        </div>
        <button class="card-add btn">加入購物車</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/composables/useProducts";
defineProps<{
  productListView: Product[];
}>();
</script>

<style scoped lang="scss">
.products-view {
  // border: 1px solid;
  width: 100%;
  display: grid;
  // grid-template-columns: repeat(3, 1fr); /* 建立三欄，每欄 1fr 寬 */
  grid-template-columns: repeat(auto-fit, minmax(220px, max-content));
  grid-template-rows: auto-fit;
  /* 自動高度 */
  margin: 0 auto;
  gap: 32px 24px;
  padding: 8px;
  justify-items: flex-start;
  justify-content: center;
  .product-card {
    position: relative;
    height: 100%;
    width: 100%;

    min-width: 200px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    cursor: pointer;
    > * {
      position: relative;
      z-index: 1;
    }
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      border-radius: 6px;
      content: "";
      height: 20%;
      width: 100%;
      background: var(--bg-surface-card);
      transition: height 0.4s ease-out;
      box-shadow: transparent;
    }
    .card-media {
      height: 100%;
      position: relative;
      background: var(--bg-surface-card);
      border-radius: 6px;
      .card-image {
        height: 100%;
        width: 100%;
        padding: 8px 8px 32px;
        // border-radius: 6px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          // height: 100%;
          width: 100%;
          height: 200px;
          padding: 8px;
          // overflow: hidden;
          object-fit: cover;
          object-position: center;
        }
      }
      .card-barnd {
        position: absolute;
        bottom: 8px;
        left: 8px;
        font-size: 14px;
        font-weight: 900;
        color: var(--brand);
        cursor: pointer;
      }
    }
    .card-content {
      flex: 1;
      word-wrap: break-word;
      // color: $color-darkgery;;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: flex-start;
      padding: 8px;
      gap: 4px;

      .card-title,
      .card-text {
        cursor: pointer;
        width: 100%;
        transition: color 0.4s ease;
      }
      .card-title {
        @include line-clamp(1);
      }
      .card-text {
        color: var(--text-secondary);
        @include line-clamp(2);
      }
      .card-price {
        margin-top: 8px;
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .discount,
        .price {
          cursor: pointer;
          transition: color 0.4s ease;
        }
        .discount {
          color: var(--state-danger);
          font-weight: bolder;
        }
        .price.strike {
          text-decoration: line-through;
          color: var(--text-secondary);
          opacity: 0.8;
          font-size: 14px;
        }
      }

      .card-add {
        height: 36px;
        width: 100%;
        padding: 0;

        transition: all 0.3s ease;
        margin-top: 4px;
      }
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        &::after {
          height: 100%;
          box-shadow: var(--shadow-focus);
        }
        .card-content {
          .card-title {
            color: $color-black;
          }
          .card-text {
            color: $color-gray-800;
          }
          .price {
            color: $color-black;
          }
          .price.strike {
            color: $color-gray-800;
          }
        }
      }
    }
  }
}
</style>
