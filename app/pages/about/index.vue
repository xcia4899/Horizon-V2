<!-- File: pages/about.vue -->
<template>
  <div class="about">
    <!-- Hero -->
    <section class="about-hero">
      <div class="container about-hero-inner">
        <div class="about-hero-content">
          <p class="about-hero-kicker">About Horizon V2</p>
          <h1 class="about-hero-title">關於我們</h1>
          <p class="about-hero-subtitle">
            我們專注於電競周邊精選與更好的購物體驗：清楚的分類、好用的篩選、快速的導覽。
          </p>

          <div class="about-hero-actions">
            <NuxtLink class="btn" to="/products">前往商品</NuxtLink>
            <NuxtLink class="btn">聯絡我們</NuxtLink>
          </div>

          <div class="about-hero-highlights" aria-label="quick highlights">
            <div class="about-hero-chip">
              <span class="chip-dot"></span>
              <span>嚴選品牌</span>
            </div>
            <div class="about-hero-chip">
              <span class="chip-dot"></span>
              <span>快速出貨</span>
            </div>
            <div class="about-hero-chip">
              <span class="chip-dot"></span>
              <span>售後支援</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="about-values">
      <div class="container">
        <header class="about-values-head">
          <h2 class="about-values-title">我們的核心價值</h2>
          <p class="about-values-desc">
            用更好的資訊呈現與互動，讓使用者在最短時間找到最適合的裝備。
          </p>
        </header>

        <div class="about-values-grid">
          <article
            v-for="item in values"
            :key="item.title"
            class="about-values-card"
          >
            <div class="about-values-card-icon" aria-hidden="true">
              {{ item.icon }}
            </div>
            <h3 class="about-values-card-title">{{ item.title }}</h3>
            <p class="about-values-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="about-timeline">
      <div class="container">
        <header class="about-timeline-head">
          <h2 class="about-timeline-title">里程碑</h2>
          <p class="about-timeline-desc">把每一次迭代做到更貼近使用者。</p>
        </header>

        <ol class="about-timeline-list">
          <li
            v-for="m in milestones"
            :key="m.title"
            class="about-timeline-item"
          >
            <div class="chip-dot" aria-hidden="true"></div>

            <div class="about-timeline-content">
              <div class="about-timeline-meta">
                <span class="about-timeline-badge">{{ m.year }}</span>
                <span class="about-timeline-meta-title">{{ m.title }}</span>
              </div>
              <p class="about-timeline-meta-desc">{{ m.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Support: FAQ + CTA -->
    <section class="about-support">
      <div class="container">
        <header class="about-support-head">
          <h2 class="about-support-title">常見問題</h2>
          <p class="about-support-desc">先把你可能在意的整理好。</p>
        </header>

        <div class="about-faq">
          <details
            v-for="(f, idx) in faqs"
            :key="f.q"
            class="about-faq-item"
            :open="idx === 0"
          >
            <summary class="about-faq-q">
              <span>{{ f.q }}</span>
              <span class="about-faq-chev" aria-hidden="true">▾</span>
            </summary>
            <div class="about-faq-a">
              <p>{{ f.a }}</p>
            </div>
          </details>
        </div>

        <div class="about-cta">
          <div class="about-cta-content">
            <h3 class="about-cta-title">需要協助挑選？</h3>
            <p class="about-cta-desc">
              把預算、用途、喜好告訴我們，我們會提供搭配建議。
            </p>
          </div>
          <div class="about-cta-actions">
            <NuxtLink class="btn" to="/">聯絡我們</NuxtLink>
            <NuxtLink class="btn" to="/products">直接逛逛</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// useHead({
//   title: "關於我們 | Horizon V2",
//   meta: [
//     {
//       name: "description",
//       content:
//         "Horizon V2 關於我們：電競周邊精選、清楚分類與篩選、快速導覽，讓你更快找到適合的裝備。",
//     },
//   ],
// });

const values = [
  {
    icon: "⚡",
    title: "效率",
    desc: "更快找到商品：分類、搜尋與篩選設計以「少走一步」為目標。",
  },
  {
    icon: "🧩",
    title: "清楚",
    desc: "規格與特色整理成易讀資訊，降低比較成本，提升決策信心。",
  },
  {
    icon: "🛡️",
    title: "可靠",
    desc: "出貨與售後流程透明，遇到問題可快速協助處理。",
  },
  {
    icon: "🎛️",
    title: "可用性",
    desc: "重視 RWD 與操作手感，讓桌機與手機都有一致的體驗。",
  },
] as const;

const milestones = [
  {
    year: "2025",
    title: "專案起步",
    desc: "從資料結構與 UI 系統開始，建立可擴充的產品模型。",
  },
  {
    year: "2026",
    title: "Horizon V2 上線",
    desc: "完成主要商品頁、篩選、分頁與詳細頁的體驗。",
  },
  {
    year: "Next",
    title: "會員與後台",
    desc: "規劃加入登入、訂單管理與內容維護流程。",
  },
] as const;

const faqs = [
  {
    q: "你們的商品來源是什麼？",
    a: "以品牌原廠與授權經銷合作為主，並保留完整的規格與保固資訊。",
  },
  {
    q: "可以退換貨嗎？",
    a: "可依購買條款申請退換貨；若有瑕疵或運送問題，優先協助處理。",
  },
  {
    q: "如何挑選適合的電競周邊？",
    a: "先確認用途（FPS/MMO/日常）、預算、手感偏好與桌面空間，再用篩選縮小範圍。",
  },
] as const;
</script>

<style scoped lang="scss">
.about {
  --shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
}
/* ========= layout ========= */
.container {
  width: min(1024px, calc(100% - 32px));
  margin: 0 auto;
}
.chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 99px;
  background: transparent;
  box-shadow: 0 0 0 4px rgba($color-purple-500, 0.6);
}
/* ========= Hero ========= */
.about-hero {
  position: relative;
  padding: clamp(44px, 6vw, 92px) 0;
  overflow: hidden;
  border-bottom: 1px solid var(--border-default);
  background:
    radial-gradient(
      900px 480px at 20% 10%,
      rgba(139, 92, 246, 0.22),
      transparent 60%
    ),
    radial-gradient(
      720px 420px at 90% 0%,
      rgba(59, 130, 246, 0.12),
      transparent 55%
    ),
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 45%);

  .about-hero-inner {
    display: grid;
    gap: 16px;
    align-items: start;
    grid-template-columns: 1.3fr 0.9fr;

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
    }
  }

  .about-hero-kicker {
    display: inline-flex;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(139, 92, 246, 0.12);
    border: 1px solid rgba(139, 92, 246, 0.25);
    color: rgba(255, 255, 255, 0.9);
    font-size: 12px;
    letter-spacing: 0.4px;
  }

  .about-hero-title {
    margin-top: 12px;
    font-size: clamp(34px, 5vw, 56px);
    line-height: 1.05;
    letter-spacing: 0.2px;
  }

  .about-hero-subtitle {
    margin-top: 12px;
    color: var(--text-secondary);
    line-height: 1.8;
    max-width: 68ch;
  }

  .about-hero-actions {
    display: flex;
    gap: 10px;
    margin-top: 18px;
    flex-wrap: wrap;
  }

  .about-hero-highlights {
    margin-top: 18px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .about-hero-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 999px;
    background: var(--bg-surface);
    border: 1px solid var(--border-default);
    color: rgba(255, 255, 255, 0.86);
    font-size: 13px;
  }
}

