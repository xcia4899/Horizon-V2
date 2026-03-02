<!-- File: pages/about.vue -->
<template>
  <div class="about">
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <p class="kicker">About Horizon V2</p>
          <h1 class="title">關於我們</h1>
          <p class="subtitle">
            我們專注於電競周邊精選與更好的購物體驗：清楚的分類、好用的篩選、快速的導覽。
          </p>

          <div class="hero-actions">
            <NuxtLink class="btn primary" to="/products">前往商品</NuxtLink>
            <NuxtLink class="btn ghost" to="/contact">聯絡我們</NuxtLink>
          </div>

          <div class="hero-highlights" aria-label="quick highlights">
            <div class="chip">
              <span class="chip-dot"></span>
              <span>嚴選品牌</span>
            </div>
            <div class="chip">
              <span class="chip-dot"></span>
              <span>快速出貨</span>
            </div>
            <div class="chip">
              <span class="chip-dot"></span>
              <span>售後支援</span>
            </div>
          </div>
        </div>

        <div class="hero-card" aria-label="about summary card">
          <div class="card-head">
            <div class="logo">H</div>
            <div class="card-title">
              <div class="name">Horizon V2</div>
              <div class="tag">Gaming Gear Store</div>
            </div>
          </div>

          <ul class="card-list">
            <li>
              <strong>成立</strong>
              <span>{{ foundedYear }}</span>
            </li>
            <li>
              <strong>服務</strong>
              <span>鍵盤・滑鼠・耳機・螢幕・周邊</span>
            </li>
            <li>
              <strong>理念</strong>
              <span>把挑選變簡單，把體驗變更好</span>
            </li>
          </ul>

          <div class="card-foot">
            <div class="stat">
              <div class="stat-num">{{ stats.products }}+</div>
              <div class="stat-label">商品</div>
            </div>
            <div class="stat">
              <div class="stat-num">{{ stats.brands }}+</div>
              <div class="stat-label">品牌</div>
            </div>
            <div class="stat">
              <div class="stat-num">{{ stats.supportDays }}</div>
              <div class="stat-label">天支援</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section">
      <div class="container">
        <header class="section-head">
          <h2 class="section-title">我們的核心價值</h2>
          <p class="section-desc">
            用更好的資訊呈現與互動，讓使用者在最短時間找到最適合的裝備。
          </p>
        </header>

        <div class="grid values">
          <article v-for="item in values" :key="item.title" class="card">
            <div class="card-icon" aria-hidden="true">{{ item.icon }}</div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section alt">
      <div class="container">
        <header class="section-head">
          <h2 class="section-title">里程碑</h2>
          <p class="section-desc">把每一次迭代做到更貼近使用者。</p>
        </header>

        <ol class="timeline">
          <li>
            <div v-for="m in milestones" :key="m.title" class="timeline-item">
              <div class="dot" aria-hidden="true"></div>
              <div class="content">
                <div class="meta">
                  <span class="badge">{{ m.year }}</span>
                  <span class="meta-title">{{ m.title }}</span>
                </div>
                <p class="meta-desc">{{ m.desc }}</p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container">
        <header class="section-head">
          <h2 class="section-title">常見問題</h2>
          <p class="section-desc">先把你可能在意的整理好。</p>
        </header>

        <div class="faq">
          <details
            v-for="(f, idx) in faqs"
            :key="f.q"
            class="faq-item"
            :open="idx === 0"
          >
            <summary class="faq-q">
              <span>{{ f.q }}</span>
              <span class="chev" aria-hidden="true">▾</span>
            </summary>
            <div class="faq-a">
              <p>{{ f.a }}</p>
            </div>
          </details>
        </div>

        <div class="cta">
          <div class="cta-content">
            <h3 class="cta-title">需要協助挑選？</h3>
            <p class="cta-desc">
              把預算、用途、喜好告訴我們，我們會提供搭配建議。
            </p>
          </div>
          <div class="cta-actions">
            <NuxtLink class="btn primary" to="/contact">聯絡我們</NuxtLink>
            <NuxtLink class="btn ghost" to="/products">直接逛逛</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "關於我們 | Horizon V2",
  meta: [
    {
      name: "description",
      content:
        "Horizon V2 關於我們：電競周邊精選、清楚分類與篩選、快速導覽，讓你更快找到適合的裝備。",
    },
  ],
});

const foundedYear = "2026";

