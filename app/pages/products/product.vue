<template>
  <div class="product">
    <main class="product-detailed">
      <section class="product-overview">
        <div class="container product-overview-inner">
          <div class="product-media">
            <div class="product-media-main">
              <img
                :src="`/images/pic-detal/MSI-1013/10001.png`"
                alt="商品大圖"
              />
            </div>
            <div class="product-media-thumbnails">
              <button
                v-for="(img, index) in 4"
                :key="index"
                class="thumbnails-btn"
              >
                <img
                  :src="`/images/pic-detal/MSI-1013/1000${index + 1}.png`"
                  alt="商品縮圖"
                />
              </button>
            </div>
          </div>

          <div class="product-information">
            <div class="information-title">
              <h3 class="product-title">product.name</h3>
              <p class="product-subtitle">product.subtitle</p>
            </div>
            <div class="information-color">
              <h4>顏色</h4>
              <span>product.color</span>
            </div>
            <div class="information-shipping">
              <h4>免費運送</h4>
            </div>
            <div class="information-text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                itaque, illum quas quaerat dolor sit non error ab voluptatum,
                corrupti optio, rem beatae doloremque dolores amet accusamus.
                Voluptate, velit qui!
              </p>
            </div>
            <div v-for="index in 4" :key="index" class="info-section">
              <h4 class="section-title">
                section.section detailedcontentopen {{ index }}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <!-- 加號（+） -->
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </h4>

              <div v-for="idx in 4" :key="idx" class="section-content">
                <div class="block-title">block.title</div>
                <ul class="block-list">
                  <li v-for="i in 4" :key="i">item</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="product-video">
        <div class="detailed-video">
          <!-- <iframe
              width="100%"
              height="auto"
              src="https://www.youtube.com/embed/vFZlgReIzOg"
              title="YouTube video player"
              frameborder="0"
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
              "
              allowfullscreen
            >
            </iframe> -->
        </div>
      </section>
      <section class="product-features">
        <div class="r3-1">
          <h2>下一代進化的冠軍滑鼠</h2>
        </div>
        <div class="r3-2">
          <p>
            受到冠軍的信任，憑藉我們的 HERO 2 感測器和閃電快速的 LIGHTFORCE
            開關的強大和精準度，您永遠不會錯過目標。專業級，準備好比賽，並以同級最佳表現為後盾。
          </p>
        </div>
        <div class="r3-3">
          <div class="r3-col r3-col-1">
            <div>
              <img src="" alt="" />
            </div>
            <h4>HERO 2 <br />感應器</h4>
            <p>最先進的遊戲感應器 <br />44K DPI, 888 IPS, 88</p>
          </div>
          <div class="r3-col r3-col-2">
            <div>
              <img src="" alt="" />
            </div>
            <h4>LIGHTSPEED <br />無線連接</h4>
            <p>冠軍信賴的錦標賽級技術</p>
          </div>
          <div class="r3-col r3-col-3">
            <div>
              <img src="" alt="" />
            </div>
            <h4>LIGHTFORCE <br />混合微動</h4>
            <p>光學精準 <br />機械觸感</p>
          </div>
        </div>
      </section>
    </main>
    <section class="recommend">
      <div class="container">
        <CommonRecommend />
      </div>
    </section>
    <section class="product-bottomBar">
      <div class="bottomBar-inner">
        <div class="bottomBar-info">
          <h3 class="bottomBar-brand">product.brand 系列</h3>
          <div class="bottomBar-price">
            <!-- 特價顯示（僅限有特價時） -->
            <div class="discount">特價 $product.price.toLocaleString()</div>
            <!-- 原價，若有特價則加上刪除線 -->
            <div v-if="false" class="price">
              NT$ product.originalPrice.toLocaleString()
            </div>
          </div>
        </div>
        <div class="bottomBar-actions">
          <button class="btn bottomBar-btn">加入購物車</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">


