<template>
  <div class="admin-home">
    <AdminPageHeader title="Banner管理" desc="管理Banner商品資料" />

    <div class="homeToolbar">
      <button
        v-for="section in sections"
        :key="section.value"
        type="button"
        class="admin-btn"
        :class="{ 'is-active': activeSection === section.value }"
        @click="activeSection = section.value"
      >
        {{ section.label }}
      </button>
    </div>

    <AdminDataList
      :tableTitle="tableTitle"
      :items="currentItems"
      :grid-columns="gridColumns"
      empty-text="目前沒有商品資料"
    >
      <div
        v-for="item in currentItems"
        :key="item.id"
        class="data-row"
        :style="{ gridTemplateColumns: gridColumns }"
      >
        <div>{{ item.id }}</div>
        <div>{{ item.name }}</div>


        <div class="actions">
          <button class="admin-btn" @click="editItem(item.id)">編輯</button>
          <button class="admin-btn delete-btn" @click="deleteItem(item.id)">
            刪除
          </button>
        </div>
      </div>
    </AdminDataList>

    <button class="admin-btn save-btn">儲存</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

type HomeSection = "Home" | "detail" | "products" ;

interface Product {
  id: string;
  name: string;

}

interface AdminColumn {
  key: string;
  label: string;
}

type HomeSectionMap = Record<HomeSection, Product[]>;

const tableTitle: AdminColumn[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "商品名稱" },
  { key: "actions", label: "操作" },
];

const sections: { value: HomeSection; label: string }[] = [
  { value: "Home", label: "Home" },
  { value: "detail", label: "detail" },
  { value: "products", label: "products" },

];

const activeSection = ref<HomeSection>("Home");

const dataSeed: HomeSectionMap = {
  Home: [
    { id: "1", name: "Gaming Keyboard Pro" },
    { id: "2", name: "Ultra Gaming Mouse" },
    { id: "3", name: "RGB Mouse Pad" },
  ],
  detail: [
    { id: "4", name: "Wireless Gaming Headset" },
    { id: "5", name: "Mechanical Keyboard Switch Kit" },
  ],
  products: [
    { id: "6", name: "4K Gaming Monitor" },
    { id: "7", name: "Ergonomic Gaming Chair" },
    { id: "8", name: "USB-C Gaming Dock" },
  ],
};

const homeSectionData = ref<HomeSectionMap>({
  Home: [],
  detail: [],
  products: [],

});

const fetchHomeSections = () => {
  homeSectionData.value = dataSeed;
};

// const updateSection = (section: HomeSection, items: Product[]) => {
//   homeSectionData.value[section] = items;
// };

const currentItems = computed(() => {
  return homeSectionData.value[activeSection.value];
});

const gridColumns = computed(() => "2fr 5fr 3fr 2fr");

const editItem = (id: string) => {
  const target = homeSectionData.value[activeSection.value].find(
    (item) => item.id === id,
  );
  if (!target) return;

  console.log("編輯區塊:", activeSection.value, "資料:", target);
};

const deleteItem = (id: string) => {
  homeSectionData.value[activeSection.value] = homeSectionData.value[
    activeSection.value
  ].filter((item) => item.id !== id);
};

onMounted(() => {
  fetchHomeSections();
});
</script>

<style scoped lang="scss">
.admin-home {
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--text-primary);
}
.homeToolbar {
  display: flex;
  gap: 16px;
  padding: 16px 4px;
  width: 100%;
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

.is-active {
  background: var(--brand-hover);
  color: #fff;
}
</style>
