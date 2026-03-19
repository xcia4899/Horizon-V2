<script setup lang="ts">
import type { Database } from "@/types/database.types";

type ProductInsert = Database["public"]["Tables"]["test_products"]["Insert"];

const supabase = useSupabaseClient<Database>();

const form = ref({
  name: "",
  price: 0,
  brand: "",
  category: "",
  image: "",
  description: "",
});

const pending = ref(false);
const message = ref("");

const resetForm = () => {
  form.value = {
    name: "",
    price: 0,
    brand: "",
    category: "",
    image: "",
    description: "",
  };
};

const createProduct = async () => {
  pending.value = true;
  message.value = "";

  try {
    const payload: ProductInsert = {
      name: form.value.name,
      price: form.value.price,
      brand: form.value.brand || null,
      category: form.value.category || null,
      image: form.value.image || null,
      description: form.value.description || null,
    };

    const { data, error } = await supabase
      .from("test_products")
      .insert([payload]);

    console.log("data:", data);
    console.log("error:", error);

    if (error) throw error;

    message.value = "新增成功";
    resetForm();
  } catch (error: unknown) {
    console.error("新增 products 失敗：", error);

    if (error instanceof Error) {
      message.value = error.message;
    } else {
      message.value = "新增失敗";
    }
  } finally {
    pending.value = false;
  }
};
</script>

<template>
  <section style="padding: 72px; max-width: 640px">
    <h1>新增商品測試</h1>

    <form @submit.prevent="createProduct">
      <div style="margin-bottom: 12px">
        <label>商品名稱</label>
        <input
          v-model="form.name"
          type="text"
          style="display: block; width: 100%"
        />
      </div>

      <div style="margin-bottom: 12px">
        <label>價格</label>
        <input
          v-model.number="form.price"
          type="number"
          style="display: block; width: 100%"
        />
      </div>

      <div style="margin-bottom: 12px">
        <label>品牌</label>
        <input
          v-model="form.brand"
          type="text"
          style="display: block; width: 100%"
        />
      </div>

      <div style="margin-bottom: 12px">
        <label>分類</label>
        <input
          v-model="form.category"
          type="text"
          style="display: block; width: 100%"
        />
      </div>

      <div style="margin-bottom: 12px">
        <label>圖片</label>
        <input
          v-model="form.image"
          type="text"
          style="display: block; width: 100%"
        />
      </div>

      <div style="margin-bottom: 12px">
        <label>描述</label>
        <textarea
          v-model="form.description"
          style="display: block; width: 100%"
        ></textarea>
      </div>

      <button type="submit" :disabled="pending">
        {{ pending ? "新增中..." : "新增商品" }}
      </button>
    </form>

    <p v-if="message" style="margin-top: 16px">
      {{ message }}
    </p>
  </section>
</template>
