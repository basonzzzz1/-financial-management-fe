import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import DataTables from "views/admin/tables";


// Auth Imports

// Icon Imports
import {
  MdHome,
  MdBarChart,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
];
export default routes;
