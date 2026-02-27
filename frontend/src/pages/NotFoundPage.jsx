import React from "react";
import { Link } from "react-router-dom";
import { BrainCircuit, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6">
      <div className="text-center max-w-xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-100 rounded-2xl shadow-md">
            <BrainCircuit className="w-12 h-12 text-indigo-600" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-indigo-600 mb-4 animate-pulse">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Oops! This page is lost in the AI universe 🤖
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to learning something amazing!
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
