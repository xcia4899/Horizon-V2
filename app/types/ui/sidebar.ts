export interface SidbarOption {
  label:string;
  value:string |number
}
export interface SidebarList {
  title:string
  key:string
  type:string
  options:SidbarOption[]
}