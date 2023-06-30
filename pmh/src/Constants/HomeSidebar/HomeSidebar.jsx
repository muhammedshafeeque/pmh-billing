import { mainRoutes, nav } from "../routes";
import { AiOutlineHome } from "react-icons/ai";
import { GrSettingsOption } from "react-icons/gr";
export const HomeSidebar = [
  { name: "Home", nav: nav.HOME + mainRoutes.home, icon: AiOutlineHome },
  {
    name: "Shope",
    nav: nav.HOME + mainRoutes.shopConfig,
    icon: GrSettingsOption,
  },
];
