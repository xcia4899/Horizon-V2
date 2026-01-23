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
        @click="toggleSearch"
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
  if(!isDesktop.value) return;
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
  //   gap: 20px;
  .setItem {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btnItem {
    border-bottom: 4px solid transparent;
    height: $headerHeight;
    padding: 4px 8px 0px;
    cursor: pointer;
    @include baseTransition(0.4s);
    &:hover .icon {
      color: #a02fec;
      // height: 100%;
    }
    &:hover {
      border-color: $color-purple;
    }
    .icon {
      color: $color-white;
      font-size: clamp(22px, 2.2vw, 30px);
      @include baseTransition(0.4s);
    }
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
      @include baseTransition(0.6s);
      // transform: translateX(4px);
      &.isOpen {
        width: 200px;
        opacity: 1;
      }
      :deep(.el-input__wrapper) {
        box-shadow: none;
        padding: 4px 0;
        // background-color: #ffffff;
      }
      .icon {
        margin: 0 8px;
      }
    }
    .search-btn {
      .icon.active {
        color: #a02fec;
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
      background-color: $color-purple;
      pointer-events: none; // 不干擾點擊
    }
  }

  .miniCart {
    // display: none;
    position: absolute;
    top: $headerHeight;
    right: 0px;

    max-height: 00px;
    width: clamp(360px, 40vw, 400px);
    margin-right: clamp(8px, 1.5vw, 16px);
    color: $color-darkgery;
    background-color: $color-white;
    border-radius: 0 0 4px 4px;
    box-shadow: 0px 2px 2px 0px rgba(22, 22, 22, 0.4);

    @include baseTransition(1s);
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .cart-view {
      padding: 16px 16px 16px;
      overflow-y: auto;
      // padding-bottom: 60px;
    }

    .cart-item {
      // width: 100%;
      min-height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 8px 4px;
      border-bottom: 1px solid $color-middlekgery;
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
      }
      .item-detal {
        p {
          font-weight: 600;
        }
        .price {
          min-width: 90px;
        }
      }

      .delete {
        position: relative;
        cursor: pointer;
        padding: 16px 0px 0px;
        margin: auto 0;
        .icon {
          font-size: clamp(36px, 3vw, 40px);
          display: grid;
          place-items: center;
        }
        &:hover .icon {
          background-color: $color-purple;
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
          border: 1px solid $color-darkgery;
          border-radius: 6px;
          background: #fff;
        }

        &:hover::after {
          opacity: 0.6;
          visibility: visible;
        }
      }
    }

    &:hover {
      max-height: 600px;
    }
    .bottom-area {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      padding: 16px 16px 16px;
      background-color: $color-white;
      h4 {
        font-weight: 900;
        // letter-spacing: 0px;
      }

      .btn {
        height: 30px;
      }
    }
  }

  .cart-btn:hover + .miniCart {
    max-height: 600px;
    // background-color: #cf7e7e;
  }
}
</style>
