<template>
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
      v-for="item in recommendList"
      :key="item.id"
      class="carousel-card"
    >
      <div class="card-media">
        <img class="image" :src="item.image.src" :alt="item.image.alt" />
      </div>
      <h4 class="card-title">{{ item.title }}</h4>
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
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const recommendList = [
  {
    id: 1,
    title: "PRO 輕量滑鼠",
    image: {
      src: "./images/pic-detal/PRO-1001/10003.png",
      alt: "PRO 輕量滑鼠",
    },
  },
  {
    id: 2,
    title: "PRO X TKL ",
    image: {
      src: "./images/pic-detal/PRO-1002/10003.png",
      alt: "PRO X TKL ",
    },
  },
  {
    id: 3,
    title: "Razer V3 Mini",
    image: {
      src: "./images/pic-detal/Razer-1011/10002.png",
      alt: "Razer V3 Mini",
    },
  },
  {
    id: 4,
    title: "GM08 電競滑鼠",
    image: {
      src: "./images/pic-detal/MSI-1008/10003.png",
      alt: "GM08 電競滑鼠",
    },
  },
  {
    id: 5,
    title: "G522 無線耳機",
    image: {
      src: "./images/pic-detal/PRO-1007/10001.png",
      alt: "G522 無線耳機",
    },
  },
  {
    id: 6,
    title: "GH50 電競耳機",
    image: {
      src: "./images/pic-detal/MSI-1003/10002.png",
      alt: "GH50 電競耳機",
    },
  },
];
</script>

<style scoped lang="scss">
.recommend-intro {
  display: grid;
  place-content: center;
  padding: 32px;
}
.carousel {
  //Swiper 預設按鈕
  // width: 100%;
  :deep(.swiper-slide) {
    height: auto;
  }
  .carousel-card {
    position: relative;
    border: 3px solid var(--border-default);
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg-surface-card);
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
        background: var(--bg-surface-soft);
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
      // background: var(--bg-surface-soft);
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
  // margin-top: 32px;
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
//翻頁控制器
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
</style>
