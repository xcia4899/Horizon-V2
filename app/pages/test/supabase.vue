<template>
  <section style="padding: 72px">
    <h1>Supabase 測試頁</h1>

    <p v-if="pending">資料讀取中...</p>
    <p v-else-if="errorMsg">{{ errorMsg }}</p>

    <ul v-else>
      <li v-for="item in products" :key="item.id">
        {{ item.name }} - ${{ item.price }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
type Product = {
  id: number;
  name: string;
  price: number;
  created_at: string;
};

const supabase = useSupabaseClient();

const products = ref<Product[]>([]);
const pending = ref(false);
const errorMsg = ref("");

const fetchProducts = async () => {
  pending.value = true;
  errorMsg.value = "";

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;

    products.value = data ?? [];
  } catch (error: unknown) {
    console.error("讀取 products 失敗：", error);

    if (error instanceof Error) {
      errorMsg.value = error.message;
    } else {
      errorMsg.value = "讀取失敗";
    }
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>
