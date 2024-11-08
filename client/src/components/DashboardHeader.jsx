import React, { useState, useRef, useEffect } from "react";
import { Bell, Dropdown, Message, Search, Wave } from "../assets/SvgIcons";
import { getGreeting } from "../utils/helpers";
import { useAuth } from "../contexts/auth.context";
import { Link } from "react-router-dom";
import { notifications, messages } from "../utils/fakeData";
import AvatarPopup from "./AvatarPopup";

export default function DashboardHeader() {
  const { currentUser } = useAuth();

  const [openPopup, setOpenPopup] = useState(null);

  const notificationRef = useRef(null);
  const messageRef = useRef(null);
  const userRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(e.target) &&
      messageRef.current &&
      !messageRef.current.contains(e.target) &&
      userRef.current &&
      !userRef.current.contains(e.target)
    ) {
      setOpenPopup(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between py-5 px-8 bg-white shadow-md w-full">
      <div>
        <p className="text-lg font-medium flex items-center">
          Hello {currentUser?.role.name} <Wave />
        </p>
        <p className="text-sm font-thin text-gray-500">{getGreeting()}</p>
      </div>
      <div className="flex gap-x-3">
        <span className="flex items-center border px-3 rounded-md py-1 focus-within:border-black">
          <Search />
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 outline-none"
          />
        </span>
        <div
          className={`flex items-center justify-center px-4 rounded-lg cursor-pointer relative ${
            openPopup === "notifications"
              ? "bg-primary text-white shadow-lg"
              : "bg-gray-100"
          }`}
          ref={notificationRef}
          onClick={() =>
            setOpenPopup(openPopup === "notifications" ? null : "notifications")
          }
        >
          <Bell />
          {openPopup === "notifications" && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 text-black">
              {notifications.map((notif) => (
                <Link
                  key={notif.id}
                  className="block px-4 py-2 hover:bg-primary hover:text-white rounded-md"
                >
                  {notif.text}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div
          className={`flex items-center justify-center px-4 rounded-lg cursor-pointer relative ${
            openPopup === "messages"
              ? "bg-primary text-white shadow-lg"
              : "bg-gray-100"
          }`}
          ref={messageRef}
          onClick={() =>
            setOpenPopup(openPopup === "messages" ? null : "messages")
          }
        >
          <Message />
          {openPopup === "messages" && (
            <div className="border absolute top-full right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 text-black">
              {messages.map((msg) => (
                <Link
                  key={msg.id}
                  className="block px-4 py-2 hover:bg-primary hover:text-white rounded-md"
                >
                  <p className="font-bold">{msg.sender}</p>
                  <p className="text-sm">{msg.text}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div
          className={`flex items-center border rounded-lg px-2 py-1 gap-x-2 cursor-pointer relative ${
            openPopup === "user"
              ? "bg-primary text-white shadow-lg"
              : "bg-gray-100"
          }`}
          ref={userRef}
          onClick={() => setOpenPopup(openPopup === "user" ? null : "user")}
        >
          <img
            src={currentUser?.image}
            alt="avatar"
            className="rounded-xl"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <p className="font-medium">{currentUser?.name}</p>
            <p
              className={`text-sm font-thin ${
                openPopup === "user" ? "text-white" : "text-gray-500"
              }`}
            >
              {currentUser?.role.name}
            </p>
          </div>
          <Dropdown />
          {openPopup === "user" && <AvatarPopup />}
        </div>
      </div>
    </div>
  );
}
