import React from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="min-h-screen pb-20">
        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>
          {/* Avatars + Stars */}
          <div className="flex items-center mt-24"></div>
          {/* Headline + CTA */}
          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 leading-tight md:leading-[70px]">
            Turn Your Documents into{" "}
            <span className=" bg-linear-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent text-nowrap">
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
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-slate-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
