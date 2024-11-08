import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader, DashboardSidebar } from "../components";
import PrivateRoute from "../routes/PrivateRoute";
import { paths } from "../utils/magic";
import { useAuth } from "../contexts/auth.context";
import { Dashboard, Dish, Document,User,File } from "../assets/SvgIcons";

const sidebarOptions = () => {
  const { currentUser } = useAuth();
  const result = [
    {
      ...paths[`${currentUser.role.name}Dashboard`],
      icon: <Dashboard />,
    },
  ];
  if (currentUser.role.name === "admin") {
    const addition = [
      { ...paths.adminUserList, icon: <User /> },
      { ...paths.adminUserDetail, icon: <User /> },
      { ...paths.adminMenu, icon: <Document /> },
      { ...paths.adminDishDetail, icon: <File /> },
      { ...paths.adminOrderList, icon: <Document /> },
    ];
    result.push(...addition);
  }
  if (currentUser.role.name === "restaurant") {
    const addition = [
      { ...paths.restaurantMenu, icon: <Document /> },
      { ...paths.restaurantOrderList, icon: <Dish /> },
    ];
    result.push(...addition);
  }
  if (currentUser.role.name === "customer") {
    const addition = [{ ...paths.customerOrderList, icon: <Dish /> }];
    result.push(...addition);
  }
  return result;
};

export default function DashboardLayout() {
  return (
    <PrivateRoute>
      <div className="h-screen flex">
        <DashboardSidebar sidebarOptions={sidebarOptions()} />
        <div className="w-4/5 flex flex-col">
          <DashboardHeader />
          <div className="flex-grow overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
