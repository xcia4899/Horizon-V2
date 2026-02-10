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
              v-for="section in sidebarList"
              :key="section.title"
              class="sidebar-group"
            >
              <div class="sidebar-group-itile">
                <h4 class="title">{{ section.title }}</h4>
                <icon class="icon" name="material-symbols:add" size="24" />
              </div>

              <ul class="sidebar-group-options">
                <li
                  v-for="(item, index) in section.options"
                  :key="index"
                  class="options-item"
                >
                  <label class="checkbox-area">
                    <input class="checkbox" type="checkbox" :value="item" />
                    {{ item }}
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
          <div class="filter-selected">
            <button class="selected-allClear">
              清除篩選條件
              <Icon class="icon" name="iconoir:cancel" size="24" />
            </button>
            <button
              v-for="(item, index) in 4"
              :key="index"
              class="selected-clearBtn"
            >
              TAG{{ item }}
              <Icon class="icon" name="iconoir:cancel" size="24" />
            </button>
          </div>
          <div class="products-view">
            <div v-for="product in 6" :key="product" class="product-card">
              <div class="card-media">
                <div class="card-image">
                  <img src="/images/pic-detal/RAZER-1000/10001.jpg" alt="" />
                </div>
                <div class="card-barnd">product.brand</div>
              </div>
              <div class="card-content">
                <h4 class="card-title">product.name</h4>
                <h5 class="card-text">product.description</h5>

                <div class="card-price">
                  <p class="discount onSale">特價$ 660g()</p>
                  <p class="price strike">NT$ 880()</p>
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

//sidebar開關
const isSidebarOpen = ref(false);
const toggleFilter = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
//sidebar項目
const sidebarList = [
  {
    title: "品牌",
    options: ["Logitech", "Razer", "ROG", "MSI"],
  },
  {
    title: "鍵盤",
    options: ["機械鍵盤", "薄式鍵盤", "無線鍵盤", "RGB 鍵盤"],
  },
  {
    title: "滑鼠",
    options: ["有線滑鼠", "無線滑鼠", "電競滑鼠", "RGB 滑鼠"],
  },
  {
    title: "耳機",
    options: ["藍芽耳機", "有線耳機", "降噪耳機", "電競耳機"],
  },
  {
    title: "麥克風",
    options: ["USB 麥克風", "3.5mm 麥克風", "電容式麥克風"],
  },
  {
    title: "滑鼠墊",
    options: ["小型滑鼠墊", "大型滑鼠墊", "RGB 滑鼠墊"],
  },
  {
    title: "價格",
    options: ["$0–$1,000", "$1001–$2,000", "$2,001–$3,000", "$3,001+"],
  },
  {
    title: "評價",
    options: ["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐ 以上", "⭐⭐⭐ 以上"],
  },
];
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
    &:hover {
      background: var(--bg-surface-contrast);
      color: var(--text-inverse-soft);
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
  }
}
.main-sidebar {
  padding: 16px 8px;
  min-width: 186px;
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
      border-bottom: 1px dashed;
      .sidebar-group-itile {
        padding: 8px 6px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .title {
          cursor: pointer;
        }
        .icon {
          border-radius: 50%;
        }
        &:hover {
          .icon {
            color: var(--brand);
          }
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
          &:hover {
            background: var(--bg-surface-soft);
            color: var(--brand-hover);
          }
        }
        &.onOpen {
          max-height: 400px;
        }
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
        // flex: 1;
        position: relative;
        background: var(--bg-surface-card);
        border-radius: 6px;
        .card-image {
          width: 100%;
          padding: 8px 8px 32px;
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
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
          color: var(--brand-hover);
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
        padding: 6px 8px 8px;
        gap: 4px;

        .card-title,
        .card-text {
          @include line-clamp(1);
          width: 100%;
        }
        .card-text {
          color: var(--text-secondary);
        }
        .card-price {
          margin-top: 8px;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          .discount.onSale {
            color: var(--state-danger);
            font-weight: bolder;
          }
          .price.strike {
            text-decoration: line-through;
            color: var(--text-secondary);
            opacity: 0.8;
            font-size: 14px;
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
      &:hover::after {
        height: 100%;
        box-shadow: var(--shadow-focus);
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
    & button:hover:not(.active) {
      color: #222;
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
