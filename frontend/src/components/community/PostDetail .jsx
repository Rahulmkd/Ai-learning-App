import React from "react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  User,
  Paperclip,
  Ellipsis,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";

const PostDetail = () => {
  const { state } = useLocation();
  const post = state?.post;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* MAIN CARD */}
      <div className="m-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/community"
            className="p-2 rounded-full  hover:bg-gray-100 cursor-pointer"
          >
            <ArrowLeft size={18} />
          </Link>

          <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <Ellipsis size={18} />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {post?.title || "Post Title"}
        </h2>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
            <User size={18} className="text-gray-600" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              {post.authorId?.username}
            </p>
            <div className="flex gap-2 text-xs text-gray-500">
              <span>{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>

        {/* Topic */}
        <div className="mb-4">
          <span className="inline-block text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
            {post?.topic}
          </span>
        </div>

        {/* Content */}
        <div className="text-gray-700 text-sx leading-relaxed whitespace-pre-wrap mb-6">
          {post?.content || "Post content goes here..."}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 text-gray-600 border-t pt-4">
          <button className="flex items-center gap-2 hover:text-red-500 cursor-pointer transition">
            <Heart size={18} />
          </button>

          <button className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition">
            <MessageCircle size={18} />
          </button>

          <button className="flex items-center gap-2 hover:text-green-500 cursor-pointer transition">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* COMMENT SECTION */}
      <div className=" m-10">
        {/* Heading */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Comments ({post?.comments?.length || 0})
        </h2>

        {/* Add Comment */}
        <div className="bg-white shadow-sm rounded-xl p-4 transition">
          <textarea
            placeholder="Write your comment..."
            rows={3}
            className="w-full resize-none bg-transparent text-gray-700 text-sm focus:outline-none placeholder:text-gray-400"
          />

          <div className="flex items-center justify-between mt-3">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm cursor-pointer">
              <Paperclip size={16} />
            </button>

            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 md:px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 active:scale-95 hover:scale-[1.02]">
              <span>Comment</span>
            </button>
          </div>
        </div>

        {/* Comment List */}
        <div className="mt-6 space-y-5">
          {/* Single Comment */}
          {(post?.comments || [1, 2]).map((c, i) => (
            <div key={i} className="flex gap-3">
              {/* Avatar */}
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100">
                <User size={16} className="text-gray-600" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-sm font-medium text-gray-700">
                    {c?.author || "User"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                    {c?.text || "This is a comment..."}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                  <span>{c?.createdAt || "Now"}</span>

                  <button className="hover:text-red-500 cursor-pointer">
                    Like
                  </button>

                  <button className="hover:text-blue-500 cursor-pointer">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
