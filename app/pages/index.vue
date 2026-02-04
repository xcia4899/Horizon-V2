feature-content
<template>
  <div>
    <section class="home-hero">
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide first-row">
            <img src="./images/bg/index-first-bg-01.jpg" alt="" />
            <div class="content-area frow-col frow-col-01">
              <h3>始終電力十足。隨時待命。</h3>
              <p>認識 POWERPLAY 2。無限力量，化繁為簡。</p>
              <button class="btn first-btn-style">立即購買</button>
            </div>
          </div>
        </div>

        <div class="swiper-btn content-area swiper-button-next"></div>
        <div class="swiper-btn content-area swiper-button-prev"></div>
        <div class="swiper-pagination frow-pagination"></div>
      </div>
      <Swiper
        :modules="[Autoplay, Pagination, Navigation]"
        :slides-per-view="1"
        :space-between="0"
        :loop="true"
        :autoplay="{ delay: 6000, disableOnInteraction: false }"
        :pagination="{ el: '.swiper-pagination', clickable: true }"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
      >
        <SwiperSlide v-for="i in 5" :key="i">
          <div class="slide">Slide {{ i }}</div>
        </SwiperSlide>

        <!-- 這些 element 依舊要存在，給 Swiper 綁定 -->
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </Swiper>
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
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100vh;
    // max-height: 960px;
    object-fit: cover;
    object-position: bottom;
  }

  .swiper-btn {
    margin: 0 32px;
  }

  &:hover .swiper-btn {
    opacity: 1 !important;
  }

  .swiper-pagination {
    position: absolute;
    text-align: left;
    margin-left: 5%;
    bottom: 80px !important;
  }

  .swiper-pagination-bullet {
    border-radius: 1px;

    width: 120px;
    height: 6px;
    margin: 0 4px !important;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;

      transition: none;
      transform-origin: left;
    }

    &.progress::after {
      transition: width 6s linear;
      width: 100%;
    }
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
  }
}

.first-row {
  .frow-col {
    position: absolute;
    flex-grow: 0.6;

    padding: 0px 32px;
    bottom: 40%;
    left: 10vw;

    .first-btn-style {
      margin-top: 32px;
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
