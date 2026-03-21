import { ArrowRight, Menu, TrendingUp, X } from "lucide-react";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Hero = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About us", path: "/about" },
    { name: "Contact us", path: "/contact" },
  ];

  return (
    <>
      <div className="min-h-screen pb-20">
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <img
            src="/logo.svg"
            alt="AI Learning Platform"
            className="w-15 h-15 object-contain"
          />

          <div className="hidden md:flex items-center gap-8 text-slate-800">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative group"
              >
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
              className="h-10 px-5 py-2  flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-95 transition-all rounded-xl text-white shadow-md hover:shadow-lg"
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
            className="mt-6 size-10 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:scale-110 active:scale-95 transition"
          >
            <X size={24} />
          </button>
        </div>
        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>
          {/* Avatars + Stars */}
          <div className="flex items-center mt-24"></div>
          {/* Headline + CTA */}
          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 leading-tight md:leading-[70px]">
            Turn Your Documents into{" "}
            <span className=" bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent text-nowrap">
              Smart Learning
            </span>{" "}
            Experiences.
          </h1>
          <p className="max-w-md text-center text-base my-7">
            Upload PDFs, notes, or study material and instantly generate
            summaries, quizzes, and flashcards using AI.
          </p>
          {/* CTA Buttons */}
          <div className="flex items-center gap-6 text-sm max-sm:text-xs">
            <NavLink to="/documents">
              <button className="group relative w-45 h-12 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-lg shadow-indigo-500/25 overflow-hidden cursor-pointer">
                <span className="relative z-10 flex items-center justify-center gap-1">
                  Start creating
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    strokeWidth={2}
                  />
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </NavLink>

            <a href="#AiSection">
              <button className="group relative w-45 h-12 active:scale-95 bg-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-1  disabled:opacity-50 shadow-lg shadow-indigo-500/25 overflow-hidden cursor-pointer">
                <span className="relative z-10 flex items-center justify-center gap-1">
                  Explore More
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    strokeWidth={2}
                  />
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </a>
          </div>
        </div>
        {/* baged */}
        <div className="flex items-center justify-center mt-25">
          <div className="flex items-center gap-2 text-sm text-black bg-blue-400/10 border border-indigo-200 rounded-full px-4 py-1 h-10">
            <TrendingUp className="w-4 h-4" strokeWidth={2} />
            <span>5 Applicants</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
