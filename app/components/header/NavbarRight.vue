<template>
  <aside class="nav-right">
    <div class="setItem search-area">
      <!-- 搜尋 Modal -->
      <div class="search-input" :class="{ isOpen: showSearch }">
        <el-input
          ref="inputRef"
          v-model="keyword"
          placeholder="搜尋商品..."
          class="input-box"
          @blur="closeSearch"
          @keydown.enter="submitSearch"
        >
          <template #prefix>
            <Icon name="mdi:magnify" class="icon" size="24" />
          </template>
        </el-input>
      </div>
      <!-- 搜尋 -->
      <button
        type="button"
        class="btnItem search-btn"
        @mousedown.prevent
        @click="onSearchClick"
      >
        <Icon
          :name="showSearch ? 'mdi:close' : 'mdi:magnify'"
          class="icon"
          :class="{ active: showSearch === true }"
        />
      </button>
    </div>

    <!-- 登入 -->
    <button type="button" class="btnItem setItem login-btn">
      <Icon name="mdi:account-circle" class="icon" />
      <!-- 以登入 -->
      <!-- <Icon
          :name="isLogin ? 'mdi:account-circle' : 'mdi:account-outline'"
          class="icon"
        /> -->
    </button>
    <!-- 購物車 -->
    <button type="button" class="btnItem setItem cart-btn">
      <Icon name="meteor-icons:cart-shopping" class="icon" />
      <span v-if="cartCount > 0" class="cart-badge">
        {{ cartCount > 99 ? "99+" : cartCount }}
      </span>
    </button>

    <!-- 迷你購物車顯示 -->
    <div class="miniCart">
      <div class="cart-view">
        <div v-for="item in cartView" :key="item.id" class="cart-item">
          <div class="item-img">
            <img :src="item.images" :alt="item.name" />
            <!-- <p>{{ item.brand }}</p> -->
          </div>
          <p class="item-name">{{ item.name }}</p>
          <!-- <div>單價：{{ item.price }}</div> -->
          <div class="item-detal">
            <p>數量：2</p>
            <p class="price">小計：1992${{}}</p>
          </div>
          <div class="delete" @click="''">
            <Icon name="mdi:delete-circle-outline" class="icon" />
          </div>
        </div>
      </div>
      <div class="bottom-area">
        <h4>總金額：4450{{}}元</h4>
        <button class="btn">結帳</button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  nextTick,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";

// import { Search } from "@element-plus/icons-vue";
import type { InputInstance } from "element-plus";
//螢幕、手機模式判斷
const { isDesktop, isTouch } = useInteractionMode();
//搜尋關鍵字
const keyword = ref("");
// 取得el-input 實例
const inputRef = ref<InputInstance | null>(null);

//顯示搜尋框
const showSearch = ref(false);
//keyword是否有值，用來判斷是否關閉搜尋框
const canClose = computed(() => !keyword.value?.trim());
//搜尋按鈕邏輯
const onSearchClick = () => {
  if (isTouch.value) {
    console.log("手機模式跳轉搜尋頁");
    // navigateTo("/"); // 手機：跳搜尋頁
  } else {
    toggleSearch(); // 桌機：展開搜尋框
  }
};

//開關搜尋框
const toggleSearch = async () => {
  keyword.value = "";
  showSearch.value = !showSearch.value;
  // console.log("執行 showSearch", showSearch.value);
};
//關閉搜尋框
const closeSearch = () => {
  if (!canClose.value) return;
  showSearch.value = false;
};
// ESC 關閉
const onKeydown = (e: KeyboardEvent) => {
  if (!isDesktop.value) return;
  if (!showSearch.value) return;
  if (e.key === "Escape") closeSearch();
};
onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
// 開啟時自動 focus
watch(showSearch, async (value) => {
  if (!value) return;
  await nextTick();
  inputRef.value?.focus?.();
});

//搜尋功能
const submitSearch = () => {
  if (!keyword.value.trim()) return;
  closeSearch();
  //   navigateTo(`/search?keyword=${keyword.value}`);
  console.log(`搜尋關鍵字：${keyword.value} 並跳轉到商品頁`);
};

//購物車程式碼---------
//購物車原始資料
const cartItems = ref([
  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    price: 4490,
    originalPrice: 4990,
    quantity: 1,
    onsale: true,
    colorOptions: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: "./images/pic-detal/RAZER-1000/10001.jpg",
  },
  {
    id: "RAZER-1000",
    brand: "RAZER ",
    name: "RAZER 2 DEX RGB電競鍵盤",
    subtitle: "穩定可靠，電競鍵盤的專業之選",
    price: 4490,
    originalPrice: 4990,
    quantity: 1,
    onsale: true,
    colorOptions: "黑色",
    description:
      "RAZER 2 DEX RGB 是一款專為電競玩家設計的高性能機械鍵盤，搭載靈敏且耐用的機械軸，支援全鍵無衝突和快速響應，配備可自訂的 RGB 燈光效果，並提供多種快捷鍵和宏設定，讓玩家在遊戲和工作中皆能獲得流暢且精準的操作體驗。",
    images: "./images/pic-detal/RAZER-1000/10001.jpg",
  },
]);
const cartCount = computed(() => cartItems.value.length);
//購物車顯示資料
const cartView = computed(() => {
  return cartItems.value.map((item) => ({ ...item }));
});
</script>

