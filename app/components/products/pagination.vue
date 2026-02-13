<template>
  <div v-show="true" class="pagination">
    <button :disabled="currentPage === 1" @click="prevPage">上一頁</button>
    <button
      v-for="page in totalPages"
      :key="page"
      class="page"
      :class="{ active: currentPage === page }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
    <button
      class="nextPage"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      下一頁
    </button>
  </div>
</template>

<script setup lang="ts">
// import { ref, computed, watch } from "vue";
import { looding } from "@/composables/useFetchState";

const activeIndex = ref(1);

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();
const emit = defineEmits<{
  (e: "update:currentPage", value: number): void;
}>();
const { currentPage, totalPages } = toRefs(props);

const goToPage = async (page: number) => {
  await looding(100);
  emit("update:currentPage", page);
};
const prevPage = async () => {
  await looding(100);
  if (currentPage.value > 1) emit("update:currentPage", currentPage.value - 1);
};
const nextPage = async () => {
  await looding(100);
  if (currentPage.value < totalPages.value)
    emit("update:currentPage", currentPage.value + 1);
};
</script>

<style scoped lang="scss">
//換頁UI
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  //   padding-block: 16px;
  margin-top: 32px;
  gap: 8px;

  flex-wrap: wrap;
  button {
    padding: 6px 12px;
    font-size: clamp(14px, 1.5vw, 16px);
    font-weight: 500;
    height: 100%;
    color: $color-black;
    border: 1px solid $color-gray-500;
    background: $color-gray-200;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.3s ease;
  }
  @media (hover: hover) and (pointer: fine) {
    & button:hover:not(.active, :disabled) {
      color: $color-purple-700;
      border-color: $color-purple-700;
      background: $color-gray-50;
    }
  }

  .page.active {
    color: $color-white;
    background: $color-purple-500;

    // font-weight: bold;
  }
  button:disabled {
    opacity: 0.6;
    background: $color-gray-400;
    cursor: not-allowed;
  }
}
</style>
