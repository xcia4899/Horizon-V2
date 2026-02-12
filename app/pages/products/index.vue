<template>
  <div class="product-page">
    <section class="product-cursoul">
      <BannerPromoBanner />
    </section>
    <div class="sidebar-toolbar">
      <div class="container">
        <button class="filter-toggle" @click="toggleFilter">
          關閉篩選條件
          <icon
            class="icon"
            :class="{ rotate: isSidebarOpen }"
            name="famicons:filter"
            size="24"
          />
        </button>
      </div>
    </div>
    <main class="product-main">
      <div class="product-main-inner container">
        <section v-show="!isSidebarOpen" class="main-sidebar">
          <div class="sidebar-title">篩選</div>
          <ul class="sidebar-groups">
            <li
              v-for="(item, index) in sidebarList"
              :key="item.key"
              class="sidebar-group"
              :class="{ underline: isSectionOpen(index) }"
            >
              <div class="sidebar-group-title" @click="toggleSection(index)">
                <h4 class="title">{{ item.title }}</h4>
                <icon
                  class="icon"
                  :class="{ rotate: isSectionOpen(index) }"
                  name="icon-park-solid:up-c"
                  size="24"
                />
              </div>

              <ul v-show="isSectionOpen(index)" class="sidebar-group-options">
                <li
                  v-for="(options, i) in item.options"
                  :key="i"
                  class="options-item"
                >
                  <label class="checkbox-area">
                    <input
                      v-model="selectTags"
                      class="checkbox"
                      type="checkbox"
                      :value="options.value"
                    />
                    {{ options.label }}
                  </label>
                </li>
              </ul>
            </li>
          </ul>
          <div class="mobile-Btn">
            <div class="reset">
              <h4>重置</h4>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <!-- 加號（+） -->
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <button class="btn">確定</button>
          </div>
        </section>
        <section class="main-products">
          <div v-show="selectTags.length" class="filter-selected">
            <button class="selected-allClear" @click="clearTag">
              清除篩選條件
              <Icon class="icon" name="iconoir:cancel" size="24" />
            </button>
            <button
              v-for="(item, index) in selectTags"
              :key="index"
              class="selected-clearBtn"
              @click="removeTag(item)"
            >
              {{ item }}
              <Icon class="icon" name="iconoir:cancel" size="24" />
            </button>
          </div>
          <div class="products-view">
            <div
              v-for="product in productListView"
              :key="product.id"
              class="product-card"
            >
              <div class="card-media">
                <div class="card-image">
                  <img :src="product.images.main" :alt="product.name" />
                </div>
                <div class="card-barnd">{{ product.brand }}</div>
              </div>
              <div class="card-content">
                <h4 class="card-title">{{ product.name }}</h4>
                <h5 class="card-text">{{ product.description }}</h5>

                <div class="card-price">
                  <p class="discount onSale">特價$ {{ product.discount }}</p>
                  <p class="price strike">NT$ {{ product.price }}</p>
                </div>
                <button class="card-add btn">加入購物車</button>
              </div>
            </div>
          </div>
          <div v-show="true" class="pagination">
            <button>上一頁</button>
            <button v-for="page in 3" :key="page">
              {{ page }}
            </button>
            <button>下一頁</button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
//商品資料引入
import { useProducts } from "@/composables/useProducts";
const products = await useProducts();

//sidebar開關
const isSidebarOpen = ref(false);
const toggleFilter = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
//sidebar項目
const sidebarList = [
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
      { label: "$4,000以上", value: Infinity },
    ],
  },
];

//sidbar的Sections展開關閉
const openSections = ref<number[]>([]);
const isSectionOpen = (index: number) => openSections.value.includes(index);
const toggleSection = (index: number) => {
  const idx = openSections.value.indexOf(index);
  if (idx > -1) openSections.value.splice(idx, 1);
  else openSections.value.push(index);
  // console.log(selectTags.value);
};
//依照商品TAG 搜尋
const selectTags = ref<string[]>([]);

