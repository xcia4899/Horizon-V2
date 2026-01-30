import { ref } from "vue";
//讀取顯示開關
export function useFetchState() {
  const openContent = ref(false);
  const messageView = ref("點擊[按鈕]以獲取資料");

  const setState = (isOpen: boolean, message: string) => {
    openContent.value = isOpen;
    messageView.value = message;
  };

  return {
    openContent,
    messageView,
    setState
  };
}
//Promise 讀取時間設定
//setTimeout(resolve, ms)簡寫形式
export const looding = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));