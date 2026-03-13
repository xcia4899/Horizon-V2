<template>
  <div class="admin-page">
    <AdminPageHeader title="商品管理" desc="管理網站商品資料" />

    <button class="admin-btn add-btn" @click="handleAddProduct">
      新增商品
    </button>
    <section class="page-content">
      <AdminDataList
        :tableTitle="tableTitle"
        :items="products"
        :grid-columns="gridColumns"
        empty-text="目前沒有商品資料"
      >
        <div
          v-for="item in products"
          :key="item.id"
          class="data-row"
          :style="{ gridTemplateColumns: gridColumns }"
        >
          <div>{{ item.id }}</div>
          <div>{{ item.name }}</div>
          <div>${{ item.price }}</div>

          <div class="actions">
            <button class="admin-btn" @click="editProduct(item.id)">
              編輯
            </button>

            <button
              class="admin-btn delete-btn"
              @click="deleteProduct(item.id)"
            >
              刪除
            </button>
          </div>
        </div>
      </AdminDataList>
    </section>
     <button class="admin-btn add-btn" @click="handleAddProduct">
      儲存
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

definePageMeta({
  layout: "admin",
});

interface Product {
  id: string;
  name: string;
  price: number;
}

interface AdminColumn {
  key: string;
  label: string;
}

const tableTitle: AdminColumn[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "商品名稱" },
  { key: "price", label: "價格" },
  { key: "actions", label: "操作" },
];

const products = ref<Product[]>([
  { id: "1", name: "Gaming Keyboard", price: 2990 },
  { id: "2", name: "Gaming Mouse", price: 1990 },
]);

const gridColumns = computed(() => "1fr 5fr 2fr 2fr");

const handleAddProduct = () => {
  console.log("新增商品");
};

const editProduct = (id: string) => {
  console.log("編輯商品:", id);
};

const deleteProduct = (id: string) => {
  products.value = products.value.filter((p) => p.id !== id);
};
</script>
<style scoped lang="scss">
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--text-primary);
}

.page-content {
  display: grid;
  gap: 8px;
}

.data-row {
  display: grid;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-default);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--bg-surface-soft);
  }
}

.actions {
  display: flex;
  gap: 8px;
}

.add-btn {
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: var(--brand);
      color: $color-white;
    }
  }
}

.delete-btn {
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: var(--state-danger);
      border-color: var(--state-danger);
    }
  }
}
</style>
