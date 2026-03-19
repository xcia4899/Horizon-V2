import { serverSupabaseServiceRole } from "#supabase/server";
import { productSeed } from "~~/server/data/productSeed";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);

  const { error: deleteError } = await client
    .from("products")
    .delete()
    .neq("id", "");

  if (deleteError) {
    throw createError({
      statusCode: 500,
      statusMessage: `刪除舊資料失敗：${deleteError.message}`,
    });
  }

  const { data, error: insertError } = await client
    .from("products")
    .upsert(productSeed, { onConflict: "id" })
    .select();

  if (insertError) {
    throw createError({
      statusCode: 500,
      statusMessage: `還原資料失敗：${insertError.message}`,
    });
  }

  return {
    ok: true,
    message: "商品資料已重置為預設狀態",
    count: data.length,
    data,
  };
});