/* ========= Values ========= */
.about-values {
  padding: clamp(36px, 5vw, 72px) 0;

  .about-values-head {
    margin-bottom: 18px;

    .about-values-title {
      font-size: clamp(22px, 2.4vw, 32px);
      letter-spacing: 0.2px;
    }

    .about-values-desc {
      color: var(--text-secondary);
      margin-top: 8px;
      max-width: 72ch;
      line-height: 1.7;
    }
  }

  .about-values-grid {
    display: grid;
    gap: 14px;
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 980px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 520px) {
      grid-template-columns: 1fr;
    }

    .about-values-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-default);
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);

      .about-values-card-icon {
        width: 40px;
        height: 40px;
        border-radius: 14px;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-default);
        font-size: 18px;
      }

      .about-values-card-title {
        margin-top: 10px;
        font-weight: 700;
        letter-spacing: 0.2px;
      }

      .about-values-card-desc {
        margin-top: 8px;
        color: var(--text-secondary);
        line-height: 1.8;
      }
    }
  }
}

/* ========= Timeline ========= */
.about-timeline {
  padding: clamp(36px, 5vw, 72px) 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent);
  border-block: 1px solid var(--border-default);

  .about-timeline-head {
    margin-bottom: 18px;

    .about-timeline-title {
      font-size: clamp(22px, 2.4vw, 32px);
      letter-spacing: 0.2px;
    }

    .about-timeline-desc {
      color: var(--text-secondary);
      margin-top: 8px;
      max-width: 72ch;
      line-height: 1.7;
    }
  }

  .about-timeline-list {
    margin: 14px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 12px;

    .about-timeline-item {
      display: grid;
      grid-template-columns: 16px 1fr;
      gap: 12px;
      align-items: start;

      .about-timeline-content {
        padding: 14px 16px;
        border-radius: 16px;
        background: var(--bg-surface);
        border: 1px solid var(--border-default);

        .about-timeline-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;

          .about-timeline-badge {
            display: inline-flex;
            padding: 6px 10px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(0, 0, 0, 0.16);
            color: rgba(255, 255, 255, 0.86);
            font-size: 12px;
          }

          .about-timeline-meta-title {
            font-weight: 700;
          }
        }

        .about-timeline-meta-desc {
          margin-top: 8px;
          color: var(--text-secondary);
          line-height: 1.8;
        }
      }
    }
  }
}

