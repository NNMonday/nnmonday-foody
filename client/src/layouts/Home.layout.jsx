import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

export default function HomeLayout() {
  return (
    <div className="px-32">
      <Navbar />
      <div className="mb-10">
        <Outlet />
      </div>
    </div>
  );
}
