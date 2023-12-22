import React from "react";
import MainDashboard from "views/admin/default";
import {
  MdHome,
  MdBarChart, MdLocalGroceryStore,
} from "react-icons/md";
import MainIncome from "./views/admin/income/income";
import MainSpending from "./views/admin/spending/spending";

const routes = [
  {
    name: "Trang chủ",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Trang Thu nhập",
    layout: "/admin",
    path: "icome",
    icon: <MdBarChart  className="h-6 w-6" />,
    component: <MainIncome />,
  },
  {
    name: "Trang Chi tiêu",
    layout: "/admin",
    path: "spending",
    icon: <MdLocalGroceryStore   className="h-6 w-6" />,
    component: <MainSpending />,
  },
];
export default routes;
