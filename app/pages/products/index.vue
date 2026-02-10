<template>
  <div class="product-page">
    <section class="product-cursoul">
      <BannerPromoBanner />
    </section>
    <div class="filter-toolbar">
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
                <span class="icon"> </span>
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
          <div class="listrow">
            <div v-for="product in 6" :key="product" class="card">
              <div class="item-pic">
                <div class="pic">
                  <img src="/images/pic-detal/RAZER-1000/10001.jpg" alt="" />
                </div>
                <div class="card-title">product.brand</div>
              </div>
              <div class="item-text">
                <h4>product.name</h4>
                <h5>product.description</h5>

                <div class="productprice">
                  <p>特價$ 660g()</p>
                  <p>NT$ 880()</p>
                </div>
                <button class="btn">加入購物車</button>
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
.filter-toolbar {
  padding: 16px 0px;
  background: var(--bg-surface-strong);

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
.product-main-inner {
  display: flex;
  width: 100%;
  gap: 8px;
}
.main-sidebar {
  // flex: 0 0 40%;
  padding: 16px 8px;
  min-width: 186px;
  width: clamp(186px, 25% ,240px);
  border: 1px solid white;
  .sidebar-groups {
    padding: 0px;
    margin: 0px 0px 8px;
    .sidebar-group {
      padding: 4px 0px;
      margin-bottom: 4px;
      vertical-align: top;
      line-height: 100%;
      div {
        padding: 8px 0;
        margin-bottom: 8px;
        cursor: pointer;
        h4 {
          font-weight: 800;
        }
      }
      .sidebar-group-options {
        .options-item {
          display: flex;
          align-items: center;
          // flex-direction: row-reverse;
          // justify-content: space-between;
          padding: 6px 8px;
          border-radius: 4px;
          transition: all 0.3s ease;
          &:hover {
            background-color: #6b6b6b;
          }
          .checkbox-area {
            width: 100%;
          }
          .checkbox-area,
          .checkbox {
            cursor: pointer;
          }
        }
      }
      .sidebar-group-itile {
        padding: 0 6px;
        display: flex;
        justify-content: space-between;
        h4,
        span {
          vertical-align: top;
        }
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1/1;
          // padding: 3px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 0.5px solid transparent;
        }

        &:hover {
          span {
            background-color: #fff;
          }
        }
      }

      .sidebar-group-options {
        max-height: 400px;
        overflow: hidden;
        transition: all 0.3s ease-out;
      }

      .sidebar-group-options.sidebar-group-options-open {
        max-height: 400px;
      }
    }
  }
  .sidebar-title {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
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
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .listrow {
    border: 1px solid ;
    width: 100%;
    display: grid;
    // grid-template-columns: repeat(3, 1fr); /* 建立三欄，每欄 1fr 寬 */
    grid-template-columns: repeat(auto-fit, minmax(220px, max-content));
    grid-template-rows: auto-fit;
    /* 自動高度 */
    margin: 0 auto;
    gap: 32px 24px;
    justify-items: flex-start;
    justify-content: center;
    .card {
      height: 100%;
      min-width: 200px;
      max-width: 300px;
      width: 100%;
      padding-bottom: 0px;
      justify-content: space-between;

      &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        height: 40%;
      }

      &:hover::after {
        height: 100%;
      }

      .item-pic {
        // flex: 1;

        a {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pic {
          // height: 100%;
          width: 100%;
          padding: 16px;

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

        .card-title {
          // display: none;
          position: absolute;
          bottom: 8px;
          left: 8px;
          font-size: 14px;
          font-weight: 900;
        }
      }

      .item-text {
        flex: 1;
        word-wrap: break-word;
        // color: $color-darkgery;;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: flex-start;
        padding: 6px 8px 8px;
        gap: 4px;

        h4,
        h5,
        p {
          margin: 0;
          text-align: left;
        }

        h4 {
          font-weight: 900;
        }

        h5 {
          font-size: 16px;
          font-weight: 400;
        }

        p {
          font-size: 16px;
          padding: 2px;
          font-weight: 600;
          // text-align: center;
        }

        .productprice {
          margin-top: 8px;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .btn {
          height: 36px;
          width: 100%;
          padding: 0;

          transition: all 0.3s ease;
          margin-top: 4px;
        }
      }
    }
  }
}

.filter-selected {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border: 1px solid;
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
    background: var(--bg-surface);
    border: 2px solid var(--border-default);
    cursor: pointer;
    &:hover {
      color: var(--text-secondary);
      background: var(--bg-surface-soft);
      border-color: var(--brand);
    }
  }
}
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
</style>
