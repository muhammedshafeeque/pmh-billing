import { mainRoutes, nav } from "../routes";
import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";
import { GrSettingsOption } from "react-icons/gr";
import { TbNewSection } from "react-icons/tb";
import { BsHddRack } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { MdClass } from "react-icons/md";
export const HomeSidebar = [
  { name: "Home", nav: nav.HOME + mainRoutes.home, icon: AiOutlineHome },
  {
    name: "Shope Configuration",
    nav: nav.HOME + mainRoutes.shopConfig,
    icon: GrSettingsOption,
    sub: [
      {
        name: "section",
        nav: nav.HOME + mainRoutes.section,
        icon: TbNewSection,
      },
      { name: "Rack", nav: nav.HOME + mainRoutes.rack, icon: BsHddRack },
    ],
  },
  {
    name: "Stock Configs",
    nav: nav.HOME + mainRoutes.shopConfig,
    icon: CiShoppingCart,
    sub: [
      {
        name: "item",
        nav: nav.HOME + mainRoutes.item,
        icon: AiOutlineAppstore,
      },
      { name: "class", nav: nav.HOME + mainRoutes.rack, icon: MdClass },
      { name: "Stock", nav: nav.HOME + mainRoutes.stock, icon: MdClass },
    ],
  },
];