const stats = reactive({
  products: 300,
  brands: 20,
  supportDays: 7,
});

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
/* ========= tokens (fallback) ========= */
.about {
  --bg: var(--bg, #0b0d12);
  --surface: var(--bg-surface, rgba(255, 255, 255, 0.04));
  --surface-strong: var(--bg-surface-strong, rgba(255, 255, 255, 0.08));
  --text: var(--text, rgba(255, 255, 255, 0.92));
  --muted: var(--text-muted, rgba(255, 255, 255, 0.68));
  --brand: var(--brand, #8b5cf6);
  --brand-hover: var(--brand-hover, #a78bfa);
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 14px 40px rgba(0, 0, 0, 0.35);

  color: var(--text);
  background: var(--bg);
  min-height: 100vh;
}

/* ========= layout ========= */
.container {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.section {
  padding: clamp(36px, 5vw, 72px) 0;

  &.alt {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent);
    border-block: 1px solid var(--border);
  }
}

.section-head {
  margin-bottom: 18px;

  .section-title {
    font-size: clamp(22px, 2.4vw, 32px);
    letter-spacing: 0.2px;
  }

  .section-desc {
    color: var(--muted);
    margin-top: 8px;
    max-width: 72ch;
    line-height: 1.7;
  }
}

.grid {
  display: grid;
  gap: 14px;
}

/* ========= hero ========= */
.hero {
  position: relative;
  padding: clamp(44px, 6vw, 92px) 0;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
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

  .hero-inner {
    display: grid;
    gap: 16px;
    align-items: start;
    grid-template-columns: 1.3fr 0.9fr;

    @media (max-width: 960px) {
      grid-template-columns: 1fr;
    }
  }

  .kicker {
    display: inline-flex;
    padding: 6px 10px;
    border-radius: 999px;
    background: rgba(139, 92, 246, 0.12);
    border: 1px solid rgba(139, 92, 246, 0.25);
    color: rgba(255, 255, 255, 0.9);
    font-size: 12px;
    letter-spacing: 0.4px;
  }

  .title {
    margin-top: 12px;
    font-size: clamp(34px, 5vw, 56px);
    line-height: 1.05;
    letter-spacing: 0.2px;
  }

  .subtitle {
    margin-top: 12px;
    color: var(--muted);
    line-height: 1.8;
    max-width: 68ch;
  }

  .hero-actions {
    display: flex;
    gap: 10px;
    margin-top: 18px;
    flex-wrap: wrap;
  }

  .hero-highlights {
    margin-top: 18px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: rgba(255, 255, 255, 0.86);
    font-size: 13px;

    .chip-dot {
      width: 8px;
      height: 8px;
      border-radius: 99px;
      background: var(--brand);
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
    }
  }

  /* ========= hero card ========= */
  .hero-card {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 18px;
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);

    .card-head {
      display: flex;
      align-items: center;
      gap: 12px;

      .logo {
        width: 44px;
        height: 44px;
        border-radius: 14px;
        display: grid;
        place-items: center;
        background: rgba(139, 92, 246, 0.18);
        border: 1px solid rgba(139, 92, 246, 0.28);
        font-weight: 800;
        letter-spacing: 0.5px;
      }

      .card-title {
        .name {
          font-weight: 700;
          letter-spacing: 0.3px;
        }

        .tag {
          margin-top: 2px;
          font-size: 12px;
          color: var(--muted);
        }
      }
    }

    .card-list {
      list-style: none;
      padding: 0;
      margin: 14px 0 0;
      display: grid;
      gap: 10px;

      li {
        display: grid;
        grid-template-columns: 56px 1fr;
        gap: 12px;
        padding: 10px 12px;
        border-radius: 14px;
        background: var(--surface);
        border: 1px solid var(--border);

        strong {
          color: rgba(255, 255, 255, 0.86);
          font-size: 13px;
        }

        span {
          color: var(--muted);
          line-height: 1.6;
          font-size: 13px;
        }
      }
    }

    .card-foot {
      margin-top: 14px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;

      .stat {
        padding: 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border);

        .stat-num {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.2px;
        }

        .stat-label {
          margin-top: 2px;
          color: var(--muted);
          font-size: 12px;
        }
      }
    }
  }
}

/* ========= cards ========= */
.values {
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);

  .card-icon {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    font-size: 18px;
  }

  .card-title {
    margin-top: 10px;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .card-desc {
    margin-top: 8px;
    color: var(--muted);
    line-height: 1.8;
  }
}

/* ========= timeline ========= */
.timeline {
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;

  .timeline-item {
    display: grid;
    grid-template-columns: 16px 1fr;
    gap: 12px;
    align-items: start;

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 99px;
      background: var(--brand);
      margin-top: 10px;
      box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.14);
    }

    .content {
      padding: 14px 16px;
      border-radius: 16px;
      background: var(--surface);
      border: 1px solid var(--border);

      .meta {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;

        .badge {
          display: inline-flex;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(0, 0, 0, 0.16);
          color: rgba(255, 255, 255, 0.86);
          font-size: 12px;
        }

        .meta-title {
          font-weight: 700;
        }
      }

      .meta-desc {
        margin-top: 8px;
        color: var(--muted);
        line-height: 1.8;
      }
    }
  }
}

/* ========= faq ========= */
.faq {
  display: grid;
  gap: 10px;
  margin-top: 12px;

  .faq-item {
    border-radius: 16px;
    border: 1px solid var(--border);
    background: var(--surface);
    overflow: hidden;

    .faq-q {
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

      .chev {
        opacity: 0.8;
        transition: transform 0.25s ease;
      }
    }

    &[open] {
      .chev {
        transform: rotate(180deg);
      }
    }

    .faq-a {
      padding: 0 16px 14px 16px;
      color: var(--muted);
      line-height: 1.8;
    }
  }
}

/* ========= CTA ========= */
.cta {
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

  .cta-title {
    font-size: 18px;
    font-weight: 800;
  }

  .cta-desc {
    margin-top: 6px;
    color: var(--muted);
    line-height: 1.8;
  }

  .cta-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
}

/* ========= buttons ========= */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 14px;
  border: 1px solid var(--border);
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.04);
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease;

  &.primary {
    background: rgba(139, 92, 246, 0.9);
    border-color: rgba(139, 92, 246, 0.55);
    color: #0b0d12;
    font-weight: 800;
  }

  &.ghost {
    background: rgba(255, 255, 255, 0.03);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-1px);
      border-color: rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.06);
    }

    &.primary:hover {
      background: rgba(167, 139, 250, 0.92);
      border-color: rgba(167, 139, 250, 0.7);
    }
  }
}
</style>
