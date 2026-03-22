import { Bookmark, Ellipsis, Heart, MessageCircle, User } from "lucide-react";
import React, { useState } from "react";

const PostContent = ({ post }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition relative">
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 shrink-0">
          <User size={18} />
        </div>

        {/* Title + Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <span className="font-semibold text-gray-900">Anonymous User</span>
            <span>·</span>
            <span>{post.time}</span>
          </div>

          <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 cursor-pointer">
            {post.title}
          </p>
        </div>

        {/* Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-full hover:bg-gray-100"
          >
            <Ellipsis size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-20">
              {["Copy link", "Report"].map((item) => (
                <div
                  key={item}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="mt-3 text-sm text-gray-700 line-clamp-4">{post.note}</p>

      {/* Divider */}
      <div className="border-t my-3" />

      {/* Footer */}
      <div className="flex items-center justify-between text-gray-500 text-sm">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:text-pink-500">
            <Heart size={18} />
            {post.like}
          </button>

          <button className="flex items-center gap-1 hover:text-blue-500">
            <MessageCircle size={18} />
            {post.comments}
          </button>
        </div>

        {/* Save */}
        <button className="hover:text-black">
          <Bookmark size={18} />
        </button>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-10"
        />
      )}
    </div>
  );
};

export default PostContent;
