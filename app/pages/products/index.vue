<template>
  <div class="product-page">
    <section class="product-cursoul">
      <BannerPromoBanner />
    </section>
    <div class="sidebar-toolbar">
      <div class="container sidebar-toolbar-inner">
        <button
          class="filter-toggle"
          :class="{ active: isSidebarClose }"
          @click="toggleFilter"
        >
          {{ isSidebarClose ? "開啟篩選條件" : "關閉篩選條件" }}
          <icon
            class="icon"
            :class="{ rotate: isSidebarClose }"
            name="famicons:filter"
            size="24"
          />
        </button>
        <div class="total">共 {{ productListView.length }} 筆</div>
      </div>
    </div>
    <main ref="productMainRef" class="product-main">
      <div class="product-main-inner container">
        <ProductsSidebar
          v-model:selectTags="selectTags"
          v-model:onsale="onsale"
          :sidebarList="sidebarList"
          :openSections="openSections"
          :isSidebarClose="isSidebarClose"
          :toggleFilter="toggleFilter"
          :collapseAllSections="collapseAllSections"
          @toggle-section="toggleSection"
        />
        <section class="main-products">
          <ProductsSelectedFilters
            v-model:selectTags="selectTags"
            v-model:onsale="onsale"
            :collapseAllSections="collapseAllSections"
          />

          <ProductsGrid :productListView="producPagedList" />
          <ProductsPagination
            v-model:currentPage="currentPage"
            :totalPages="totalPages"
            :scrollToProductsMainRef="scrollToProductsMainRef"
          />
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
//商品資料引入
import { useProducts } from "@/composables/useProducts";
import { looding } from "@/composables/useFetchState";
import type { Product } from "@/composables/useProducts";
import type { LocationQueryValue } from "vue-router";
import type { SidebarList } from "@/types/ui/sidebar";
const route = useRoute();
const router = useRouter();

const { isDesktop } = useInteractionMode();
const products = await useProducts();

//sidebar 是否關閉
const isSidebarClose = ref(true);
// 切換 sidebar 開關
const toggleFilter = async () => {
  await nextTick();
  await looding(100);
  isSidebarClose.value = !isSidebarClose.value;
};

//sidebar項目
const sidebarList: SidebarList[] = [
  {
    title: "品牌",
    key: "brand",

    options: [
      { label: "Logitech", value: "logitech" },
      { label: "Razer", value: "razer" },
      { label: "ROG", value: "rog" },
      { label: "MSI", value: "msi" },
    ],
  },
  {
    title: "鍵盤",
    key: "keyboard",

    options: [
      { label: "機械鍵盤", value: "機械鍵盤" },
      { label: "薄式鍵盤", value: "薄式鍵盤" },
      { label: "無線鍵盤", value: "無線鍵盤" },
      { label: "RGB 鍵盤", value: "rgb 鍵盤" },
    ],
  },
  {
    title: "滑鼠",
    key: "mouse",

    options: [
      { label: "有線滑鼠", value: "有線滑鼠" },
      { label: "無線滑鼠", value: "無線滑鼠" },
      { label: "電競滑鼠", value: "電競滑鼠" },
      { label: "RGB 滑鼠", value: "rgb 滑鼠" },
    ],
  },
  {
    title: "耳機",
    key: "earphone",

    options: [
      { label: "藍芽耳機", value: "藍芽耳機" },
      { label: "有線耳機", value: "有線耳機" },
      { label: "降噪耳機", value: "降噪耳機" },
      { label: "電競耳機", value: "電競耳機" },
    ],
  },
  {
    title: "麥克風",
    key: "mic",

    options: [
      { label: "USB 麥克風", value: "usb 麥克風" },
      { label: "3.5mm 麥克風", value: "3.5mm 麥克風" },
      { label: "電容式麥克風", value: "電容式麥克風" },
    ],
  },
  {
    title: "滑鼠墊",
    key: "mousepad",

    options: [
      { label: "小型滑鼠墊", value: "小型滑鼠墊" },
      { label: "大型滑鼠墊", value: "大型滑鼠墊" },
      { label: "RGB 滑鼠墊", value: "rgb 滑鼠墊" },
    ],
  },
  {
    title: "價格",
    key: "price",

    options: [
      { label: "$2,000以下", value: 2000 },
      { label: "$4,000以下", value: 4000 },
      { label: "$4,000以上", value: 4001 },
    ],
  },
];
//過濾route.tag名單
const tagGroupKeys = new Set([
  "keyboard",
  "mouse",
  "earphone",
  "mic",
  "mousepad",
]);
//從sidebar提取出tagGroupKeys的內容
const tagGroupMap: Record<string, string[]> = Object.fromEntries(
  sidebarList
    .filter((g) => tagGroupKeys.has(g.key))
    .map((g) => [g.key, g.options.map((o) => String(o.value))]),
);

