// composables/useImageResolver.ts
export const useImageResolver = () => {
  const config = useRuntimeConfig();

  // 這裡要明確定義類型，避免 TypeScript 猜錯
  const resolveImg = (path: string | null | undefined): string => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const base = config.app.baseURL;
    return `${base}/${path}`.replace(/\/+/g, '/');
  };

  // 必須回傳一個物件，裡面包含這個函數
  return {
    resolveImg
  };
};