<template>
  <aside class="nav-right">
    <div class="setItem search-area">
      <!-- 搜尋 Modal -->
      <div class="search-input" :class="{ isOpen: showSearch }">
        <el-input
          ref="inputRef"
          v-model="keyword"
          placeholder="搜尋商品..."
          @keydown.enter="submitSearch"
        />
      </div>
      <!-- 搜尋 -->
      <button type="button" class="btnItem search-btn" @click="toggleSearch">
        <Icon
          name="mdi:magnify"
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
      <!-- 商品數量 -->
      <!-- <span v-if="cartCount > 0" class="cart-quantity"> {{ cartCount }} </span> -->
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
//顯示搜尋框
const showSearch = ref(false);
//搜尋關鍵字
const keyword = ref("");
// 取得el-input 實例
const inputRef = ref<InputInstance | null>(null);
//搜尋功能
const submitSearch = () => {
  if (!keyword.value.trim()) return;
  closeSearch();
  //   navigateTo(`/search?keyword=${keyword.value}`);
  console.log(`搜尋關鍵字：${keyword.value} 並跳轉到商品頁`);
};

//開關搜尋框
const toggleSearch = async () => {
  showSearch.value = !showSearch.value;
};
//關閉搜尋框
const closeSearch = () => {
  showSearch.value = false;
};
// ESC 關閉
const onKeydown = (e: KeyboardEvent) => {
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
    padding: 0px 8px;
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
      display: flex;
      align-items: center;
      right: 0px;

      max-height: $headerHeight;
      opacity: 0;
      margin-right: 4px;
      border-bottom: 0 solid transparent;

      @include baseTransition(0.4s);
      transform: translateX(4px);
      .el-input {
        width: 160px;
        height: 36px;
        --el-input-bg-color: #f0f0f0;
        // --el-input-border-color:#700741;
      }
      .close {
        cursor: pointer;
        .icon {
          font-size: clamp(24px, 2vw, 30px);
          color: $color-white;
        }
      }
    }
    .search-input.isOpen {
      opacity: 1;
      transform: translateX(0px);
    }
    .search-btn {
      .icon.active {
        color: #a02fec;
      }
    }
  }

  .cart-quantity {
    height: 24px;
    width: 24px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 50%;
    color: $color-white;
    background-color: $color-purple;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -24px;
    right: 0px;
  }

  .miniCart {
    // display: none;
    position: absolute;
    top: $headerHeight;
    right: 0px;

    max-height: 00px;
    width: clamp(360px, 40vw, 400px);
    // margin-right: clamp(8px, 1.5vw, 16px);
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

          transform: translate(0px,0px); 
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
