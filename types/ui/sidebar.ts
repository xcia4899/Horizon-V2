export interface SidbarOption {
  label:string;
  value:string |number | object
}
export interface SidebarList {
  title:string
  key:string
  options:SidbarOption[]
}
