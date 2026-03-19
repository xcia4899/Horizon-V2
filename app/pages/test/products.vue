<template>
  <section style="padding: 72px">
    <h1>商品匯入 測試頁</h1>
    <button class="btn" @click="seedProducts">匯入商品資料</button>
    <br/>
    <p v-if="pending">資料讀取中...</p>
    <p v-else-if="errorMsg">{{ errorMsg }}</p>

    <ul v-else>
      <li v-for="item in products" :key="item.id">
        {{ item.id }} - {{ item.brand }} - {{ item.name }} - ${{ item.price }} -
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Database } from "@/types/database.types";

type Product = Database["public"]["Tables"]["products"]["Row"];

const supabase = useSupabaseClient<Database>();

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

    const rows: Product[] = (data ?? []) as Product[];
    products.value = rows;
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

const seedProducts = async () => {
  pending.value = true;
  errorMsg.value = "";

  try {
    const result = await $fetch("/api/seed-products", {
      method: "POST",
    });

    console.log("匯入成功", result);

    await fetchProducts();
  } catch (error: unknown) {
    console.error("匯入失敗", error);

    if (error instanceof Error) {
      errorMsg.value = error.message;
    } else {
      errorMsg.value = "匯入失敗";
    }
  } finally {
    pending.value = false;
  }
};
// onMounted(fetchProducts);
</script>
