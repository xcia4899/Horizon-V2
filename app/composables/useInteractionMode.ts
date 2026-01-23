import { ref, computed, type Ref } from 'vue';

// 裝置互動模式
// desktop：支援滑鼠 hover 的桌機環境
// touch：以點擊為主的觸控裝置
export type InteractionMode = 'desktop' | 'touch';

// 全站共用的互動模式狀態
// 使用 module scope，確保所有元件拿到的是同一份資料
let _mode: Ref<InteractionMode> | null = null;

// 是否已初始化過（避免重複註冊 matchMedia 監聽）
let inited = false;
export function useInteractionMode() {
  // 第一次使用時建立狀態，SSR / CSR 初始值一致
  if (!_mode) {
    _mode = ref<InteractionMode>('desktop');
  }
  // 僅在 client 端初始化一次
  if (import.meta.client && !inited) {
    inited = true;
    // 判斷是否為支援 hover 的精細指標裝置（滑鼠）
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    // 根據媒體查詢結果更新互動模式
    const apply = () => {
      _mode!.value = mq.matches ? 'desktop' : 'touch';
    };
    // 初始化時先判斷一次
    apply();
    // 當裝置互動能力改變時（例如平板接上滑鼠）自動更新
    mq.addEventListener?.('change', apply);
  }
  return {
    // 原始互動模式（需要時可直接使用）
    interactionMode: _mode,
    // 是否為桌機互動模式（hover）
    isDesktop: computed(() => _mode!.value === 'desktop'),
    // 是否為觸控互動模式（click）
    isTouch: computed(() => _mode!.value === 'touch'),
  };
}
