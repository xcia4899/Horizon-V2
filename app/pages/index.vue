feature-content
<template>
  <div>
    <section class="home-hero">home-hero</section>
    <section class="home-feature">
      <div class="feature-inner container">
        <div class="feature-intro">
          <h2>打造你的理想戰場</h2>
          <p>
            探索專屬於你的桌面配置，從精準操作到沉浸體驗，找到最適合你的裝備組合。無論是激戰時刻或日常創作，Horizon
            都為你準備好進化所需。
          </p>
        </div>
        <div class="feature-content">
          <div class="feature-actions">
            <button type="button" class="actions-item">專業級操作</button>
            <button type="button" class="actions-item">電競制霸</button>
            <button type="button" class="actions-item">提高您的生產力</button>
            <button type="button" class="actions-item">自在生活靈感</button>
          </div>
          <div class="feature-panel">
            <div class="panel-inner">
              <div class="panel-card">
                <div class="card-media">
                  <img src="/images/pictrue/row-second-item-01.jpg" alt="" />
                </div>
                <div class="card-content">
                  <h3 class="card-title">專為專業人士而設計。專為勝利而生。</h3>
                  <p class="card-desc">
                    要發揮最佳狀態，您需要最好的裝備。這些產品與世界上最好的職業玩家合作設計，提供性能和功能，讓您專注於重要的事情：勝利。
                  </p>
                </div>
              </div>
            </div>
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
  // color: $color-white;
  background-color: var(--bg-surface-strong);
  .feature-inner {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-block: 64px;
    gap: 48px;
  }
  .feature-intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
    max-width: 600px;
  }
  .feature-content {
    display: flex;
    flex-direction: column;
    .feature-actions {
      // width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // flex-direction: column;
      // flex-wrap: wrap;
      .actions-item {
        flex: 1;
        width: 100%;
        padding: 16px 16px;
        font-size: clamp(16px, 2vw, 20px);
        font-weight: 600;
        color: var(--text-secondary);
        border-bottom: 4px solid var(--border-default);
        // transition: all 0.3s ease;
        cursor: pointer;
        @media (hover: hover) and (pointer: fine) {
          &:not(.active):hover {
            border-color: var(--brand-hover);
          }
        }
        &:active,
        &.active {
          color: var(--brand-hover);
          border-color: var(--brand);
          // font-weight: 500;
        }
      }
    }

    .feature-panel {
      display: flex;
      flex-direction: column;
      padding-block: 32px;
      // overflow: hidden;
      .panel-inner {
        display: flex;
        // justify-content: flex-start;

        // transition: all 0.3s ease;
      }
      .panel-card {
        width: 100%;
        display: flex;
        align-items: center;
        gap: clamp(16px, 3vw, 32px);
        .card-media {
          flex: 0 0 55%;
          img {
            width: 100%;
            // height: 100%;
            object-fit: cover;
          }
        }
        .card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
      }
    }
  }
}
</style>
