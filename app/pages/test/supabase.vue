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
import type { Database } from "@/types/database.types";

type Product = Database["public"]["Tables"]["test_products"]["Row"];

const supabase = useSupabaseClient<Database>();

const products = ref<Product[]>([]);
const pending = ref(false);
const errorMsg = ref("");

const fetchProducts = async () => {
  pending.value = true;
  errorMsg.value = "";

  try {
    const { data, error } = await supabase
      .from("test_products")
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

// onMounted(fetchProducts);
</script>
