import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  FileText,
  BookOpen,
  X,
  Users,
  Zap,
  Settings,
  User,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navLinks = [
    {
      to: "/dashboard",
      icon: LayoutDashboard,
      text: "Dashboard",
    },
    {
      to: "/documents",
      icon: FileText,
      text: "Documents",
    },
    {
      to: "/flashcards",
      icon: BookOpen,
      text: "Flashcards",
    },
    {
      to: "/community",
      icon: Users,
      text: "Community",
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleSidebar}
        aria-hidden="true"
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-slate-200/60 z-50 md:relative md:w-64 md:shrink-0 md:flex md:flex-col md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 h-16 px-6 py-5 border-b border-slate-200/60">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
            <NavLink to="/">
              <Zap className="w-5 h-5 text-white" />
            </NavLink>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 tracking-tight">
              AI-Doc
            </h1>
            <p className="text-[10px] text-gray-400 -mt-0.5">
              Ai-Learning Platform
            </p>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden ml-auto text-slate-500 hover:text-slate-800"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${isActive ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon
                    size={18}
                    strokeWidth={2.5}
                    className={`transition-transform duration-200 ${
                      isActive ? "" : "group-hover:scale-110"
                    }`}
                  />
                  {link.text}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 ">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              <User />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 truncate">Free Plan</p>
            </div>
            <Settings
              className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 "
              onClick={() => navigate("/profile")}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
