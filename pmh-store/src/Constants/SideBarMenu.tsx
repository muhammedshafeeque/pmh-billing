import { MdAccountBalanceWallet, MdDashboard, MdOutlineAccountBalance, MdPayments, MdPeople } from "react-icons/md";
import { ROUTERS } from "./Routes";
import { FaBoxes, FaFileInvoiceDollar, FaSitemap, FaStoreAlt } from "react-icons/fa";
import {
  BsFillHddRackFill,
  BsFillInboxesFill,
  BsSignIntersectionSideFill,
} from "react-icons/bs";
import { RiAlignItemLeftFill, RiBillFill, RiBillLine } from "react-icons/ri";
import { HiIdentification } from "react-icons/hi2";
import { FaChartLine, FaMoneyBillTransfer } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { SiReact } from "react-icons/si";
import { GiCash } from "react-icons/gi";



export const SideBarItems = [
  { icon: MdDashboard, name: "Dashboard", path: ROUTERS.HOME_ROUTER },
  { icon: RiBillLine, name: "Invoicing", path: ROUTERS.INVOICE },
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
        path: ROUTERS.INVOICES,
      },
      {
        icon: RiBillFill,
        name: "Bills",
        path: "",
      },
      {
        icon: GiCash,
        name: "Collections",
        path: "",
      },
      {
        icon: MdPayments,
        name: "Payments",
        path: ROUTERS.PAYMENTS,
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
      {
        icon: FaMoneyBillTransfer,
        name: "Transactions",
        path: ROUTERS.TRANSACTIONS,
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
    icon: SiReact,
    name: "Core",
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
      {
        icon: MdPayments,
        name: "UPI configuration",
        path: '',
      },
    ],
  },
];
