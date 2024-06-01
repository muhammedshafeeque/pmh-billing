import { MdDashboard } from "react-icons/md";
import { ROUTERS } from "./Routes";
import { FaBoxes } from "react-icons/fa";
import { BsSignIntersectionSideFill } from "react-icons/bs";
export const SideBarItems = [
  { icon: MdDashboard, name: "Dashboard", path:ROUTERS.HOME_ROUTER },
  {
    icon: FaBoxes ,
    name: "Locations",
    children:[
      {
        icon: BsSignIntersectionSideFill,
        name: "Sections",
        path: ROUTERS.SECTION,
      },
      
    ]
  },

];

