<template>
  <div class="setItem search-area">
    <!-- 搜尋 Modal -->
    <div class="search-input" :class="{ isOpen: showSearch || hasKeyword }">
      <el-input
        ref="inputRef"
        v-model="keyword"
        placeholder="搜尋商品..."
        class="input-box"
        @blur="blurSearch"
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
        :name="showSearch || hasKeyword ? 'mdi:close' : 'mdi:magnify'"
        class="icon"
        :class="{ active: showSearch || hasKeyword }"
        size="24"
      />
    </button>
  </div>

  <!-- 登入 -->
  <button type="button" class="btnItem setItem login-btn" @click="goToLogin">
    <Icon name="mdi:account-circle" class="icon" size="24" />
  </button>
  <!-- 購物車 -->
  <button type="button" class="btnItem setItem cart-btn" @click="goToCart">
    <Icon name="meteor-icons:cart-shopping" class="icon" size="24" />
    <span v-if="cartCount > 0" class="cart-badge">
      {{ cartCount > 99 ? "99+" : cartCount }}
    </span>
  </button>

  <!-- 迷你購物車顯示 -->
  <div class="miniCart">
    <div class="cart-view">
      <div v-for="item in carts" :key="item.product.id" class="cart-item">
        <div class="item-img">
          <img :src="item.product.images.main" :alt="item.product.name" />
          <p class="item-name">{{ item.product.name }}</p>
        </div>
        <div class="item-detal">
          <p>數量:{{ item.quantity }}</p>
          <p class="price">
            小計:{{ (item.quantity * item.product.price).toLocaleString() }}
          </p>
        </div>
        <div class="delete" @click="''">
          <Icon name="mdi:delete-circle-outline" class="icon" />
        </div>
      </div>
    </div>
    <div class="bottom-area">
      <h4>總金額：{{ totalPrice.toLocaleString() }}元</h4>
      <button class="btn">結帳</button>
    </div>
  </div>
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
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/useCart";

//接收props
const props = defineProps<{
  isMenuOpenMobile: boolean;
}>();
//傳出emit
const emit = defineEmits<{
  (e: "update:isMenuOpenMobile", value: boolean): void;
}>();

const toggleMenuMobile = () => {
  emit("update:isMenuOpenMobile", !props.isMenuOpenMobile);
};

const route = useRoute();
const router = useRouter();
// 取得el-input 實例
const inputRef = ref<InputInstance | null>(null);
//螢幕、手機模式判斷
const { isDesktop } = useInteractionMode();

//搜尋關鍵字
const keyword = ref("");
//顯示搜尋框
const showSearch = ref(false);
//keyword是否有值，用來判斷是否關閉搜尋框
const hasKeyword = computed(() => !!keyword.value?.trim());

//判斷是否在商品頁面
const isOnProducts = computed(() => route.path === "/products");

/* ---------購物車程式碼--------- */
//購物車原始資料
const cartStore = useCartStore();
//購物車顯示資料
const { carts } = storeToRefs(cartStore);
//booleam判斷
const cartCount = computed(() => carts.value.length);
//判斷總價

const totalPrice = computed(() => {
  return carts.value.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );
});

// 點擊搜尋/關閉按鈕
const onSearchClick = async () => {
  if (!showSearch.value) {
    showSearch.value = true;
    return;
  }
  //在商品頁就關閉
  if (isOnProducts.value) {
    await clearSearch();
    return;
  }
  // 不再商品頁但有關鍵字
  if (hasKeyword.value) {
    keyword.value = "";
    return;
  }

  showSearch.value = false;
};

//清除關鍵字關閉搜索框
const clearSearch = async () => {
  keyword.value = "";
  showSearch.value = false;
  //  只要 URL 目前有 keyword，就把它移除（不換頁）
  if ("keyword" in route.query) {
    const newQuery = { ...route.query };
    delete newQuery.keyword;
    await router.replace({
      path: route.path, // 保持當前頁面
      query: newQuery, // 只更新 query
    });
  }
};

const blurSearch = () => {
  if (hasKeyword.value) return;
  showSearch.value = false;
  clearSearch();
};

