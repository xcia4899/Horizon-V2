import type { MenuKey, OpenMenu } from "~/types/ui/menu";

export const useMenu = () => {
  const openMenu = useState<OpenMenu>("open-menu", () => null);

  const setOpenMenu = (name: OpenMenu) => {
    openMenu.value = name;
  };

  const toggleMenu = (name: MenuKey) => {
    openMenu.value = openMenu.value === name ? null : name;
  };

  const closeMenu = () => {
    openMenu.value = null;
  };

  return {
    openMenu,
    setOpenMenu,
    toggleMenu,
    closeMenu,
  };
};
