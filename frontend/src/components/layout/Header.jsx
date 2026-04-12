import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
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
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isDark = true;
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="flex items-center justify-between h-full px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:block"></div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50  border border-gray-200  rounded-xl px-3 py-2 w-64">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-gray-700 dark:text-gray-300 outline-none w-full placeholder:text-gray-400"
            />
          </div>

          <button className="relative inline-flex items-center justify-center w-10 h-10 text-slate-600 hover:text-slate-900 bg-gray-50 border border-gray-200 hover:bg-slate-100 rounded-xl transition-all duration-200 group">
            <Bell
              size={20}
              strokeWidth={2}
              className="group-hover:scale-110 transition-transform duration-200"
            />

            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/30 z-50 py-2 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 ">
                  <p className="text-sm font-semibold text-gray-900 ">
                    {user?.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-gray-400" /> Profile Settings
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2.5 font-semibold text-sm text-gray-700  hover:bg-gray-50 transition-colors cursor-pointer">
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-gray-400" />
                  )}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
                <div className="border-t border-gray-100  mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
