// Admin Imports
import MainDashboard from "views/admin/default";

import Profile from "views/admin/profile";
// Icon Imports
import {
  MdHome,
  MdPerson,
  MdDashboard,
  MdLock,
  MdDoorFront,
} from "react-icons/md";
import { PiPlugsConnectedFill } from "react-icons/pi";
import Dashboard from "views/admin/dashboard";
import Api from "views/admin/api";
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";

const routes = [
  {
    name: "Home",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard/*",
    icon: <MdDashboard className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "API",
    layout: "/admin",
    path: "api",
    icon: <PiPlugsConnectedFill className="h-6 w-6" />,
    component: <Api />,
  },

  // {
  //   name: "Main Dashboard",
  //   layout: "/admin",
  //   path: "dashboard",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <MainDashboard />,
  // },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
