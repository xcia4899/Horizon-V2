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
          :pagination="{ el: '.carousel-pagination', clickable: false }"
          :navigation="{
            nextEl: '.carousel-btnNext',
            prevEl: '.carousel-btnPrev',
          }"
          :breakpoints="{
            550: { slidesPerView: 2 },
            920: { slidesPerView: 3 },
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

        <div class="carousel-pagination"></div>
        <button type="button" class="carousel-btnPrev">Prev</button>
        <button type="button" class="carousel-btnNext">Next</button>
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
  // display: flex;
  // flex-direction: column;
  padding-block: 64px;

  .recommend-inner {
    // display: grid;
    // flex-direction: column;
    position: relative;
  }
  .recommend-intro {
    display: grid;
    place-content: center;
    padding: 48px;
  }
  .carousel {
    //Swiper 預設按鈕
    // width: 100%;
    .carousel-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      border: 2px solid var(--brand);
      padding: 8px;
      background-color: #333333;
      transition: transform 0.1s ease 0.2s;
      .card-media {
        aspect-ratio: 1 / 1;
        width: 100%;
        overflow: hidden;
        transition: transform 0.3s ease;
        // border: 2px solid #cecece;
        .image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .card-title {
        position: absolute;
        bottom: 16px;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover .card-media {
          transform: scale(1.1);
        }
      }
    }
    :deep(.swiper-slide) {
      height: auto;
    }
    :deep(.carousel-btnPrev),
    :deep(.carousel-btnNext) {
      color: rgb(12, 12, 12);
      background-color: #9c9c9c;
      // height: 40px;
      // width: 40px;
    }

    /* pagination 控制區 */
    :deep(.carousel-pagination) {
      margin-top: 16px;
      text-align: center;
    }
  }
}
</style>
