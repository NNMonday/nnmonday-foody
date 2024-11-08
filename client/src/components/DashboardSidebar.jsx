import React from "react";
import { Link, NavLink } from "react-router-dom";
import { paths } from "../utils/magic";
import { logo } from "../assets/imgs";
import { Setting } from "../assets/SvgIcons";
import { useAuth } from "../contexts/auth.context";

const DashboardSidebar = ({ sidebarOptions }) => {
  const { currentUser } = useAuth();

  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between px-5 py-7 shadow-md bg-gray-100 w-1/5 admin-sidebar">
      <div className="w-full">
        <Link to={paths.homepage.url} className="flex items-center mb-8 pl-3">
          <img src={logo} alt="logo" width={40} height={40} />
          <span className="ml-2 font-medium text-2xl">OJTEDU</span>
        </Link>
        {sidebarOptions?.map((option, i) => (
          <NavLink
            key={i}
            to={option.url}
            className="flex p-3 mt-3 rounded-r-md hover:bg-gray-200"
          >
            {option.icon}
            <span className="ml-2">{option.name}</span>
          </NavLink>
        ))}
      </div>

      <NavLink
        className="flex p-3 mt-3 rounded-r-md hover:bg-gray-200 w-full"
        to={`${paths[currentUser.role.name].url}/${
          paths[currentUser.role.name + "Setting"].url
        }`}
      >
        <Setting /> Setting
      </NavLink>
    </div>
  );
};

export default DashboardSidebar;
