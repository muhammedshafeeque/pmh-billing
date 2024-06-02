import { MdDashboard } from "react-icons/md";
import { ROUTERS } from "./Routes";
import { FaBoxes, FaSitemap } from "react-icons/fa";
import {
  BsFillHddRackFill,
  BsFillInboxesFill,
  BsSignIntersectionSideFill,
} from "react-icons/bs";
import { MdLocationSearching } from "react-icons/md";
import { RiAlignItemLeftFill } from "react-icons/ri";

export const SideBarItems = [
  { icon: MdDashboard, name: "Dashboard", path: ROUTERS.HOME_ROUTER },
  {
    icon: FaBoxes,
    name: "Stocks",
    children: [
      {
        icon: BsFillInboxesFill,
        name: "Stock",
        path: ROUTERS.STOCK,
      },
      {
        icon: RiAlignItemLeftFill,
        name: "Item",
        path: ROUTERS.ITEM,
      },
      {
        icon: FaSitemap,
        name: "Category",
        path: ROUTERS.GROUPE,
      },
    ],
  },
  {
    icon: MdLocationSearching,
    name: "Locations",
    children: [
      {
        icon: BsFillHddRackFill,
        name: "Racks",
        path: ROUTERS.RACK,
      },
      {
        icon: BsSignIntersectionSideFill,
        name: "Sections",
        path: ROUTERS.SECTION,
      },
    ],
  },
];
