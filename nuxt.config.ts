// nuxt.config.ts
export default defineNuxtConfig({
  // 渲染模式：開發時用 SSR 提高效率，部署至 GitHub Pages 時會自動轉為靜態 (SSG)
  ssr: true,

  // 鎖定 Nuxt 特性版本日期，確保未來升級時核心行為不變
  compatibilityDate: "2025-07-15",

  app: {
    // 部署路徑：若在 GitHub Pages (有子路徑) 則由環境變數決定，否則預設為根目錄 "/"
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
  },

  runtimeConfig: {
    public: {
      // 公開變數：對應 NUXT_PUBLIC_BACKEND_BASE_URL，用於前端 API 呼叫
      backendBaseURL: "",
    },
  },

  nitro: {
    prerender: {
      // 靜態化設定：自動爬取頁面連結，確保 build 時產生對應的 HTML 檔案
      crawlLinks: true,
      routes: ["/"],
      // 若個別頁面生成失敗，不中斷整體部署流程
      failOnError: false,
    },
  },

  devtools: { enabled: true },

  // 全局 CSS 檔案
  css: ["@/assets/scss/main.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 自動將變數與 Mixins 注入所有元件，不需手動 @import
          additionalData: `
            @use "@/assets/scss/variables.scss" as *;
            @use "@/assets/scss/mixins.scss" as *;
          `,
        },
      },
    },
  },

  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@element-plus/nuxt",
  ],

  image: {
    provider: "none",
    dir: "public",
    // 修正圖片路徑：自動處理 GitHub Pages 的子路徑前綴，避免圖片破圖
    alias: {
      "/images": process.env.NUXT_APP_BASE_URL
        ? `${process.env.NUXT_APP_BASE_URL}/images`.replace(/\/+/g, "/")
        : "/images",
    },
  },

  icon: {
    // 圖標設定：強制使用 CSS 模式並從遠端抓取，避免靜態環境下 API 路徑失效
    mode: 'css',
    serverBundle: "remote",
  },
});