<template>
  <div>
    <div>
      <AdminPageHeader title="熱門商品管理" desc="管理熱門商品資料" />
    </div>
    <div class="homeToolbar">
      <button type="button" class="admin-btn">feature</button>
      <button type="button" class="admin-btn">hero</button>
      <button type="button" class="admin-btn">promo</button>
      <button type="button" class="admin-btn">showcase</button>
    </div>
    <AdminDataList
      :tableTitle="tableTitle"
      :items="products"
      :grid-columns="gridColumns"
      empty-text="目前沒有商品資料"
    >
      <div
        v-for="(item, index) in 3"
        :key="item + index"
        class="data-row"
        :style="{ gridTemplateColumns: gridColumns }"
      >
        <div>item.id</div>
        <div>item.name</div>
        <div>$ item.price</div>

        <div class="actions">
          <button class="admin-btn">編輯</button>

          <button class="admin-btn delete-btn">刪除</button>
        </div>
      </div>
    </AdminDataList>
  </div>
</template>

<script setup lang="ts">
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

const gridColumns = computed(() => "2fr 5fr 3fr 2fr");
</script>

<style scoped lang="scss">
.homeToolbar{
  display: flex;
  // justify-content: center;
  gap: 32px;
  padding: 16px 4px;
  width: 100%;
  // background: #575757;
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
</style>
