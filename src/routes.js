import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";


// Auth Imports

// Icon Imports
import {
  MdHome,
  MdBarChart,
} from "react-icons/md";

const routes = [
  {
    name: "Trang chủ",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
];
export default routes;
