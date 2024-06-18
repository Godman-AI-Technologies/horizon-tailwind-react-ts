import { Dashboard } from "pages/Dashboard";
import { Documentation } from "pages/Documentation";
import { Home } from "pages/Home";
import { Profile } from "pages/Profile";
import { MdHome, MdPerson, MdDashboard } from "react-icons/md";
import { PiPlugsConnectedFill } from "react-icons/pi";

const routes = [
  {
    name: "Home",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Home />,
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
    component: <Documentation />,
  },
];
export default routes;