//sidbar的Sections展開關閉
const openSections = ref<number[]>([]);
const toggleSection = (index: number) => {
  const idx = openSections.value.indexOf(index);
  if (idx > -1) openSections.value.splice(idx, 1);
  else openSections.value.push(index);
  // console.log(selectTags.value);
};
//關閉sidebar的所有展開區域
const collapseAllSections = () => {
  openSections.value = [];
};

//依照商品TAG 搜尋
const selectTags = ref<(string | number)[]>([]);

const onsale = ref(false);

onMounted(() => {
  if (route.query.onsale === "true") {
    onsale.value = true;
  }
});
/*--main-products 商品資料--*/

//建立productMainRef

//keyword搜尋值
const keyword = computed({
  get: () => (route.query.keyword ? String(route.query.keyword) : ""),
  set: (val) => {
    const query = { ...route.query };
    if (!val) delete query.keyword;
    else query.keyword = val;
    router.replace({ query: query });
  },
});
const productMainRef = ref<HTMLElement | null>(null);
const norm = (s: string) => s.trim().toLowerCase();
// 計算後的用商品資料
const productListView = computed<Product[]>(() => {
  const tags = selectTags.value;

  const stringTags = tags
    .filter((t): t is string => typeof t === "string")
    .map(norm);

  const numberTags = tags.filter((t): t is number => typeof t === "number");

  const kw = keyword.value.trim().toLowerCase();

  const list = products.filter((product) => {
    const brandKey = norm(product.brand);
    const productTags = (product.tags ?? []).map(norm);

    const matchSidebarTag =
      stringTags.length === 0 ||
      stringTags.includes(brandKey) ||
      stringTags.some((t) => productTags.includes(t));

    const matchSidebarPrice =
      numberTags.length === 0 ||
      numberTags.some((maxPrice) => priceMatch(product.price, maxPrice));

    const matchSale = onsale.value ? product.onsale === true : true;

    const searchText = [
      product.name,
      product.subtitle,
      product.brand,
      product.category,
      product.color,
      product.description,
      ...(product.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    const matchKeyword = !kw || searchText.includes(kw);

    return matchSidebarTag && matchSidebarPrice && matchSale && matchKeyword;
  });

  return list;
});
//捲動到指定列表高度
const scrollToProductsMainRef = () => {
  if (!productMainRef.value) return;
  const top =
    productMainRef.value!.getBoundingClientRect().top + window.scrollY - 140;
  // productMainRef.value.scrollIntoView({ behavior: "smooth" });
  window.scrollTo({ top, behavior: "smooth" });
};

/*--分頁頁碼--*/
const currentPage = ref(1);
const itemsPage = ref(9);

//過濾分頁後的productListView 畫面顯示用
const producPagedList = computed<Product[]>(() => {
  const start = (currentPage.value - 1) * itemsPage.value;
  const end = start + itemsPage.value;
  return productListView.value.slice(start, end);
});
//計算分頁數量
const totalPages = computed(() =>
  Math.max(1, Math.ceil(productListView.value.length / itemsPage.value)),
);

//productListView改變時回到第一頁
watch(
  selectTags,
  async () => {
    if (selectTags.value.length === 0) return;
    await nextTick();
    currentPage.value = 1;
    scrollToProductsMainRef();
  },
  { flush: "post" },
);

//頁碼改變時捲動
watch(
  currentPage,
  async () => {
    await nextTick();
    await looding(100);
    scrollToProductsMainRef();
  },
  { flush: "post" },
);

onMounted(() => {
  // console.log(isDesktop.value);
  if (!isDesktop.value) {
    itemsPage.value = 6;
    isSidebarClose.value = true;
  } else {
    isSidebarClose.value = false;
  }
});

/*----工具列----*/
// 價格區間（建議：Infinity 代表「4000+」）
const priceMatch = (productPrice: number, maxPrice: number) => {
  if (maxPrice > 4000) return productPrice >= 4000;
  return productPrice <= maxPrice;
};
//寫入 query
// helpers（你已有的就沿用）
const sameArray = (a: unknown, b: unknown) =>
  JSON.stringify(a ?? []) === JSON.stringify(b ?? []);

watch(
  () => route.query,
  (q) => {
    // ===== query -> state =====
    const rawTags = toStrArray(q.tag).map(norm);
    const prices = toNumArray(q.price);

    // 先展開 tagGroupMap（有的話）
    const expandedTags = rawTags.flatMap((t) => tagGroupMap[t] ?? [t]);
    const finalTags = expandedTags.map(norm);

    // onsale: true/1 也視為開（依你需求）
    const sale = q.onsale === "true" || q.onsale === "1";

    // 避免無效回寫造成循環：只有真的不同才更新 state
    const nextSelect = [...finalTags, ...prices];
    if (!sameArray(nextSelect, selectTags.value)) {
      selectTags.value = nextSelect;
    }
    if (onsale.value !== sale) {
      onsale.value = sale;
    }
  },
  { immediate: true },
);

watch(
  [selectTags, onsale],
  ([tags, sale]) => {
    // ===== state -> query =====
    const stringTags = tags
      .filter((t): t is string => typeof t === "string")
      .map(norm);
    const numberTags = tags.filter((t): t is number => typeof t === "number");

    const nextQuery = {
      ...route.query,
      tag: stringTags.length ? stringTags : undefined,
      price: numberTags.length ? numberTags : undefined,
      onsale: sale ? "true" : undefined,
    };

    // 只比較你會改的欄位，避免每次都 replace
    const same =
      sameArray(nextQuery.tag, route.query.tag) &&
      sameArray(nextQuery.price, route.query.price) &&
      (nextQuery.onsale ?? undefined) === (route.query.onsale ?? undefined);

    if (same) return;

    router.replace({ query: nextQuery });
  },
  { deep: true },
);
//query 變成可用陣列工具
function toStrArray(
  v: LocationQueryValue | LocationQueryValue[] | undefined,
): string[] {
  if (!v) return [];
  const arr = Array.isArray(v) ? v : [v];
  return arr.filter((x): x is string => typeof x === "string" && x.length > 0);
}
//query 變成可用陣列工具
function toNumArray(
  v: LocationQueryValue | LocationQueryValue[] | undefined,
): number[] {
  return toStrArray(v).map(Number).filter(Number.isFinite);
}
</script>

<style scoped lang="scss">
.product-page {
  display: flex;
  flex-direction: column;
}
.product-cursoul {
  max-height: 480px;
}
.sidebar-toolbar {
  padding: 8px 12px;
  background: var(--bg-surface-strong);
  .sidebar-toolbar-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .filter-toggle {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 20px;
    padding: 8px 20px;
    border-radius: 16px;
    letter-spacing: 2px;
    color: var(--text-tertiary);
    background: var(--bg-surface);
    transition: background-color 0.2s ease;
    cursor: pointer;

    &.active {
      color: var(--text-primary);
      background: var(--bg-surface-soft);
    }
    .icon {
      transition: transform 0.3s ease;
    }

    .icon.rotate {
      color: var(--brand-hover);
      transform: rotateX(180deg);
    }
    &:active {
      background: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--bg-surface-secondary);
        color: var(--text-primary);
        .icon {
          color: var(--brand-hover);
        }
      }
    }
  }
  .total {
    padding: 6px 16px;
    border-radius: 16px;
    color: var(--text-secondary);
    border: 1px solid var(--border-default);
    background: var(--bg-surface);
    font-size: 12px;
  }
}
.product-main {
  background: var(--bg-surface);
  .product-main-inner {
    display: flex;
    width: 100%;
    /*   gap: 32px; */
    padding-block: 16px 32px;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
}

.main-products {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
