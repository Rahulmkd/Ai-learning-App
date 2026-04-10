import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  User,
  Paperclip,
  Ellipsis,
  Forward,
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
import usePostComment from "../../hooks/usePostComment";

const PostView = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [comment, setComment] = useState("");

  const { postId } = useParams();
  const navigate = useNavigate();

  // Custom hooks for data & actions
  const { data: post, isLoading } = usePost(postId);
  const { deletePost } = usePostActions();
  const { user } = useAuth();
  const { addComment, isCommenting } = usePostComment();

  //  UI / dropdown hooks
  const { ref, isOpen, toggle, close } = useDropdown(openMenuId, setOpenMenuId);

  //  Derived menu items / actions
  const { menuItems, menuActions } = usePostMenu({
    user,
    post,
    navigate,
    onDelete: deletePost,
  });
  console.log("viewPost___Data", post);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    console.log("Submitting:", comment);

    addComment({
      postId,
      comment,
    });

    setComment("");
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4">
      {/* MAIN CARD */}
      <div className="sm:mx-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <Link
            to="/community"
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
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
              className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <Ellipsis size={18} />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-40 sm:w-max bg-white rounded-xl shadow-md z-50 overflow-hidden transform transition-all duration-150 ease-out origin-top-right
          ${
            isOpen(post._id)
              ? "opacity-100 scale-100 translate-y-0"
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
              ${item.danger ? "text-red-500" : "text-gray-700"}`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
          {post?.title || "Post Title"}
        </h2>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100">
            <User size={16} className="text-gray-600" />
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
        <div className="mb-3 sm:mb-4">
          <span className="inline-block text-blue-600 text-[11px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
            {post?.topic}
          </span>
        </div>

        {/* Content */}
        <div className="text-sm sm:text-base text-slate-900 tracking-wider leading-relaxed whitespace-pre-wrap mb-5 sm:mb-6">
          {post?.content || "Post content goes here..."}
        </div>

        {/* Actions */}
        <div className="flex justify-around sm:justify-start sm:gap-6 text-gray-600 border-t pt-3 sm:pt-4">
          <button className="flex items-center gap-2 hover:text-red-500 cursor-pointer transition active:scale-95 hover:scale-[1.05]">
            <Heart size={18} />0
          </button>

          <button className="flex items-center gap-2 hover:text-blue-500 cursor-pointer transition active:scale-95 hover:scale-[1.05]">
            <MessageCircle size={18} />
            {post?.comments?.length || 0}
          </button>

          <button className="flex items-center gap-2 hover:text-green-500 cursor-pointer transition active:scale-95 hover:scale-[1.05]">
            <Forward size={20} />0
          </button>
        </div>
      </div>

      {/* COMMENT SECTION */}
      <div className="mt-6 sm:m-10">
        {/* Heading */}
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
          Comments ({post?.comments?.length || 0})
        </h2>

        {/* Add Comment */}
        <form
          onSubmit={handleSubmit}
          className="shadow-sm sm:shadow-md bg-white rounded-xl p-3 sm:p-4 transition"
        >
          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type comment here..."
            rows={3}
            className="w-full resize-none bg-transparent text-gray-700 text-sm focus:outline-none placeholder:text-slate-300 tracking-wider"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
            <button
              type="button"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
            >
              <Paperclip size={16} />
            </button>

            <button
              type="submit"
              disabled={isCommenting || !comment.trim()}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 md:px-4 py-1.5 cursor-pointer text-sm bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 active:scale-95 hover:scale-[1.02] disabled:opacity-50"
            >
              {isCommenting ? "Posting..." : "Comment"}
            </button>
          </div>
        </form>

        {/* Comment List */}
        <div className="mt-5 sm:mt-6">
          {(post?.comments || [])
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment) => (
              <div
                key={comment._id}
                className="flex gap-2 sm:gap-3 py-3 sm:py-4 border-b border-gray-300 last:border-none"
              >
                {/* Avatar */}
                <div className="w-6 h-6 sm:w-5 sm:h-5 mt-1 flex items-center justify-center rounded-full bg-gray-200 shrink-0">
                  <User size={12} className="text-gray-600" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Username */}
                  <p className="text-sm font-semibold text-gray-800 inline hover:text-blue-500 cursor-pointer">
                    {comment.userId?.username || "User"}
                  </p>

                  {/* Date */}
                  <span className="block text-[10px] text-gray-400 mt-[2px]">
                    <span>{moment(comment?.createdAt).fromNow()}</span>
                  </span>

                  {/* Comment */}
                  <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap leading-relaxed">
                    {comment?.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
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
