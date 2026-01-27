<template>
  <div>
    <section class="home-hero">
    home-hero
    </section>
    <section class="home-feature">
      <div class="feature-content container">
        <div class="feature-content-01">
          <h2>打造你的理想戰場</h2>
          <p>
            探索專屬於你的桌面配置，從精準操作到沉浸體驗，找到最適合你的裝備組合。無論是激戰時刻或日常創作，Horizon
            都為你準備好進化所需。
          </p>
        </div>
        <div class="feature-content-02">
          <div class="item secnod-item-01">專業級操作</div>
          <div class="item secnod-item-02">電競制霸</div>
          <div class="item secnod-item-03">提高您的生產力</div>
          <div class="item secnod-item-04">自在生活靈感</div>
        </div>
        <div class="feature-content-03">
          <div class="sec-row-area">
            <div class="r3-col r3-col-01">
              <div>
                <img src="./images/pictrue/row-second-item-01.jpg" alt="" />
              </div>
              <div>
                <h3>專為專業人士而設計。專為勝利而生。</h3>
                <p>
                  要發揮最佳狀態，您需要最好的裝備。這些產品與世界上最好的職業玩家合作設計，提供性能和功能，讓您專注於重要的事情：勝利。
                </p>
              </div>
            </div>
            <!-- <div class="r3-col r3-col-02">
              <div>
                <img src="./images/pictrue/row-second-item-02.jpg" alt="" />
                
              </div>
              <div>
                <h3>專業競技，無懈可擊。</h3>
                <p>
                  想要主宰戰場，就需要頂尖的裝備。這些產品與菁英職業選手共同開發，融合極致效能與精準操控，讓你全神貫注，只為贏得勝利。
                </p>
              </div>
            </div>
            <div class="r3-col r3-col-03">
              <div>
                <img src="./images/pictrue/row-second-item-04.jpg" alt="" />
               
              </div>
              <div>
                <h3>提高您的生產力。</h3>
                <p>
                  用專為人體工學穩定性和支撐力所設計的工具，在長時間編寫程式碼的過程中保持舒適和專注。
                </p>
              </div>
            </div>
            <div class="r3-col r3-col-04">
              <div>
                <img src="./images/pictrue/row-second-item-03.webp" alt="" />
            
              </div>
              <div>
                <h3>生活，不必複雜。</h3>
                <p>
                  將設計融入日常，讓你在平凡中找到從容與靈感。自在，不是選擇，而是一種生活方式。
                </p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </section>
    <section class="home-products">home-products</section>
    <section class="home-categories">home-categories</section>
    <section class="home-promo">home-promo</section>
    <section class="home-brands">home-brands</section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
//--home-feature---------------
.home-feature {
  color: $color-white;
  background-color: $color-black;
  
}
.feature-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-block: 64px;
  gap: 48px;
  // padding-bottom:48px;
}
.feature-content-01 {
  text-align: center;
  max-width: 580px;
  padding-block: 64px;
  // margin-top: $row01-margin-top;
}
.feature-content-02 {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 64px;
  .item {
    width: 100%;
    text-align: center;
    padding: 16px 16px;
    white-space: nowrap;
    font-size: 20px;
    border-bottom: 4px solid $color-gray-500;
    // transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      border-color: var(--brand-hover);
    }
  }

  //按鈕CSS
  .item-color {
    color: var(--brand-hover);
    border-color: var(--brand-hover);
    // font-weight: 500;
  }
}

.feature-content-03 {
  // margin: 32px 0px;
  // background-color: #fff;
  padding-block: 64px;
  // overflow: hidden;

  .sec-row-area {
    display: flex;
    justify-content: flex-start;
    // width: 400%;
    left: 0%;
    // transition: all 0.3s ease;
  }

  .r3-col {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 3%;
  }
}
</style>
