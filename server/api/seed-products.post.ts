// import { serverSupabaseServiceRole } from "#supabase/server";
// import { productSeed } from "../data/productSeed";

// export default defineEventHandler(async (event) => {
//   const client = serverSupabaseServiceRole(event);

//   const { data, error } = await client
//     .from("products")
//     .upsert(productSeed, { onConflict: "id" })
//     .select();

//   if (error) {
//     throw createError({
//       statusCode: 500,
//       statusMessage: error.message,
//     });
//   }

//   return {
//     ok: true,
//     message: "商品種子資料匯入成功",
//     count: data.length,
//     data,
//   };
// });