/* ========= Support (FAQ + CTA) ========= */
.about-support {
  padding: clamp(36px, 5vw, 72px) 0;

  .about-support-head {
    margin-bottom: 18px;

    .about-support-title {
      font-size: clamp(22px, 2.4vw, 32px);
      letter-spacing: 0.2px;
    }

    .about-support-desc {
      color: var(--text-secondary);
      margin-top: 8px;
      max-width: 72ch;
      line-height: 1.7;
    }
  }

  /* FAQ */
  .about-faq {
    display: grid;
    gap: 10px;
    margin-top: 12px;

    .about-faq-item {
      border-radius: 16px;
      border: 1px solid var(--border-default);
      background: var(--bg-surface);
      overflow: hidden;

      .about-faq-q {
        cursor: pointer;
        list-style: none;
        padding: 14px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        user-select: none;

        &::-webkit-details-marker {
          display: none;
        }
      }

      .about-faq-chev {
        opacity: 0.8;
        transition: transform 0.25s ease;
      }

      &[open] {
        .about-faq-chev {
          transform: rotate(180deg);
        }
      }

      .about-faq-a {
        padding: 0 16px 14px 16px;
        color: var(--text-secondary);
        line-height: 1.8;
      }
    }
  }

  /* CTA */
  .about-cta {
    margin-top: 18px;
    padding: 16px;
    border-radius: 18px;
    border: 1px solid rgba(139, 92, 246, 0.26);
    background:
      radial-gradient(
        700px 260px at 20% 0%,
        rgba(139, 92, 246, 0.18),
        transparent 60%
      ),
      rgba(255, 255, 255, 0.03);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;

    .about-cta-title {
      font-size: 18px;
      font-weight: 800;
    }

    .about-cta-desc {
      margin-top: 6px;
      color: var(--text-secondary);
      line-height: 1.8;
    }

    .about-cta-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
  }
}
</style>
