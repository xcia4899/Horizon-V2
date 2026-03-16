<template>
  <main class="page-activity">
    <!-- hero -->
    <section class="activity-hero">
      <div class="container activity-hero-inner">
        <p class="hero-kicer">Horizon Events</p>
        <h1 class="hero-title">Horizon 活動一覽</h1>
        <p class="hero-desc">
          精選檔期、品牌週、限時優惠與新品活動。你可以用標籤快速篩選。
        </p>
      </div>
    </section>

    <!-- activity-toolbar -->
    <section class="activity-toolbar">
      <div class="container activity-toolbar-inner">
        <div class="toolbar-filters">
          <h4>標籤</h4>
          <div class="filter-group">
            <div class="chips">
              <button
                class="chip"
                type="button"
                :class="{ active: activeTag === '全部' }"
                @click="activeTag = '全部'"
              >
                全部
              </button>
              <button
                v-for="tag in allTags"
                :key="tag"
                type="button"
                class="chip"
                :class="{ active: activeTag === tag }"
                @click="activeTag = tag"
              >
                {{ tag }}
              </button>
            </div>
          </div>
          <div class="filter-group">
            <select v-model="activeMonth" class="select">
              <option value="all">月份</option>
              <option v-for="m in monthOptions" :key="m.value" :value="m.value">
                {{ m.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="toolbar-meta">
          <span class="count">共 {{ filteredEvents.length }} 筆</span>
          <button class="toolbar-meta-btn" type="button" @click="resetFilters">
            清除篩選
          </button>
        </div>
      </div>
    </section>

    <!-- list -->
    <section class="activity-content">
      <div class="container">
        <!-- empty -->
        <div v-if="filteredEvents.length === 0" class="empty">
          <h3 class="empty-title">找不到符合條件的活動</h3>
          <p class="empty-desc">試試看切換標籤或月份，或直接清除篩選。</p>
          <button class="btn" type="button" @click="resetFilters">
            清除篩選
          </button>
        </div>

        <!-- grid -->
        <div v-else class="activity-content-grid">
          <article
            v-for="item in filteredEvents"
            :key="item.id"
            class="activity-card"
            :class="{ featured: item.featured }"
          >
            <NuxtLink class="card-media" :to="item.to || '#'">
              <img
                class="img"
                :src="item.image"
                :alt="item.title"
                loading="lazy"
              />
              <div v-if="item.badge" class="badge">{{ item.badge }}</div>
            </NuxtLink>

            <div class="activity-card-content">
              <header class="content-header">
                <h4 class="card-title">
                  <NuxtLink class="title-link" :to="item.to || '#'">
                    {{ item.title }}
                  </NuxtLink>
                </h4>
                <p class="card-desc">{{ item.description }}</p>
              </header>

              <footer class="content-footer">
                <div class="meta-tags">
                  <span class="date">{{ item.dateRange }}</span>
                  <div class="tags">
                    <span v-for="tag in item.tags" :key="tag" class="tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="card-btns">
                  <NuxtLink class="btn" :to="item.to || '#'">
                    查看活動
                  </NuxtLink>
                  <button
                    class="btn"
                    type="button"
                    @click="copyTitle(item.title)"
                  >
                    複製標題
                  </button>
                </div>
              </footer>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
type EventItem = {
  id: string;
  title: string;
  description: string;
  dateRange: string; // 顯示用
  start: string; // YYYY-MM-DD (篩選用)
  image: string;
  tags: string[];
  badge?: string;
  featured?: boolean;
  to?: string;
};

// const isLoading = ref(false);

// 假資料：你之後要接 API / seed 也很容易換掉
const events = ref<EventItem[]>([
  {
    id: "event-2026-spring",
    title: "春季限時特惠｜全館最高 8 折",
    description: "鍵盤、滑鼠、耳機與螢幕周邊精選折扣，會員再享加碼券。",
    dateRange: "2026/03/01 - 2026/03/14",
    start: "2026-03-01",
    image: "/images/pic-active/10004.jpg",
    tags: ["限時", "全館"],
    badge: "HOT",
    featured: true,
    to: "/products?keyword=特惠",
  },
  {
    id: "event-razer-week",
    title: "Razer 品牌週",
    description: "指定系列滿額送，熱門品項限量補貨。",
    dateRange: "2026/03/10 - 2026/03/20",
    start: "2026-03-10",
    image: "/images/pic-active/10005.jpg",
    tags: ["品牌週", "Razer"],
    to: "/products?keyword=Razer",
  },
  {
    id: "event-Logitech-week",
    title: "Logitech 品牌週",
    description: "指定系列滿額送，熱門品項限量補貨。",
    dateRange: "2026/03/10 - 2026/03/20",
    start: "2026-03-10",
    image: "/images/pic-active/10001.jpg",
    tags: ["品牌週", "Logitech"],
    to: "/products?keyword=Logitech",
  },
  {
    id: "event-new-arrivals",
    title: "新品上架｜滑鼠墊與鍵帽專區",
    description: "整理桌面風格，從細節開始。多款材質與配色上架。",
    dateRange: "2026/02/20 - 2026/03/31",
    start: "2026-02-20",
    image: "/images/pic-active/10002.jpg",
    tags: ["新品", "配件"],
    to: "/products?keyword=新品",
  },
  {
    id: "event-new-arrivals",
    title: "新品上架｜滑鼠墊與鍵帽專區",
    description: "整理桌面風格，從細節開始。多款材質與配色上架。",
    dateRange: "2026/02/20 - 2026/03/31",
    start: "2026-02-20",
    image: "/images/pic-active/10003.jpg",
    tags: ["新品", "配件"],
    to: "/products?keyword=新品",
  },
]);

// 篩選狀態
const activeTag = ref<string>("全部");
const activeMonth = ref<string>("all");

// tags options
const allTags = computed(() => {
  const set = new Set<string>();
  for (const e of events.value) e.tags.forEach((t) => set.add(t));
  return Array.from(set);
});

// month options
const monthOptions = computed(() => {
  const set = new Set<string>();
  for (const e of events.value) set.add(e.start.slice(0, 7)); // YYYY-MM
  return Array.from(set)
    .sort()
    .map((ym) => ({
      value: ym,
      label: `${ym.slice(0, 4)} / ${ym.slice(5, 7)}`,
    }));
});

const filteredEvents = computed(() => {
  const tagOk = (e: EventItem) =>
    activeTag.value === "全部" || e.tags.includes(activeTag.value);
  const monthOk = (e: EventItem) =>
    activeMonth.value === "all" || e.start.startsWith(activeMonth.value);

  return (
    events.value
      .filter((e) => tagOk(e) && monthOk(e))
      // featured 置頂
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  );
});

const resetFilters = () => {
  activeTag.value = "全部";
  activeMonth.value = "all";
};

const copyTitle = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // 允許失敗（某些瀏覽器/權限）
  }
};
</script>

