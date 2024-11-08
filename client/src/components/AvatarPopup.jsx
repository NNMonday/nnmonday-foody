import React, { forwardRef } from "react";
import { useAuth } from "../contexts/auth.context";
import { Link } from "react-router-dom";
import { paths } from "../utils/magic";

const AvatarPopup = forwardRef((props, ref) => {
  const { currentUser } = useAuth();
  const { role } = currentUser;
  return (
    <div
      ref={ref}
      className="border absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 text-black z-10"
    >
      <Link
        className="block px-4 py-2 hover:bg-primary hover:text-white rounded-md"
        to={`/${role.name}/${paths[`${role.name}Dashboard`]?.url}`}
      >
        Dashboard
      </Link>
      <Link
        className="block px-4 py-2 hover:bg-primary hover:text-white rounded-md"
        to={`/${role.name}/${paths[`${role.name}Setting`]?.url}`}
      >
        Setting
      </Link>
      <Link
        to={paths.logout.url}
        className="block px-4 py-2 hover:bg-primary hover:text-white rounded-md"
      >
        Logout
      </Link>
    </div>
  );
});

export default AvatarPopup;
