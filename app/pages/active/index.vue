<template>
  <main id="main" class="page-activity">
    <!-- hero -->
    <section class="hero">
      <div class="container hero-inner">
        <p class="kicker">Horizon Events</p>
        <h1 class="title">Horizon 活動一覽</h1>
        <p class="desc">
          精選檔期、品牌週、限時優惠與新品活動。你可以用標籤與月份快速篩選。
        </p>
      </div>
    </section>

    <!-- toolbar -->
    <section class="toolbar">
      <div class="container toolbar-inner">
        <div class="filters">
          <div class="filter-group">
            <label class="label">標籤</label>
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
            <label class="label" for="month">月份</label>
            <select id="month" v-model="activeMonth" class="select">
              <option value="all">全部</option>
              <option v-for="m in monthOptions" :key="m.value" :value="m.value">
                {{ m.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="meta">
          <span class="count">共 {{ filteredEvents.length }} 筆</span>
          <button class="ghost" type="button" @click="resetFilters">
            清除篩選
          </button>
        </div>
      </div>
    </section>

    <!-- list -->
    <section class="content">
      <div class="container">
        <!-- loading skeleton (你接 API 時可以用) -->
        <div v-if="isLoading" class="grid">
          <div v-for="n in 6" :key="n" class="card skeleton">
            <div class="thumb"></div>
            <div class="body">
              <div class="line w-60"></div>
              <div class="line w-90"></div>
              <div class="line w-40"></div>
            </div>
          </div>
        </div>

        <!-- empty -->
        <div v-else-if="filteredEvents.length === 0" class="empty">
          <h3 class="empty-title">找不到符合條件的活動</h3>
          <p class="empty-desc">試試看切換標籤或月份，或直接清除篩選。</p>
          <button class="primary" type="button" @click="resetFilters">
            清除篩選
          </button>
        </div>

        <!-- grid -->
        <div v-else class="grid">
          <article
            v-for="item in filteredEvents"
            :key="item.id"
            class="card"
            :class="{ featured: item.featured }"
          >
            <NuxtLink class="media" :to="item.to || '#'">
              <img
                class="img"
                :src="item.image"
                :alt="item.title"
                loading="lazy"
              />
              <div v-if="item.badge" class="badge">{{ item.badge }}</div>
            </NuxtLink>

            <div class="body">
              <header class="header">
                <h3 class="card-title">
                  <NuxtLink class="title-link" :to="item.to || '#'">
                    {{ item.title }}
                  </NuxtLink>
                </h3>
                <p class="card-desc">{{ item.description }}</p>
              </header>

              <footer class="footer">
                <div class="meta-row">
                  <span class="date">{{ item.dateRange }}</span>
                  <div class="tags">
                    <span v-for="t in item.tags" :key="t" class="tag">
                      {{ t }}
                    </span>
                  </div>
                </div>

                <div class="actions">
                  <NuxtLink class="primary" :to="item.to || '#'">
                    查看活動
                  </NuxtLink>
                  <button
                    class="ghost"
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

const isLoading = ref(false);

// 假資料：你之後要接 API / seed 也很容易換掉
const events = ref<EventItem[]>([
  {
    id: "event-2026-spring",
    title: "春季限時特惠｜全館最高 8 折",
    description: "鍵盤、滑鼠、耳機與螢幕周邊精選折扣，會員再享加碼券。",
    dateRange: "2026/03/01 - 2026/03/14",
    start: "2026-03-01",
    image: "/images/promoBanner/banner-01.jpg",
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
    image: "/images/promoBanner/banner-02.jpg",
    tags: ["品牌週", "Razer"],
    to: "/products?keyword=Razer",
  },
   {
    id: "event-razer-week",
    title: "Razer 品牌週",
    description: "指定系列滿額送，熱門品項限量補貨。",
    dateRange: "2026/03/10 - 2026/03/20",
    start: "2026-03-10",
    image: "/images/promoBanner/banner-02.jpg",
    tags: ["品牌週", "Razer"],
    to: "/products?keyword=Razer",
  },
  {
    id: "event-new-arrivals",
    title: "新品上架｜滑鼠墊與鍵帽專區",
    description: "整理桌面風格，從細節開始。多款材質與配色上架。",
    dateRange: "2026/02/20 - 2026/03/31",
    start: "2026-02-20",
    image: "/images/products/promo-banner.jpg",
    tags: ["新品", "配件"],
    to: "/products?keyword=新品",
  },
  {
    id: "event-new-arrivals",
    title: "新品上架｜滑鼠墊與鍵帽專區",
    description: "整理桌面風格，從細節開始。多款材質與配色上架。",
    dateRange: "2026/02/20 - 2026/03/31",
    start: "2026-02-20",
    image: "/images/products/promo-banner.jpg",
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
/* 若你專案已有全域 tokens，可刪掉這段 fallback */
.page-activity {
  --bg: var(--bg-app, #0b0c10);
  --surface: var(--bg-surface, rgba(255, 255, 255, 0.04));
  --surface-2: var(--bg-surface-strong, rgba(255, 255, 255, 0.06));
  --text: var(--text-primary, rgba(255, 255, 255, 0.92));
  --muted: var(--text-secondary, rgba(255, 255, 255, 0.68));
  --brand: var(--brand, #a78bfa);
  --border: var(--border-color, rgba(255, 255, 255, 0.1));
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.container {
  width: min(1120px, calc(100% - 40px));
  margin-inline: auto;
}

.page-activity {
  background: var(--bg);
  color: var(--text);
  min-height: 100%;
}

/* hero */
.hero {
  padding: 88px 0 20px;
}
.hero-inner {
  background: linear-gradient(
    180deg,
    rgba(167, 139, 250, 0.12),
    transparent 60%
  );
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 28px 22px;
}
.kicker {
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 12px;
  margin: 0 0 6px;
}
.title {
  font-size: clamp(24px, 3vw, 34px);
  margin: 0 0 8px;
}
.desc {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

/* toolbar */
.toolbar {
  padding: 14px 0 18px;
}
.toolbar-inner {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
}
.filters {
  display: grid;
  gap: 12px;
}
.filter-group {
  display: grid;
  gap: 8px;
}
.label {
  font-size: 12px;
  color: var(--muted);
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;
  &:hover {
    transform: translateY(-1px);
    border-color: rgba(167, 139, 250, 0.5);
  }
  &.active {
    background: rgba(167, 139, 250, 0.18);
    border-color: rgba(167, 139, 250, 0.6);
  }
}
.select {
  width: 180px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
}
.meta {
  display: flex;
  gap: 10px;
  align-items: center;
  color: var(--muted);
}
.count {
  font-size: 12px;
}

/* content */
.content {
  padding: 10px 0 64px;
}

/* grid/cards */
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(12, 1fr);
}

.card {
  grid-column: span 4;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
    border-color: rgba(167, 139, 250, 0.35);
  }
  &.featured {
    grid-column: span 12;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
  }
}

.media {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  background: var(--surface-2);
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1);
  transition: transform 0.35s ease;
}
.card:hover .img {
  transform: scale(1.03);
}
.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: rgba(167, 139, 250, 0.22);
  border: 1px solid rgba(167, 139, 250, 0.45);
  color: var(--text);
  backdrop-filter: blur(10px);
}

.body {
  padding: 14px 14px 16px;
  display: grid;
  gap: 12px;
}
.card-title {
  margin: 0;
  font-size: 18px;
  line-height: 1.25;
}
.title-link {
  color: var(--text);
  text-decoration: none;
  &:hover {
    color: var(--brand);
  }
}
.card-desc {
  margin: 8px 0 0;
  color: var(--muted);
  line-height: 1.6;
  font-size: 14px;
}

.footer {
  display: grid;
  gap: 12px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.meta-row {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.date {
  font-size: 12px;
  color: var(--muted);
}
.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.tag {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  color: var(--muted);
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* buttons */
.primary,
.ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border-radius: 14px;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid var(--border);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;
}
.primary {
  background: rgba(167, 139, 250, 0.18);
  border-color: rgba(167, 139, 250, 0.55);
  color: var(--text);
  &:hover {
    transform: translateY(-1px);
    border-color: rgba(167, 139, 250, 0.85);
  }
}
.ghost {
  background: transparent;
  color: var(--muted);
  &:hover {
    transform: translateY(-1px);
    color: var(--text);
    border-color: rgba(255, 255, 255, 0.18);
  }
}

/* empty */
.empty {
  text-align: center;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 22px;
  padding: 32px 18px;
}
.empty-title {
  margin: 0 0 8px;
}
.empty-desc {
  margin: 0 0 16px;
  color: var(--muted);
}

/* skeleton */
.skeleton {
  pointer-events: none;
  .thumb {
    aspect-ratio: 16 / 9;
    background: rgba(255, 255, 255, 0.06);
  }
  .line {
    height: 12px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 999px;
  }
  .w-60 {
    width: 60%;
  }
  .w-90 {
    width: 90%;
  }
  .w-40 {
    width: 40%;
  }
}

/* RWD */
@media (max-width: 1024px) {
  .card {
    grid-column: span 6;
  }
  .card.featured {
    grid-column: span 12;
    grid-template-columns: 1fr;
  }
}
@media (max-width: 680px) {
  .hero {
    padding-top: 72px;
  }
  .card {
    grid-column: span 12;
  }
  .select {
    width: 100%;
  }
}
</style>
