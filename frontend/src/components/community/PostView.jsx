import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  User,
  Paperclip,
  Ellipsis,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import usePost from "../../hooks/usePost";
import Spinner from "../common/Spinner";
import { useState } from "react";
import useDropdown from "../../hooks/useDropdown";
import usePostMenu from "../../hooks/usePostMenu";
import usePostActions from "../../hooks/usePostActions";
import { useAuth } from "../../context/AuthContext";

const PostView = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const { postId } = useParams();
  const { data: post, isLoading } = usePost(postId);
  const { deletePost } = usePostActions();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { ref, isOpen, toggle, close } = useDropdown(openMenuId, setOpenMenuId);

  const { menuItems, menuActions } = usePostMenu({
    user,
    post,
    navigate,
    onDelete: deletePost,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* MAIN CARD */}
      <div className="mx-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/community"
            className="p-2 rounded-full  hover:bg-gray-100 cursor-pointer"
          >
            <ArrowLeft size={18} />
          </Link>

          {/* Menu */}
          <div
            className="relative"
            ref={ref}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle(post._id)(e);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Ellipsis size={18} />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-max bg-white rounded-xl shadow-md z-50 overflow-hidden transform transition-all duration-150 ease-out origin-top-right
        ${
          isOpen(post._id)
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
        }`}
            >
              {menuItems.map((item) => (
                <div
                  key={item.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                    menuActions[item.key]?.();
                  }}
                  className={`px-4 py-2 text-sm font-semibold cursor-pointer transition-colors
              hover:bg-gray-50 active:bg-gray-100
              ${item.danger ? "text-red-500" : "text-gray-700"}
            `}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
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
              {post?.authorId?.username}
            </p>
            <div className="flex gap-2 text-xs text-gray-500">
              <span>{moment(post?.createdAt).fromNow()}</span>
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
        <div className="text-slate-900 tracking-wider leading-relaxed whitespace-pre-wrap mb-6">
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
      <div className="m-10">
        {/* Heading */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Comments ({post?.comments?.length || 0})
        </h2>

        {/* Add Comment */}
        <div className="shadow-md bg-white rounded-xl p-4 transition">
          <textarea
            placeholder="Type comment here..."
            rows={3}
            className="w-full resize-none  bg-transparent text-gray-700 text-sm focus:outline-none placeholder:text-slate-300 tracking-wider"
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

export default PostView;
