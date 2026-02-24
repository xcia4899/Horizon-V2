<template>
  <div>
    <section>
      <section class="add-cart-area">
        <div class="add-content content-area">
          <div class="nav-left">
            <h3>product.brand 系列</h3>
            <div class="price">
              <!-- 特價顯示（僅限有特價時） -->
              <div class="redcharacter">
                特價 $product.price.toLocaleString()
              </div>
              <!-- 原價，若有特價則加上刪除線 -->
              <div>NT$ product.originalPrice.toLocaleString()</div>
            </div>
          </div>
          <div class="nav-right">
            <button class="btn ">加入購物車</button>
          </div>
        </div>
      </section>
      <section class="detailed">
        <div class="detailed-row1 content-area">
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
                      <li v-for="(item, i) in 2" :key="i">
                         item 
                      </li>
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
        <div class="detailed-row3 content-area">
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
      </section>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