<style scoped lang="scss">
.nav-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .setItem {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btnItem {
    border-bottom: 4px solid transparent;
    height: $headerHeight;
    padding: 4px 8px 0px;
    color: var(--text-primary);
    cursor: pointer;
    transform:
      color 0.4s ease,
      border-color 0.4s ease;
    @media (hover: hover) and (pointer: fine) {
      &:hover .icon {
        color: var(--brand-hover);
      }
      &:hover {
        border-color: var(--brand);
      }
    }
    .icon {
      font-size: clamp(22px, 2.2vw, 30px);
      @include baseTransition(color, 0.3s);
    }
  }
  .btnItem:active .icon {
    transform: scale(0.9);
    opacity: 0.85;
  }
  .search-area {
    position: relative;
    display: flex;
    margin: auto 0;
    .search-input {
      position: absolute;
      right: 0;
      width: 40px;
      opacity: 0;
      transition:
        width 0.6s ease,
        opacity 0.4s ease;
      &.isOpen {
        width: 200px;
        opacity: 1;
      }
      :deep(.el-input__wrapper) {
        box-shadow: none;
        padding: 4px 0;
        background-color: var(--bg-surface-strong);

        @media (hover: hover) and (pointer: fine) {
          &:hover,&:focus-within {
            background-color: var(--bg-surface);
            outline: 2px solid var(--brand);
          }
        }
      }
      .icon {
        margin: 0 8px;
      }
      @media (hover: hover) and (pointer: coarse) {
        display: none;
      }
    }
    .search-btn {
      .icon.active {
        color: var(--brand);
      }
    }
  }
  .cart-btn {
    position: relative;
    .cart-badge {
      position: absolute;
      top: 12px;
      right: -2px;

      min-width: 20px;
      height: 20px;
      padding: 0 6px;

      display: grid;
      place-items: center;

      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      line-height: 1;

      color: $color-white;
      background-color: var(--action-primary);
      pointer-events: none; // 不干擾點擊
    }
  }

  .miniCart {
    display: flex;
    // display: none;
    position: absolute;
    flex-direction: column;
    top: $headerHeight;
    right: 0px;

    max-height: 0px;
    width: 400px;
    margin-right: clamp(8px, 1.5vw, 16px);
    color: var(--text-secondary);
    background-color: var(--bg-surface);
    box-shadow: var(--shadow-default);

    border-radius: 0 0 4px 4px;
    @include baseTransition(max-height, 0.6s);
    overflow: hidden;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        max-height: 600px;
      }
    }
    .cart-view {
      padding: 16px;
      overflow-y: auto;
    }
    .cart-item {
      // width: 100%;
      min-height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 8px 4px;
      border-bottom: 1px solid var(--border-default);

      .item-img {
        margin: auto 0;
        img {
          max-width: 60px;
        }
      }

      .item-name {
        max-width: 100px;
        white-space: wrap;
        font-weight: 600;
        font-size: 14px;
      }
      .item-detal {
        p {
          font-size: 14px;
        }
        .price {
          min-width: 90px;
        }
      }

      .delete {
        position: relative;
        padding: 16px 0px 0px;
        margin: auto 0;
        color:var(--text-secondary);
        cursor: pointer;
        .icon {
          font-size: 36px;
          display: grid;
          place-items: center;
        }
        &:hover .icon {
          background-color: var(--state-danger);
          border: 2px solid transparent;
        }

        &::after {
          content: "刪除";
          position: absolute;
          top: -8px;
          font-size: 12px;
          right: 0;
          left: auto;

          transform: translate(0px, 0px);
          white-space: nowrap;
          width: auto;
          padding: 2px 4px;

          opacity: 0;
          visibility: hidden;
          border: 1px solid var(----state-danger);
          border-radius: 6px;
          color: var(--inverse);
          background: var(--bg-surface-soft);
        }

        &:hover::after {
          opacity: 0.6;
          visibility: visible;
        }
      }
    }
    .bottom-area {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 8px 16px 16px;
      h4 {
        font-weight: 900;
      }
      .btn {
        height: 32px;
      }
    }
  }
  @media (hover: hover) and (pointer: fine) {
    .cart-btn:hover + .miniCart {
      max-height: 600px;
      // background-color: #cf7e7e;
    }
  }
}
</style>
