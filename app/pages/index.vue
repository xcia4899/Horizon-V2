feature-content
<template>
  <div>
    <section class="home-hero">
      <div class="hero-inner">
        <Swiper
          class="hero-swiper-wrapper"
          :modules="[Autoplay, Pagination, Navigation]"
          :slides-per-view="1"
          :space-between="0"
          :loop="true"
          :autoplay="{ delay: 10000, disableOnInteraction: false }"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          :navigation="{
            nextEl: '.hero-swiper-btn-next',
            prevEl: '.hero-swiper-btn-prev',
          }"
        >
          <SwiperSlide v-for="i in 2" :key="i" class="hero-slide">
            <div class="slide-image">
              <img
                class="image"
                src="/images/bg/index-first-bg-01.jpg"
                alt=""
              />
            </div>
            <div class="slide-content">
              <h3 class="slide-title">始終電力十足。隨時待命。{{ i }}</h3>
              <p class="slide-text">認識 POWERPLAY 2。無限力量，化繁為簡。</p>
              <button class="btn slide-btn">立即購買</button>
            </div>
          </SwiperSlide>

          <div class="swiper-pagination"></div>
          <div class="hero-btnControl">
            <div class="swiper-btn hero-swiper-btn-prev">
              <Icon name="ep:arrow-left" class="icon" />
            </div>
            <div class="swiper-btn hero-swiper-btn-next">
              <Icon name="ep:arrow-right" class="icon" />
            </div>
          </div>
        </Swiper>
      </div>
    </section>

    <section class="home-feature">
      <div class="feature-inner container">
        <HomeFeature />
      </div>
    </section>
    <section class="home-recommend">
      <div class="container recommend-inner">
        <CommonRecommend />
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
import { Autoplay, Pagination, Navigation } from "swiper/modules";

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
.home-hero {
  .hero-inner {
  }
  .hero-swiper-wrapper {
    position: relative;
    .hero-slide {
      // min-height: 400px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .slide-image {
        width: 100%;
        .image {
          display: block;
          width: 100%;
          height: 100vh;
          // max-height: 960px;
          object-fit: cover;
          object-position: bottom;
        }
      }
      .slide-content {
        position: absolute;
      }
    }
    .hero-btnControl{
      display: flex;
      justify-content: space-between;
      pointer-events: none;
      position: absolute;
      left: 48px;
      right: 48px;
      top: 50%;
      z-index: 10;
      .swiper-btn{
        pointer-events: auto;
      }
    }
  }
}

//打造你的理想戰場---------------
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
//熱門推薦
.home-recommend {
  background: var(--bg-surface);
  .container {
    padding-inline: clamp(16px, 4vw, 32px);
  }
  .recommend-inner {
    position: relative;
  }
}
//進入 Horizon 啟動新視野---------------
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
</style>
