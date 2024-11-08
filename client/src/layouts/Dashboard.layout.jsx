import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader, DashboardSidebar } from "../components";
import PrivateRoute from "../routes/PrivateRoute";
import { paths } from "../utils/magic";
import { useAuth } from "../contexts/auth.context";
import { Dashboard } from "../assets/SvgIcons";

const sidebarOptions = () => {
  const { currentUser } = useAuth();

  return [
    {
      ...paths[`${currentUser.role.name}Dashboard`],
      icon: <Dashboard />,
    },
  ];
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
