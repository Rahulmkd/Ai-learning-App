import React from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About us", path: "/about" },
    { name: "Contact us", path: "/contact" },
  ];

  return (
    <div className="bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80  backdrop-blur-xl border-b border-gray-100 flex items-center justify-between h-16 w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
        <img
          src="/logo.svg"
          alt="AI Learning Platform"
          className="w-12 h-12 object-contain"
        />

        <div className="hidden md:flex items-center gap-8 text-slate-800">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className="relative group">
              {({ isActive }) => (
                <>
                  <span
                    className={`transition ${
                      isActive
                        ? "text-indigo-600 font-medium"
                        : "group-hover:text-indigo-600"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-indigo-600 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/dashboard"
            className="px-4 py-2  flex items-center justify-center bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 transition-all rounded-xl text-white shadow-md hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5"
          >
            Get started
          </Link>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="h-10 px-5 py-2 flex items-center justify-center rounded-xl text-indigo-500
             hover:text-indigo-600 border border-indigo-500 hover:border-indigo-700 hover:bg-slate-100 active:scale-95 transition-all duration-200"
            >
              Login
            </Link>
          )}
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden active:scale-90 transition"
        >
          <Menu size={24} />
        </button>
      </nav>
      {/* Mobile Menu */}

      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-lg flex flex-col items-center justify-center gap-8 text-lg transition-all duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMenuOpen(false)}
            className="relative group text-white text-xl"
          >
            {({ isActive }) => (
              <>
                <span
                  className={`transition ${
                    isActive
                      ? "text-indigo-400 font-semibold"
                      : "group-hover:text-indigo-300"
                  }`}
                >
                  {item.name}
                </span>

                {/* underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-indigo-400 w-full transform origin-left transition-transform duration-300 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}

        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="mt-6 size-10 flex items-center justify-center bg-linear-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:scale-110 active:scale-95 transition"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
