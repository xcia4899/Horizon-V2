<template>
  <div class="product-page">
    <section class="product-cursoul">
      <BannerPromoBanner />
    </section>
    <div class="sidebar-toolbar">
      <div class="container">
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
      </div>
    </div>
    <main ref="productMainRef" class="product-main">
      <div class="product-main-inner container">
        <ProductsSidebar
          v-model:selectTags="selectTags"
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
    type: "multi",
    options: [
      { label: "Logitech", value: "Logitech" },
      { label: "Razer", value: "Razer" },
      { label: "ROG", value: "ROG" },
      { label: "MSI", value: "MSI" },
    ],
  },
  {
    title: "鍵盤",
    key: "tags",
    type: "multi",
    options: [
      { label: "機械鍵盤", value: "機械鍵盤" },
      { label: "薄式鍵盤", value: "薄式鍵盤" },
      { label: "無線鍵盤", value: "無線鍵盤" },
      { label: "RGB 鍵盤", value: "RGB 鍵盤" },
    ],
  },
  {
    title: "滑鼠",
    key: "tags",
    type: "multi",
    options: [
      { label: "有線滑鼠", value: "有線滑鼠" },
      { label: "無線滑鼠", value: "無線滑鼠" },
      { label: "電競滑鼠", value: "電競滑鼠" },
      { label: "RGB 滑鼠", value: "RGB 滑鼠" },
    ],
  },
  {
    title: "耳機",
    key: "tags",
    type: "multi",
    options: [
      { label: "藍芽耳機", value: "藍芽耳機" },
      { label: "有線耳機", value: "有線耳機" },
      { label: "降噪耳機", value: "降噪耳機" },
      { label: "電競耳機", value: "電競耳機" },
    ],
  },
  {
    title: "麥克風",
    key: "tags",
    type: "multi",
    options: [
      { label: "USB 麥克風", value: "USB 麥克風" },
      { label: "3.5mm 麥克風", value: "3.5mm 麥克風" },
      { label: "電容式麥克風", value: "電容式麥克風" },
    ],
  },
  {
    title: "滑鼠墊",
    key: "tags",
    type: "multi",
    options: [
      { label: "小型滑鼠墊", value: "小型滑鼠墊" },
      { label: "大型滑鼠墊", value: "大型滑鼠墊" },
      { label: "RGB 滑鼠墊", value: "RGB 滑鼠墊" },
    ],
  },
  {
    title: "價格",
    key: "price",
    type: "single",
    options: [
      { label: "$2,000以下", value: 2000 },
      { label: "$4,000以下", value: 4000 },
      { label: "$4,000以上", value: 4001 },
    ],
  },
];
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

/*--main-products 商品資料--*/
//建立productMainRef
const productMainRef = ref<HTMLElement | null>(null);
// 計算後的用商品資料
const productListView = computed<Product[]>(() => {
  const tags = selectTags.value;

  const stringTags = tags.filter((t): t is string => typeof t === "string");
  const numberTags = tags.filter((t): t is number => typeof t === "number");

  const kw = keyword.value.trim();

  const list = products.filter((product) => {
    const matchSidebarTag =
      stringTags.length === 0 ||
      stringTags.includes(product.brand) ||
      stringTags.some((tag) => product.tags?.includes(tag));

    const matchSidebarPrice =
      numberTags.length === 0 ||
      numberTags.some((maxPrice) => priceMatch(product.price, maxPrice));

    const matchKeyword = !kw || product.name.includes(kw);

    return matchSidebarTag && matchSidebarPrice && matchKeyword;
  });
  // scrollToProductsMainRef();
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
  console.log(isDesktop.value);
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
watch(
  selectTags,
  (tags) => {
    const stringTags = tags.filter((t) => typeof t === "string");
    const numberTags = tags.filter((t) => typeof t === "number");

    router.replace({
      query: {
        ...route.query,
        tag: stringTags.length ? stringTags : undefined,
        price: numberTags.length ? numberTags : undefined,
      },
    });
  },
  { deep: true },
);
//將值寫入selectTags陣列
watch(
  () => route.query,
  (q) => {
    const tags = toStrArray(q.tag); // string[]
    const prices = toNumArray(q.price); // number[]
    selectTags.value = [...tags, ...prices];
  },
  { immediate: true },
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
  background: var(--bg-surface);

  .filter-toggle {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 20px;
    padding: 6px 16px;
    border-radius: 8px;
    letter-spacing: 2px;
    color: var(--text-tertiary);
    background: var(--bg-surface-strong);
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
}
.product-main {
  background: var(--bg-surface-strong);
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
