<template>
  <div class="product-detailed">
    <section class="detailed">
      <div class="container">
        <div class="detailed-row1 bottomBar-inner">
          <section class="information">
            <div>
              <h3>product.name</h3>
              <p>product.subtitle</p>
            </div>
            <div>
              <h4>顏色</h4>
              <span>product.color</span>
            </div>
            <div>
              <h4>免費運送</h4>
            </div>
            <div>
              <p>product.description</p>
            </div>
            <div>
              <div class="detail-section">
                <h4 class="detailed-title">
                  section.section detailedcontentopen
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
                <div class="detailed-content">
                  <div v-for="(block, idx) in 3" :key="idx" class="block">
                    <div class="block-title">block.title</div>
                    <ul class="block-list">
                      <li v-for="(item, i) in 2" :key="i">item</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="product-area">
            <div class="product-main-img">
              <img src="" alt="" />
            </div>
            <div class="thumbnails">
              <button v-for="(img, index) in 3" :key="index">
                <img src="" alt="商品縮圖" />
              </button>
            </div>
          </section>
        </div>
        <div class="detailed-row2">
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
        </div>
        <div class="detailed-row3 bottomBar-inner">
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
        </div>
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
  top: 70px;
}

.detailed {
  // height: 100vh;
  width: 100%;
  // background-color: $color-lightgrey;
  * {
    border: 1px solid;
  }
  .detailed-row1 {
    // top: 70px;
    padding-top: 32px;
    padding-bottom: 64px;

    display: flex;
    justify-content: flex-start;
    flex-direction: row-reverse;
    align-items: center;
    gap: 32px;
    height: calc(100vh - 70px);
    // height: 100vh ;

    .information {
      height: 100%;
      width: 40%;
      min-width: 300px;
      padding: 32px 0px 32px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;
      // overflow-x: hidden;
      scrollbar-width: none; //隱藏滾輪
      // color: $color-darkgery;

      h4 {
        font-weight: 900;
      }

      p {
        margin: 0;
      }

      div {
        width: 100%;
      }

      ul {
        margin: 0;
      }

      .detail-section {
        // background-color: $color-middlekgery;
        // color: $color-darkgery;
        border-radius: 4px;
        // border-bottom: 1px dashed lighten($color-darkgery, 20%);
        padding: 4px 4px;
        margin: 8px 0;

        .detailed-title {
          display: flex;
          align-items: center;
          padding: 4px 0;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            // color: $color-purple;
            // background-color: #fff;
            // letter-spacing: 3px;
          }

          svg {
            position: absolute;
            right: 0;
          }
        }

        .detailed-content {
          max-height: 0px;
          // overflow: hidden;
          transition: all 0.4s ease;
          // padding: 8px 4px;
          // background-color: $color-white;
          border-radius: 8px;

          .block {
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
                // color: $color-purple;
                cursor: default;
              }
            }
          }
        }

        .detailed-content.content-open {
          max-height: 1400px;
        }
      }
    }

    .product-area {
      // height: calc(100vh - 700px);
      width: 70%;
      padding: 32px 16px 64px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 32px;

      .product-main-img {
        padding: 8px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          max-height: 480px;
          max-width: 100%;
          min-width: 300px;
          width: auto;
          height: auto;
          object-fit: contain;
        }
      }

      .thumbnails {
        display: flex;
        justify-content: center;
        gap: 32px;

        button {
          // flex:1;
          max-height: 100px;
          // aspect-ratio: 1/1;
          padding: 4px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          // border: 2px solid lighten($color-darkgery, 20%);
          border-radius: 4px;
          // overflow: hidden;
          cursor: pointer;

          &:focus {
            // border-color: $color-purple; // 或其他高亮效果
          }
        }

        img {
          object-fit: cover;
          width: 100%;
          max-width: 120px;

          // height: 100%;
        }
      }
    }
  }

  .detailed-row2 {
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

  .detailed-row3 {
    padding: 32px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;

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
.product-bottomBar {
  position: fixed;
  bottom: 0px;
  background-color: rgba(var(--bg-header), 0.8);
  backdrop-filter: blur(8px);

  // color: $color-darkgery;
  width: 100%;
  z-index: 100;
  // box-shadow: 0px 0px 6px 1px rgba(22, 22, 22, 0.4);
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
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 1px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-direction: row-reverse;
      gap: 8px;
    }

    .strike {
      text-decoration: line-through;
      // color: #999;
      opacity: 0.8;
      font-size: 20px;
    }
  }

  .bottomBar-actions {
    .bottomBar-btn {
      width: 200px;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