.product-detailed {
  // height: 100vh;
  margin-top: 70px;
  width: 100%;
  border: 1px solid red;
  background-color: var(--bg-surface);
  .product-overview {
    padding-block: 32px;
    .product-overview-inner {
      display: flex;
      align-items: center;
      gap: 32px;
      height: calc(100vh - 160px);
      // overflow: hidden;
      border: 1px solid;
    }
    .product-media {
      flex: 0 0 60%;
      // width: 70%;
      height: 100%;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      gap: 32px;

      .product-media-main {
        flex: 0 0 50%;
        display: flex;
        justify-content: center;
        img {
          max-height: 480px;
          max-width: 720px;

          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .product-media-thumbnails {
        display: flex;
        justify-content: center;
        gap: 24px;

        .thumbnails-btn {
          display: flex;
          height: clamp(60px, 8vw, 80px);
          aspect-ratio: 6/4;
          padding: 4px;
          border: 2px solid var(--border-default);
          border-radius: 4px;
          // overflow: hidden;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &:focus {
            border-color: var(--brand); // 或其他高亮效果
          }
        }
      }
    }
    .product-information {
      flex: 1;
      display: flex;
      flex-direction: column;

      height: 100%;
      min-width: 300px;

      gap: 16px;
      overflow: auto;
      scrollbar-width: none; //隱藏滾輪

      .info-section {
        background-color: var(--bg-surface-strong);
        border-radius: 4px;
        // border-bottom: 1px dashed lighten($color-darkgery, 20%);
        padding: 4px 4px;
        margin: 8px 0;
        // border: 1px solid rgb(163, 126, 58);
        .section-title {
          padding: 4px 0;
          cursor: pointer;
          &:hover {
            color: var(--brand);
          }
        }

        .section-content {
          max-height: 1400px;
          overflow: hidden;

          // padding: 8px 4px;
          // background-color: $color-white;
          border-radius: 8px;

          .block-title {
            font-weight: bolder;
            padding: 4px 4px;
            cursor: default;
          }

          .block-list {
            padding: 0px 4px 8px;
            font-weight: normal;
            margin-top: 1px;

            li:hover {
              color: var(--brand);
              cursor: default;
            }
          }
        }

        .section-content.content-open {
          max-height: 1400px;
        }
      }
    }
  }

  .product-video {
    // background-color: #000;
    padding: 32px;

    .detailed-video {
      position: relative;
      padding-bottom: 56.25%; // 16:9 的比例（9 ÷ 16 = 0.5625）
      height: 0;
      // overflow: hidden;
      width: 90vw;
      height: 80vh;
      margin: 0 auto;
      padding: 32px;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
      }
    }
  }

  .product-features {
    padding: 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--bg-surface-soft);
    .r3-1,
    .r3-2,
    .r3-3 {
      padding: 32px;
      width: 80%;
      text-align: center;
    }

    .r3-2 {
      p {
        margin: 0;
        font-size: 20px;
      }
    }

    .r3-3 {
      // width: 60%;
      display: flex;
      justify-content: space-around;
      gap: 24px;

      .r3-col {
        display: flex;
        flex-direction: column;
        width: 200px;
        gap: 16px;

        div {
          min-height: 200px;
          display: flex;
          align-items: center;
        }

        img {
          width: 100%;
          object-fit: cover;
        }

        p {
          margin: 0;
        }
      }
    }
  }
}
.recommend {
  background: var(--bg-surface-strong);
}
.product-bottomBar {
  position: fixed;
  bottom: 0px;
  background-color: rgba(var(--bg-header), 0.8);
  backdrop-filter: blur(8px);

  // color: $color-darkgery;
  width: 100%;
  z-index: 100;
  box-shadow: 0px 0px 6px 1px rgba(196, 196, 196, 0.4);
  .bottomBar-inner {
    position: relative;
    max-width: 1440px;
    margin: 0 auto;
    padding-inline: $padding-RWD;
    height: $headerHeight;

    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 16px;
  }
  .bottomBar-info {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .bottomBar-price {
      font-size: clamp(20px, 3vw, 28px);
      font-weight: 900;

      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-direction: row-reverse;
      gap: 8px;
    }
    .discount {
      color: var(--state-danger);
      font-weight: bolder;
    }
    .strike {
      text-decoration: line-through;
      color: var(--text--tertiary);
      opacity: 0.8;
      font-size: clamp(16px, 3vw, 20px);
    }
  }

  .bottomBar-actions {
    .bottomBar-btn {
      width: 200px;
      font-size: clamp(16px, 2vw, 20px);
      font-weight: 600;
    }
  }
}
</style>
