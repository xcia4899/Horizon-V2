<template>
  <div v-show="true" class="pagination">
    <button :disabled="currentPage === 1" @click="prevPage">上一頁</button>
    <button v-for="page in totalPages" :key="page" @click="goToPage(page)">
      {{ page }}
    </button>
    <button :disabled="currentPage === totalPages" @click="nextPage">
      下一頁
    </button>
  </div>
</template>

<script setup lang="ts">
// import { ref, computed, watch } from "vue";
import { looding } from "@/composables/useFetchState";

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
</style>