<style scoped lang="scss">
.page-activity {
  background: var(--bg-surface);
}
.container {
  width: min(1024px, calc(100% - 32px));
  margin: 0 auto;
}


/* activity-hero */
.activity-hero {
  padding: calc(72px + $padding-RWD) $padding-RWD 20px;
  .activity-hero-inner {
    border-bottom: 2px solid var(--brand-hover);
    // border-radius: 8px;
    padding: 24px 16px;
  }
  .hero-kicer {
    color: var(--text-secondary);
    text-transform: uppercase;
    font-size: 12px;
    margin: 0 0 6px;
  }
  .hero-title {
    font-size: clamp(24px, 3vw, 34px);
    margin: 0 0 8px;
  }
  .hero-desc {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.6;
  }
  @media (max-width: 550px) {
    .activity-hero {
      padding-top: 72px;
    }
  }
}

/* activity-toolbar */
.activity-toolbar {
  padding: 16px 0 20px;
  .activity-toolbar-inner {
    display: flex;
    gap: 16px;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .toolbar-filters {
    display: grid;
    gap: 18px;
    .filter-group {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      .chip {
        border: 2px solid var(--border-default);
        background: var(--bg-surface);
        color: var(--text-primary);
        padding: 8px 16px;
        border-radius: 16px;
        cursor: pointer;
        transition:
          color 0.3s ease,
          border-color 0.3s ease,
          background-color 0.3s ease;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            border-color: var(--brand);
          }
        }

        &.active {
          background: var(--brand);
          border-color: var(--brand);
          color: $color-white;
        }
      }
    }
    .select {
      width: 180px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 2px solid var(--border-default);
      background: var(--bg-surface);
      color: var(--text-primary);
      @media (max-width: 550px) {
        width: 100%;
      }
    }
  }
  .toolbar-meta {
    display: flex;
    gap: 10px;
    align-items: center;

    .count {
      font-size: clamp(12px, 2vw, 14px);
    }
    .toolbar-meta-btn {
      color: var(--text-secondary);
      border: 1px solid var(--border-default);
      padding: 4px 12px;
      border-radius: 8px;
      cursor: pointer;
      &:hover {
        border: 1px solid var(--brand-hover);
      }
      &:active {
        transform: scale(0.95);
        background-color: var(--bg-surface-strong);
      }
    }
  }
}

