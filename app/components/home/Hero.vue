<template>
  <div class="hero-inner">
    <Swiper
      class="hero-swiper-wrapper"
      :modules="[Autoplay, Pagination, Navigation]"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :autoplay="{ delay: 6000, disableOnInteraction: false }"
      :pagination="{ el: '.home-hero-pagination', clickable: true }"
      :navigation="{
        nextEl: '.home-hero-swiper-btn-next',
        prevEl: '.home-hero-swiper-btn-prev',
      }"
      @swiper="onSwiper"
      @slide-change-transition-start="onSlideStart"
      @slide-change-transition-end="onSlideEnd"
    >
      <SwiperSlide v-for="slide in heroSlides" :key="slide.id" class="hero-slide">
        <div class="slide-image">
          <NuxtImg
            :src="slide.image.src"
            :alt="slide.image.alt"
            sizes="100vw"
            format="webp"
            quality="80"
            class="image"
          />
        </div>
  
        <div class="slide-content">
          <h3 class="slide-title">{{ slide.title }}</h3>
          <p class="slide-text">{{ slide.text }}</p>
          <button class="btn slide-btn">立即購買</button>
        </div>
      </SwiperSlide>
  
      <div class="swiper-pagination home-hero-pagination"></div>
      <div class="hero-btnControl">
        <button type="button" class="swiper-btn home-hero-swiper-btn-prev">
          <Icon name="ep:arrow-left" class="icon" />
        </button>
        <button type="button" class="swiper-btn home-hero-swiper-btn-next">
          <Icon name="ep:arrow-right" class="icon" />
        </button>
      </div>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { Swiper as SwiperClass } from "swiper";

const swiperIns = ref<SwiperClass | null>(null);
//獲得swiper-bullets
function getBullets(swiper: SwiperClass): HTMLElement[] {
  // Swiper 的 bullets 型別實際是 HTMLElement[] | null | undefined
  const bullets = swiper.pagination?.bullets ?? [];
  return bullets.filter((el): el is HTMLElement => el instanceof HTMLElement);
}
//重啟動畫
function restartBulletProgress(swiper: SwiperClass) {
  const bullets = getBullets(swiper);
  if (!bullets.length) return;

  bullets.forEach((b) => b.classList.remove("progress"));

  const active = bullets[swiper.realIndex];
  if (!active) return;

  // 重啟動畫
  active.classList.remove("progress");
  requestAnimationFrame(() => {
    active.classList.add("progress");
  });
}
//清除動畫
function clearBulletProgress(swiper: SwiperClass) {
  const bullets = getBullets(swiper);
  bullets.forEach((b) => b.classList.remove("progress"));
}
//綁定事件
function onSwiper(swiper: SwiperClass) {
  swiperIns.value = swiper;

  // Swiper 建好後，pagination 可能還在建立中，延後一幀更穩
  requestAnimationFrame(() => restartBulletProgress(swiper));
}
//事件開始
function onSlideStart(swiper: SwiperClass) {
  clearBulletProgress(swiper);
}
//事件結束
function onSlideEnd(swiper: SwiperClass) {
  restartBulletProgress(swiper);
}

const heroSlides = [
  {
    id: "powerplay-1",
    title: "始終電力十足。隨時待命",
    text: "認識 POWERPLAY 2。無限力量，化繁為簡。",
    image: {
      src: "/images/home/hero/hero-bg-01.jpg",
      alt: "POWERPLAY 2",
    },
  },
  {
    id: "powerplay-2",
    title: "智慧供電，簡單就是力量",
    text: "POWERPLAY 2，打造真正無感充電體驗。",
    image: {
      src: "/images/home/hero/hero-bg-02.jpg",
      alt: "POWERPLAY 桌面展示",
    },
  },
  {
    id: "powerplay-3",
    title: "穩定供電，從不間斷",
    text: "POWERPLAY 2，專為專注與持久打造。",
    image: {
      src: "/images/home/hero/hero-bg-03.jpg",
      alt: "POWERPLAY 桌面展示",
    },
  },
];
</script>

<style scoped lang="scss">
.hero-swiper-wrapper {
  position: relative;

  .hero-slide {
    // min-height: 400px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .slide-image {
      width: 100%;
      height: 100%;
      .image {
        display: block;
        width: 100%;
        height: 100vh;
        // max-height: 960px;
        object-fit: cover;
        object-position: bottom;
        @media (max-width: 550px) {
          object-position: 80% 100%;
        }
      }
    }
    .slide-content {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      top: clamp(24%, 50vw, 50%);
      transform: translateY(-50%);
      left: max(16px, 12%);
      right: max(16px, 12%);
      .slide-text {
        color: $color-gray-200;
      }
      @media (max-width: 550px) {
        align-items: center;
        .slide-title,
        .slide-text {
          text-align: center;
        }
      }
    }
  }
  .hero-btnControl {
    display: flex;
    justify-content: space-between;
    pointer-events: none;
    position: absolute;
    left: $padding-RWD;
    right: $padding-RWD;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s ease-out;
    .swiper-btn {
      pointer-events: auto;
      // color: var(--barnd);
      background: transparent;
      .icon {
        color: var(--brand);
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--action-primary);
          .icon {
            color: $color-white;
          }
        }
      }
    }
  }
  .home-hero-pagination {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    left: $padding-RWD;
    right: $padding-RWD;
    bottom: clamp(40px, 5vw, 10%);
    border-radius: 1px;
    // height: 6px;
    :deep(.swiper-pagination-bullet) {
      position: relative;
      width: clamp(60px, 10vw, 120px);
      background: $color-gray-300;
      border-radius: 0;
      &.swiper-pagination-bullet-active {
        background: $color-gray-300;
      }
      //進度條動畫
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        transform: scaleX(0);
        transform-origin: left;
      }
      &.progress::after {
        animation: bulletProgress 6000ms linear forwards;
        background: $color-purple-500;
      }
    }
    //進度條動畫
    @keyframes bulletProgress {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover .hero-btnControl {
      opacity: 1;
    }
  }
}
</style>
