// 選單固定 ID
export  type MenuKey = "product" | "brand" | "event" | "about";
// 選單控制（ null 代表全部關閉）
export  type OpenMenu = MenuKey | null;

//下拉內容
export  interface MenuItem {
  text: string;
  img: string;
  tag?: string;
}
// 主選單結構
export  interface SetMenu {
  ID: MenuKey;
  label: string;
  items: MenuItem[];
}