/* activity-content */
.activity-content {
  padding: 10px 0 64px;
  /* grid/cards */
  .activity-content-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(12, 1fr);
    .activity-card {
      grid-column: span 4;
      background: var(--bg-surface);
      border: 2px solid var(--border-default);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: none;
      transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        border-color 0.25s ease;
      &:hover {
        box-shadow: var(--shadow-card);
        border-color: var(--brand);
      }
      &.featured {
        grid-column: span 12;
        display: grid;
        gap: 16px;
        grid-template-columns: 1.3fr 1fr;
      }
      .card-media {
        position: relative;
        display: block;
        aspect-ratio: 16 / 9;
        background: var(--bg-surface-strong);
        .badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          background: rgba($color-purple-500, 0.22);
          border: 1px solid $color-purple-300;
          color: var(--text-primary);
          backdrop-filter: blur(10px);
        }
        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1);
          transition: transform 0.35s ease;
        }
      }
      &:hover .card-media .img {
        transform: scale(1.03);
      }
    }
    .activity-card-content {
      padding: 16px;
      display: grid;
      gap: 12px;
      .content-header {
        .card-title {
          .title-link {
            color: var(--text-primary);
            text-decoration: none;
            &:hover {
              color: var(--brand);
            }
          }
        }
        .card-desc {
          margin: 8px 0 0;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      }

      .content-footer {
        display: grid;
        // place-content: center;
        gap: 16px;
        padding-top: 8px;
        border-top: 1px solid var(--border-default);
        .meta-tags {
          display: flex;
          gap: 8px;
          flex-direction: column;
          .date {
            font-size: 12px;
            color: var(--text-secondary);
          }
          .tags {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            .tag {
              font-size: 12px;
              padding: 4px 8px;
              border-radius: 24px;
              border: 1px solid var(--border-default);
              color: var(--text-secondary);
            }
          }
        }
        .card-btns {
          display: flex;
          justify-content: left;
          align-items: end;
          gap: 16px;
          .btn {
            display: grid;
            place-content: center;
            width: clamp(80px, 16vw, 120px);
          }
        }
      }
    }
    @media (max-width: 1024px) {
      .activity-card {
        grid-column: span 6;
      }
      .activity-card.featured {
        grid-column: span 12;
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 680px) {
      .activity-card {
        grid-column: span 12;
      }
    }
  }

  /* empty */
  .empty {
    text-align: center;
    border: 1px solid var(--border-default);
    background: var(--bg-surface);
    border-radius: 22px;
    padding: 32px 18px;
    .empty-title {
      margin: 0 0 8px;
    }
    .empty-desc {
      margin: 0 0 16px;
      color: var(--text-secondary);
    }
  }
}
</style>
