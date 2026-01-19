<template>
  <aside class="nav-right">
    <div class="setItem search-area">
      <!-- 搜尋 Modal -->
      <div  class="search-input" :class="{ isOpen:showSearch}">
        <el-input
          ref="inputRef"
          v-model="keyword"
          placeholder="搜尋商品..."
          :prefix-icon="Search"
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
  </aside>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onBeforeUnmount } from "vue";
import { Search } from "@element-plus/icons-vue";
import type { InputInstance } from "element-plus";
//顯示搜尋框
const showSearch = ref(false);
//搜尋關鍵字
const keyword = ref("");
// 取得el-input 實例
const inputRef = ref<InputInstance | null>(null);

const closeSearch = () => {
  showSearch.value = false;
};
//搜尋功能
const submitSearch = () => {
  if (!keyword.value.trim()) return;
  closeSearch();
  //   navigateTo(`/search?keyword=${keyword.value}`);
  console.log(`搜尋關鍵字：${keyword.value} 並跳轉到商品頁`);
};
const toggleSearch = async () => {
  showSearch.value = !showSearch.value;
};
// ESC 關閉
const onKeydown = (e: KeyboardEvent) => {
  if (!showSearch.value) return;
  if (e.key === "Escape") closeSearch();
};
onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

// 開啟時自動 focus
watch(showSearch, async (v) => {
  if (!v) return;
  await nextTick();
  inputRef.value?.focus?.();
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
    display: flex;
    margin: auto 0;
    .search-input {
      display: flex;
      align-items: center;
      max-height: $headerHeight;
      opacity: 0;
      border-bottom: 0 solid transparent;

      @include baseTransition(0.4s);
      transform: translateX(4px);
      .el-input {
        width: 180px;
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
      margin-left: 8px;
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
  .cart-show {
    // display: none;
    color: $color-darkgery;
    position: absolute;
    top: $headerHeight;
    right: 0px;
    max-height: 00px;
    width: 400px;

    border-radius: 0 0 4px 4px;
    background-color: $color-white;

    font-size: 14px;
    font-weight: 600;
    color: $color-darkgery;

    transition: all 0.4s ease-out;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0px 2px 2px 0px rgba(22, 22, 22, 0.4);

    .cart-area {
      padding: 16px;
      overflow-y: auto;
      // padding-bottom: 60px;
    }

    .cartproductshow {
      width: 100%;
      min-height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 8px;
      border-bottom: 1px solid $color-middlekgery;

      img {
        max-width: 60px;
      }

      .itemname {
        max-width: 100px;
      }

      .itemprice {
        min-width: 90px;
      }

      .delete {
        cursor: pointer;
        border: 2px solid $color-middlekgery;
        border-radius: 50%;
        padding: 4px;

        &:hover {
          background-color: $color-purple;
          border: 2px solid transparent;
        }

        svg {
          transform: scale(1.2) rotate(45deg);
          border-radius: 50%;
        }

        &:hover svg {
          color: $color-white;
        }

        &::after {
          opacity: 0;
          visibility: hidden;
          content: "刪除";
          top: -28px;
          left: -6px;
          font-size: 12px;
          position: absolute;
          display: block;
          text-align: center;
          width: 36px;
          // width: 100%;
          border: 1px solid $color-darkgery;
          border-radius: 4px;
          padding: 2px;
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
      width: 100%;
      // position: absolute;
      // bottom: -50px;
      display: flex;
      justify-content: space-between;
      padding: 16px 16px;
      background-color: $color-white;

      a {
        display: block;
        width: auto;
      }

      h4 {
        font-weight: 900;
        letter-spacing: 0px;
      }

      .btn {
        height: 30px;
      }
    }
  }

  .cart-btn:hover + .cart-show {
    max-height: 600px;
    // background-color: #cf7e7e;
  }
}
</style>
