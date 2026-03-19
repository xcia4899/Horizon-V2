import { serverSupabaseServiceRole } from "#supabase/server";
import { productSeed } from "~~/server/data/productSeed";

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event);

  const { data, error } = await client
    .from("products")
    .upsert(productSeed, { onConflict: "id" })
    .select();

  if (error) {
    console.error("seed-products error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return {
    ok: true,
    count: data?.length ?? 0,
    data,
  };
});
