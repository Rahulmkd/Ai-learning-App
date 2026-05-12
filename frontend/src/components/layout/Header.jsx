import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  User,
  Menu,
  Search,
  ChevronDown,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/documents", label: "Documents" },
  { path: "/flashcards", label: "Flashcards" },
  { path: "/community", label: "Community" },
];

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = true;
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentPage =
    navItems.find((item) => item.path === location.pathname)?.label ||
    "Dashboard";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white/70 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200 active:scale-95"
          >
            <Menu size={22} />
          </button>
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 ">{currentPage}</h2>
          <p className="text-xs text-gray-500  hidden sm:block tracking-wide">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Interactive Search: Expands on focus using Tailwind focus-within */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 border border-transparent focus-within:border-indigo-500/50 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10 rounded-xl px-3 py-2 w-64 focus-within:w-80 transition-all duration-300 ease-in-out group">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-slate-700 outline-none w-full placeholder:text-slate-400"
            />
            <span className="hidden group-focus-within:block text-[10px] font-bold text-slate-400 animate-pulse">
              ESC
            </span>
          </div>

          {/* Notification Bell with Ping */}
          <button className="relative inline-flex items-center justify-center w-10 h-10 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 group active:scale-90">
            <Bell
              size={20}
              className="group-hover:rotate-[15deg] transition-transform"
            />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white">
              <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-75"></span>
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center gap-2 p-1 rounded-full transition-all duration-200 ${
                profileOpen
                  ? "bg-slate-100 ring-4 ring-slate-100"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Pure CSS Animation for Dropdown */}
            <div
              className={`absolute right-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 z-50 py-2 origin-top-right transition-all duration-200 ease-out ${
                profileOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="px-4 py-3 border-b border-slate-50">
                <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                  {user?.username}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>

              <div className="p-1">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors group"
                >
                  <User
                    size={16}
                    className="text-slate-400 group-hover:text-indigo-600"
                  />
                  Profile Settings
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors group">
                  {isDark ? (
                    <Sun size={16} className="text-amber-500" />
                  ) : (
                    <Moon
                      size={16}
                      className="text-slate-400 group-hover:text-indigo-600"
                    />
                  )}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>

              <div className="border-t border-slate-50 mt-1 pt-1 p-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