// ESC 關閉
const onKeydown = (e: KeyboardEvent) => {
  if (!isDesktop.value) return;
  if (!showSearch.value) return;
  if (e.key === "Escape") clearSearch();
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
// 開啟時自動 focus

watch(showSearch, async (value) => {
  if (!value) return;
  await nextTick();
  inputRef.value?.focus?.();
});
// 當路由變動時：如果在 /products，就把 query.keyword 回填到 input
watch(
  () => [route.path, route.query.keyword],
  ([path, q]) => {
    if (path === "/products") {
      keyword.value = String(q ?? "").trim();
    }
  },
  { immediate: true },
);

//搜尋功能
const submitSearch = async () => {
  const q = keyword.value.trim();
  // closeSearch();
  await navigateTo({
    path: "/products",
    query: { keyword: q },
  });
  toggleMenuMobile();
};

// 跳轉登入
const goToLogin = async () => {
  await looding(100);
  await navigateTo("/auth/login");
};
const goToCart = async () => {
  await looding(100);
  await navigateTo("/cart");
};
</script>

<style scoped lang="scss">
.setItem {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnItem {
  border-bottom: 4px solid transparent;
  height: $headerHeight;
  padding-block: 4px 0px;
  padding-inline: clamp(8px, 1vw, 16px);
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
      background: var(--bg-surface-card);

      @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:focus-within {
          background: var(--bg-surface);
          outline: 2px solid var(--brand);
        }
      }
      @media (pointer: coarse) {
        height: 40px;
        .el-input__inner {
          height: 40px;
        }
      }
    }
    .icon {
      margin: 0 8px;
    }
  }
  .search-btn {
    .icon.active {
      color: var(--brand);
    }
  }
  @media (max-width: 768px) {
    flex: 1;
    justify-content: flex-end;
    gap: 8px;
    .search-input {
      position: relative;
      right: 0;
      opacity: 1;
      width: 100%;

      &.isOpen {
        width: 100%;
      }
    }
  }
}
.cart-btn {
  position: relative;
  .cart-badge {
    position: absolute;
    top: 12px;
    right: 2px;

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
    pointer-events: none;
    /* // 不干擾點擊 */
  }
}

.miniCart {
  display: flex;

  position: absolute;
  flex-direction: column;
  top: $headerHeight;
  right: 0px;

  max-height: 0px;
  width: 400px;
  margin-right: $padding-RWD;
  color: var(--text-secondary);
  background-color: var(--bg-surface);
  box-shadow: var(--shadow-default);

  border-radius: 0 0 4px 4px;
  transition: max-height 0.6s ease;
  overflow: hidden;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      max-height: 600px;
    }
  }
  .cart-view {
    padding: 16px;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .cart-item {
    min-height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 8px 4px;
    border-bottom: 1px solid var(--border-default);

    .item-img {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      // margin: auto 0;

      img {
        max-width: 60px;
      }
      .item-name {
        // max-width: 100px;
        white-space: wrap;
        font-weight: 600;
        font-size: 14px;
      }
    }

    .item-detal {
      flex: 0 0 30%;
      display: grid;
      gap: 4px;
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
      // margin: auto 0;
      color: var(--text-secondary);
      cursor: pointer;
      .icon {
        font-size: 36px;
        display: grid;
        place-items: center;
      }
      @media (hover: hover) {
        &:hover .icon {
          background-color: var(--state-danger);
          border: 2px solid transparent;
        }
      }

      &::after {
        content: "刪除";
        position: absolute;
        top: -8px;
        font-size: 12px;
        right: 0px;
        left: auto;

        transform: translate(0px, 0px);
        white-space: nowrap;
        width: auto;
        padding: 2px 4px;

        opacity: 0;
        visibility: hidden;
        border: 1px solid var(--state-danger);
        border-radius: 6px;
        color: var(--text-primary);
      }
      @media (hover: hover) {
        &:hover::after {
          opacity: 0.6;
          visibility: visible;
        }
      }
      &:active .icon {
        transform: scale(0.9);
        color: var(--text-secondary);
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
  }
}
</style>