//filter-selected 刪除TAG
const removeTag = (tag: string) => {
  return (selectTags.value = selectTags.value.filter((t) => t !== tag));
};
const clearTag = () => {
  return (selectTags.value = []);
};
//main-products 商品資料

const route = useRoute();
const keyword = computed(() => {
  return String(route.query.keyword ?? "").trim();
});

// 顯示用資料：永遠由 computed 算出
const productListView = computed(() => {
  const tags = selectTags.value;
  //區分數字
  const numberTags = tags.filter((tag) => typeof tag === "number");

  const option = products.filter((product) => {
    //點品牌分類
    const matchBrand = tags.length === 0 || tags.includes(product.brand);
    //點TAG分類
    const matchTag =
      tags.length === 0 || tags.some((tag) => product.tags.includes(tag));
    //點價格分類
    const matchPrice =
      numberTags.length === 0 ||
      numberTags.some((price) => priceMatch(product.price, price));
    return matchBrand && matchTag && matchPrice;
  });
  const searchKey = products.filter((product) => {
    const matchKeyword = !keyword.value || product.name.includes(keyword.value);

    return matchKeyword;
  });

  // console.log("結果", option);
  return option && searchKey;
});

//計算價格區間
const priceMatch = (productPrice: number, maxPrice: number) => {
  if (maxPrice === Infinity) return productPrice >= 4000;
  return productPrice <= maxPrice;
};

