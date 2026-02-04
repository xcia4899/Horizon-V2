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
    <SwiperSlide v-for="i in 6" :key="i" class="carousel-card">
      <div class="card-media">
        <img class="image" src="./images/pic-detal/PRO-1001/10003.png" alt="" />
      </div>
      <h4 class="card-title">PRO-精密調整電競滑鼠</h4>
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
    --title-height: 40px;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: var(--title-height);
      background: var(--inverse);
      transform: translateY(100%);
      transition: transform 0.3s ease-out 0.1s;
      z-index: 0;
    }
    .card-media {
      aspect-ratio: 1 / 1;
      width: 100%;
      overflow: hidden;
      padding: 16px;
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
      bottom: 0;
      width: 100%;
      height: var(--title-height);
      padding: 8px;
      text-align: center;
      line-height: calc(var(--title-height) - 16px);
      color: var(--text-primary);
      transition: color 0.3s ease-out 0.1s;
      z-index: 1;
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
        &::after {
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
:deep(.recommend-carousel-pagination) {
  // margin-top: 32px;
  display: flex;
  justify-content: center;
  padding-block: 48px 64px;
  .swiper-pagination-bullet {
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
