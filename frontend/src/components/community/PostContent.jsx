import {
  Bookmark,
  Ellipsis,
  Heart,
  MessageCircle,
  Share2,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useDropdown from "../common/useDropdown";

const PostContent = ({ post, onDelete, openMenuId, setOpenMenuId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { ref, isOpen, toggle, close } = useDropdown(openMenuId, setOpenMenuId);

  const isOwner = user?.id?.toString() === post?.authorId?._id?.toString();

  const menuItems = isOwner
    ? [
        { label: "Delete", key: "delete", danger: true },
        { label: "Edit", key: "edit" },
        { label: "Copy link", key: "copy" },
        { label: "Report", key: "report" },
      ]
    : [
        { label: "Copy link", key: "copy" },
        { label: "Report", key: "report" },
      ];

  const menuActions = {
    delete: async () => {
      if (!window.confirm("Are you sure?")) return;
      await onDelete(post._id);
    },
    edit: () => navigate(`/community/create/${post._id}`),
    copy: () => {
      navigator.clipboard.writeText(
        `${window.location.origin}/community/post/${post._id}`,
      );
    },
    report: () => console.log("Report id:", post._id),
  };

  const handlePostClick = () => {
    navigate(`/community/post/${post._id}`, {
      state: { post },
    });
  };

  return (
    <div
      onClick={handlePostClick}
      className="group transition-all duration-300 
      relative cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mt-5">
        {/* Left */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white shrink-0">
            <User size={18} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-sm text-gray-700 tracking-wider truncate">
                {post.authorId?.username}
              </span>
              <span>·</span>
              <span>{moment(post.createdAt).fromNow()}</span>
            </div>

            <p className="mt-2 text-base font-bold text-gray-900 leading-snug">
              {post.title}
            </p>
          </div>
        </div>

        {/* Menu */}
        <div
          ref={ref}
          className="relative"
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

      {/* Content */}
      <div className="mt-3 ml-11 mr-8">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap line-clamp-2">
          {post.content}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between ml-11 mt-2">
        <div className="flex items-center gap-6 text-gray-500 text-sm">
          {/* Like */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Like");
            }}
            className="flex items-center gap-1 hover:text-pink-500 transition"
          >
            <Heart size={18} />
            <span>{post.like || 0}</span>
          </button>

          {/* Comment */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Comment");
            }}
            className="flex items-center gap-1 hover:text-blue-500 transition"
          >
            <MessageCircle size={18} />
            <span>{post.comments || 0}</span>
          </button>

          {/* Share */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Share");
            }}
            className="flex items-center gap-1 hover:text-green-500 transition"
          >
            <Share2 size={18} />
          </button>
        </div>

        {/* Bookmark */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Bookmark");
          }}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition"
        >
          <Bookmark size={18} />
        </button>
      </div>
      {/* Divider */}
      <div className="my-4 ml-11 opacity-20 border-b " />
    </div>
  );
};

export default PostContent;
