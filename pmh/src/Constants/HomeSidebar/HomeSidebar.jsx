import { mainRoutes, nav } from "../routes";
import { AiOutlineHome } from "react-icons/ai";
import { GrSettingsOption } from "react-icons/gr";
import {TbNewSection} from 'react-icons/tb'
import {BsHddRack} from 'react-icons/bs'
export const HomeSidebar = [
  { name: "Home", nav: nav.HOME + mainRoutes.home, icon: AiOutlineHome },
  {
    name: "Shope Configuration",
    nav: nav.HOME + mainRoutes.shopConfig,
    icon: GrSettingsOption,
    sub: [
      { name: "section", nav: nav.HOME+mainRoutes.section, icon: TbNewSection },
      { name: "Rack", nav: nav.HOME+mainRoutes.rack, icon:BsHddRack },
    ],
  },
];
