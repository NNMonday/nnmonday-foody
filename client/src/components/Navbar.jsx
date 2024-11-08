import React, { useEffect, useRef, useState } from "react";
import { logo } from "../assets/imgs";
import { Link, NavLink } from "react-router-dom";
import { paths } from "../utils/magic";
import { useAuth } from "../contexts/auth.context";
import { Cart, User } from "../assets/SvgIcons";
import { CartPopup, AvatarPopup } from "../components";
import { useCart } from "../contexts/cart.context";

const NavItem = ({ to, name }) => (
  <NavLink
    to={to}
    className="px-5 py-2 rounded-3xl text-black border border-transparent hover:bg-transparent hover:border-primary hover:text-primary"
  >
    {name}
  </NavLink>
);

const navOptions = [paths.homepage, paths.menu, paths.restaurants];

export default function Navbar() {
  const { currentUser } = useAuth();
  const { cart } = useCart();
  const [openPopup, setOpenPopup] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpenPopup(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex justify-between items-center py-6 navbar">
      <nav>
        <Link to={paths.homepage.url}>
          <img src={logo} alt="logo" />
        </Link>
      </nav>
      <nav className="flex gap-x-10 justify-between">
        {navOptions.map((option, i) => (
          <NavItem key={i} to={option.url} name={option.name} />
        ))}
      </nav>
      <nav>
        {currentUser ? (
          <div className="flex gap-x-5 items-center">
            {currentUser.role.name === "customer" && (
              <div
                onMouseEnter={() => setOpenCart(true)}
                onMouseLeave={() => setOpenCart(false)}
                className="relative cursor-pointer"
              >
                <Cart />
                {openCart && (
                  <CartPopup
                    cartItems={cart}
                    onClose={() => setOpenCart(false)}
                  />
                )}
                <div className="absolute left-5 bottom-4 px-2 py-0.5 bg-primary text-white rounded-lg text-sm">
                  {cart.length || 0}
                </div>
              </div>
            )}
            <div className="relative" onClick={() => setOpenPopup(true)}>
              <img
                className="bg-primary rounded-full p-1 mr-2 cursor-pointer"
                src={currentUser.avatar}
                alt="avatar"
                height={40}
                width={40}
              />
              {openPopup && <AvatarPopup ref={popupRef} />}
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 text-white px-5 py-3 rounded-full flex items-center">
            <div className="bg-primary rounded-full p-1 mr-2">
              <User />
            </div>
            <Link to={paths.login.url} className="hover:underline">
              {paths.login.name}
            </Link>
            /
            <Link to={paths.register.url} className="hover:underline">
              {paths.register.name}
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