//搜尋關鍵字
// const keyword = computed({
//   get: () => String(route.query.keyword ?? ""),
//   set: (val: string) => {
//     navigateTo({
//       path: "/products",
//       query: { ...route.query, keyword: val },
//     });
//   },
// });
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
  padding: 8px 0px;
  background: var(--bg-surface);

  .filter-toggle {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 18px;
    padding: 6px 16px;
    border-radius: 8px;
    letter-spacing: 2px;
    color: var(--text-secondary);
    background-color: transparent;
    cursor: pointer;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--bg-surface-contrast);
        color: var(--text-inverse-soft);
      }
    }

    .icon {
      transition: transform 0.3s ease;
    }

    .icon.rotate {
      transform: rotateX(180deg);
    }
  }
}
.product-main {
  background: var(--bg-surface-strong);
  .product-main-inner {
    display: flex;
    width: 100%;
    gap: 32px;
    padding-block: 16px 32px;
  }
}
.main-sidebar {
  // padding: 0px 8px;
  // min-width: 186px;
  width: clamp(186px, 25%, 240px);
  .sidebar-title {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
    display: none;
  }
  .sidebar-groups {
    .sidebar-group {
      padding: 4px 0px;
      margin-bottom: 4px;
      border-bottom: 1px dashed var(--border-default);
      .sidebar-group-title {
        padding: 8px 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        .title {
          cursor: pointer;
        }
        .icon {
          color: var(--brand-soft);
          transition: transform 0.3s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            .icon {
              color: var(--brand);
            }
          }
        }
        .icon.rotate {
          color: var(--brand);
          transform: rotate(180deg);
        }
      }
      .sidebar-group-options {
        .options-item {
          display: flex;
          align-items: center;
          max-height: 400px;
          overflow: hidden;
          padding: 6px 8px;
          border-radius: 4px;
          transition: background-color 0.2s ease-out;
          .checkbox-area {
            width: 100%;
          }
          .checkbox-area,
          .checkbox {
            cursor: pointer;
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: var(--bg-surface-soft);
              color: var(--brand-hover);
            }
          }
        }
        &.onOpen {
          max-height: 400px;
        }
      }
      &.underline {
        border-bottom-style: solid;
        border-color: var(--border-soft);
      }
    }
  }
  .mobile-Btn {
    position: fixed;
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    left: 0;
    bottom: 0;

    width: 100%;
    // height: 140px;
    padding: 16px 0px 48px;
    font-size: 16px;

    .reset {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 24px;
      // width: 90%;
      border-radius: 4px;
      text-align: center;
      border: 1px solid transparent;
      cursor: pointer;
      h4 {
        font-size: 16px;
      }
      svg {
        transform: rotate(45deg);
      }
    }
    .btn {
      font-size: 16px;
      width: 90%;
    }
  }
}
.main-products {
  flex: 1;
  display: flex;
  flex-direction: column;
  .products-view {
    // border: 1px solid;
    width: 100%;
    display: grid;
    // grid-template-columns: repeat(3, 1fr); /* 建立三欄，每欄 1fr 寬 */
    grid-template-columns: repeat(auto-fit, minmax(220px, max-content));
    grid-template-rows: auto-fit;
    /* 自動高度 */
    margin: 0 auto;
    gap: 32px 24px;
    padding: 8px;
    justify-items: flex-start;
    justify-content: center;
    .product-card {
      position: relative;
      height: 100%;
      width: 100%;
      min-width: 200px;
      max-width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      cursor: pointer;
      > * {
        position: relative;
        z-index: 1;
      }
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        border-radius: 6px;
        content: "";
        height: 20%;
        width: 100%;
        background: var(--bg-surface-card);
        transition: height 0.4s ease-out;
        box-shadow: transparent;
      }
      .card-media {
        height: 100%;
        position: relative;
        background: var(--bg-surface-card);
        border-radius: 6px;
        .card-image {
          height: 100%;
          width: 100%;
          padding: 8px 8px 32px;
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: center;
            margin: auto auto;
          }
        }
        .card-barnd {
          position: absolute;
          bottom: 8px;
          left: 8px;
          font-size: 14px;
          font-weight: 900;
          color: var(--brand);
          cursor: pointer;
        }
      }
      .card-content {
        flex: 1;
        word-wrap: break-word;
        // color: $color-darkgery;;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: flex-start;
        padding: 8px;
        gap: 8px;

        .card-title,
        .card-text {
          cursor: pointer;
          width: 100%;
          transition: color 0.4s ease;
        }
        .card-title {
          @include line-clamp(1);
        }
        .card-text {
          color: var(--text-secondary);
          @include line-clamp(2);
        }
        .card-price {
          margin-top: 8px;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          .discount,
          .strike {
            cursor: pointer;
          }
          .discount.onSale {
            color: var(--state-danger);
            font-weight: bolder;
          }
          .price.strike {
            text-decoration: line-through;
            color: var(--text-secondary);
            opacity: 0.8;
            font-size: 14px;
            transition: color 0.4s ease;
          }
        }

        .card-add {
          height: 36px;
          width: 100%;
          padding: 0;

          transition: all 0.3s ease;
          margin-top: 4px;
        }
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          &::after {
            height: 100%;
            box-shadow: var(--shadow-focus);
          }
          .card-content {
            .card-title {
              color: $color-black;
            }
            .card-text {
              color: $color-gray-800;
            }
            .price {
              color: $color-black;
            }
            .price.strike {
              color: $color-gray-800;
            }
          }
        }
      }
    }
  }
  //上方清除TAG
  .filter-selected {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px;
    .selected-allClear,
    .selected-clearBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 1px;
      padding: 4px 12px;
      border-radius: 8px;
      color: var(--text-secondary);
      background: transparent;
      border: 2px solid var(--border-default);
      cursor: pointer;
      .icon {
        color: var(--brand-hover);
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--text-secondary);
          background: var(--bg-surface-soft);
          border-color: var(--brand);
          .icon {
            color: var(--state-danger);
          }
        }
      }
    }
  }
  //換頁UI
  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    flex-wrap: wrap;
    & button {
      padding: 6px 12px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.3s ease;
    }
    @media (hover: hover) and (pointer: fine) {
      & button:hover:not(.active) {
        color: #222;
      }
    }

    & button.active {
      color: white;
      font-weight: bold;
    }
    & button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
