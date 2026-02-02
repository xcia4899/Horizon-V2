feature-content
<template>
  <div>
    <section class="home-hero">home-hero</section>
    <section class="home-feature">
      <div class="feature-inner container">
        <HomeFeature />
      </div>
    </section>

    <section class="home-recommend">
      <div class="container recommend-inner">
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
              <img
                class="image"
                src="/images/pic-detal/PRO-1001/10003.png"
                alt=""
              />
            </div>
            <h4 class="card-title">PRO-精密調整電競滑鼠</h4>
          </SwiperSlide>
        </Swiper>

        <div class="carousel-control">
          <div class="recommend-carousel-pagination"></div>
          <button type="button" class="recommend-carousel-btnPrev">Prev</button>
          <button type="button" class="recommend-carousel-btnNext">Next</button>
        </div>
      </div>
    </section>

    <section class="home-showcase">
      <div class="container showcase-inner">
        <HomeShowcase />
      </div>
    </section>
    <section class="home-promo">
      <HomePromo />
    </section>
    <section class="home-ad">
      <BannerPromoBanner />
    </section>
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
.container {
  @media (max-width: 550px) {
    padding-inline: 0px;
  }
}
//分類---------------
.home-feature {
  background-color: var(--bg-surface-strong);
  .feature-inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-block: 76px 64px;
    gap: clamp(32px, 5vw, 48px);
    @media (max-width: 550px) {
      padding-block: 64px 32px;
      // gap: 36px;
    }
  }
}
//最新消息---------------
.home-showcase {
  // width: 100%;
  color: var(--text-inverse);
  background: var(--bg-surface-contrast);
  .showcase-inner {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-block: 76px 64px;
    gap: 48px;
    @media (max-width: 550px) {
      padding-block: 64px 32px;
      gap: 36px;
    }
  }
}
//樣品廣告
.home-promo {
  display: flex;
  flex-direction: column;
  background: radial-gradient(var(--bg-surface), var(--bg-surface-strong));
}
//橫式宣傳圖----------
.home-ad {
  max-height: 400px;
  overflow: hidden;
}
.home-recommend {
  background: var(--bg-surface);
  .container {
    padding-inline: clamp(16px, 4vw, 32px);
  }
  .recommend-inner {
    position: relative;
  }
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
      border: 2px solid var(--border-default);
      border-radius: 12px;
      overflow: hidden;
      background: var(--bg-surface-card);
      transition: border-color 0.4s ease;
      .card-media {
        aspect-ratio: 1 / 1;
        width: 100%;
        overflow: hidden;
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
        width: 100%;
        bottom: 0px;
        padding: 8px;
        text-align: center;
        transition: color 0.3s ease-out 0.1s;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: var(--brand);
          transform: translateY(100%);
          transition: transform 0.3s ease-out 0.1s;
        }
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          border-color: var(--brand);
          .image {
            transform: scale(1.1);
          }
          .card-title {
            color: $color-white;
          }
          .card-title::after {
            transform: translateY(calc(0% + 1px));
          }
        }
      }
    }
  }
  .carousel-control {
    :deep(.recommend-carousel-btnPrev),
    :deep(.recommend-carousel-btnNext) {
      background-color: #615a5a;
    }
    /* pagination 控制區 */
    :deep(.recommend-carousel-pagination) {
      margin-top: 32px;
      display: flex;
      justify-content: center;
      .swiper-pagination-bullet {
        border: none;
        border-radius: 0;
        background: var(--bg-surface-contrast);
        margin: 0px;
        width: 120px;
        height: 8px;
        &.swiper-pagination-bullet-active {
          background: var(--action-primary);
        }
        &:hover:not(.swiper-pagination-bullet-active) {
          background: var(--action-primary-hover);
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
