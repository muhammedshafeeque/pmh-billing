import { MdAccountBalanceWallet, MdDashboard, MdLocationSearching, MdOutlineAccountBalance, MdPayments, MdPeople } from "react-icons/md";
import { ROUTERS } from "./Routes";
import { FaBoxes, FaFileInvoiceDollar, FaSitemap, FaStoreAlt } from "react-icons/fa";
import {
  BsFillHddRackFill,
  BsFillInboxesFill,
  BsSignIntersectionSideFill,
} from "react-icons/bs";
import { RiAlignItemLeftFill, RiBillFill } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi2";
import { FaChartLine } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";


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
    icon: FaChartLine,
    name: "Accounts",
    children: [
      {
        icon: FaFileInvoiceDollar,
        name: "Invoices",
        path: "",
      },
      {
        icon: RiBillFill,
        name: "Bills",
        path: "",
      },
      {
        icon: MdPayments,
        name: "Payments",
        path: "",
      },
      {
        icon: MdAccountBalanceWallet,
        name: "Accounts",
        path: ROUTERS.ACCOUNTS,
      },
      {
        icon: TbReportAnalytics,
        name: "Reports",
        path: "",
      },
      {
        icon: MdOutlineAccountBalance,
        name: "Account Heads",
        path: ROUTERS.ACCOUNT_HEAD,
      },
      
    ],
  },
  {
    icon: HiIdentification,
    name: "Entity",
    children: [
      {
        icon: FaStoreAlt,
        name: "Vendors",
        path: ROUTERS.VENDOR,
      },
      {
        icon: MdPeople,
        name: "Customers",
        path: ROUTERS.CUSTOMERS,
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
