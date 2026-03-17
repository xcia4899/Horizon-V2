<template>
  <div class="recommend-inner">
    <h2 class="recommend-intro">熱門推薦</h2>
    <Swiper
      class="carousel"
      :modules="[Pagination, Navigation]"
      :slides-per-view="2"
      :space-between="32"
      :pagination="{
        el: '.recommend-carousel-pagination',
        clickable: true,
      }"
      :navigation="{
        nextEl: '.recommend-carousel-btnNext',
        prevEl: '.recommend-carousel-btnPrev',
      }"
      :breakpoints="{
        550: { slidesPerView: 3 },
        920: { slidesPerView: 4 },
      }"
    >
      <SwiperSlide
        v-for="item in randomProducts"
        :key="item.id"
        class="carousel-card"
        @click="gotoProductDetail(item.id)"
      >
        <div class="card-media">
          <NuxtImg class="image" :src="item.images.main" :alt="item.name" />
        </div>
        <h4 class="card-title">{{ item.name }}</h4>
      </SwiperSlide>
    </Swiper>
    <div class="recommend-carousel-pagination"></div>
    <div class="carousel-control">
      <button type="button" class="swiper-btn recommend-carousel-btnPrev">
        <Icon name="ep:arrow-left" class="icon" />
      </button>

      <button type="button" class="swiper-btn recommend-carousel-btnNext">
        <Icon name="ep:arrow-right" class="icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useProducts } from "@/composables/useProducts";
import type { Product } from "@/composables/useProducts";

//獲取商品資料
const products = await useProducts();
//隨機選擇資料顯示
const randomProducts = useState<Product[]>("random-products", () => {
  return [...products].sort(() => 0.5 - Math.random()).slice(0, 6);
});

const gotoProductDetail = async (id: string) => {
  // console.log("指定ID", id);
  await looding(100);
  await navigateTo({
    name: "products-id",
    params: { id },
  });
};
</script>

<style scoped lang="scss">
.recommend-inner {
  position: relative;
}
.recommend-intro {
  display: grid;
  place-content: center;
  padding: 32px;
}
.carousel {
  /* //Swiper 預設按鈕 */

  :deep(.swiper-slide) {
    height: auto;
  }
  .carousel-card {
    position: relative;
    border: 3px solid var(--border-default);
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg-surface-soft);
    cursor: pointer;
    transition:
      border-color 0.4s ease,
      background-color 0.4s ease;
    .card-media {
      aspect-ratio: 1 / 1;
      width: 100%;
      overflow: hidden;
      padding: 20px;
      transform: translateY(-16px);
      .image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
        transition: transform 0.4s ease-out;
        transform: scale(1);
        transform-origin: center;
      }
    }
    .card-title {
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 8px;

      text-align: center;
      font-size: clamp(14px, 2vw, 20px);
      color: var(--text-primary);
      transition: color 0.3s ease-out 0.1s;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: var(--inverse);
        transform: translateY(100%);
        transition: transform 0.3s ease-out 0.1s;
      }
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: var(--inverse);

        .image {
          transform: scale(1.2);
        }
        .card-title {
          color: var(--text-inverse);
        }
        .card-title::after {
          transform: translateY(0%);
        }
      }
    }
    &:active {
      border-color: var(--inverse);

      .image {
        transform: scale(1.2);
      }
    }
    @media (pointer: coarse) {
      .image {
        transform: scale(1.2);
      }
    }
  }
}
/* pagination 控制區 */
.recommend-carousel-pagination {
  display: flex;
  justify-content: center;
  padding-block: 48px 64px;
  :deep(.swiper-pagination-bullet) {
    border: none;
    border-radius: 0;
    background: var(--bg-surface-contrast);
    margin: 0px;
    width: clamp(40px, 10vw, 120px);
    height: 8px;
    &.swiper-pagination-bullet-active {
      background: var(--action-primary);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover:not(.swiper-pagination-bullet-active) {
        background: var(--action-primary-hover);
        opacity: 0.8;
      }
    }
    &:active {
      background: var(--action-primary-hover);
      opacity: 0.8;
    }
  }
}
/* //翻頁控制器 */
.carousel-control {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 50%;
  transform: translateY(50%);
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease-out;
  :deep(.recommend-carousel-btnPrev),
  :deep(.recommend-carousel-btnNext) {
    pointer-events: auto;
  }
  @media (pointer: coarse) {
    left: $padding-RWD;
    right: $padding-RWD;
    bottom: calc(0% + clamp(36px, 4vw, 60px) / 2 - 14px);
    margin-bottom: 64px;
  }
}
@media (hover: hover) and (pointer: fine) {
  .recommend-inner:hover .carousel-control {
    opacity: 1;
  }
}
</style>
