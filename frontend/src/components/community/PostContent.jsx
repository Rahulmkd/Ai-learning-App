import {
  Bookmark,
  Ellipsis,
  Forward,
  Heart,
  MessageCircle,
  User,
} from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useDropdown from "../../hooks/useDropdown";
import usePostMenu from "../../hooks/usePostMenu";

const PostContent = ({ post, onDelete, openMenuId, setOpenMenuId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { ref, isOpen, toggle, close } = useDropdown(openMenuId, setOpenMenuId);

  const { menuItems, menuActions } = usePostMenu({
    user,
    post,
    navigate,
    onDelete,
  });

  return (
    <div
      onClick={() => navigate(`/community/post/${post._id}`)}
      className="group transition-all duration-300 
      relative cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mt-5">
        {/* Left */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white shrink-0">
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
            className="flex items-center gap-1 hover:text-pink-500 transition-all"
          >
            <Heart size={16} />
            <span>0</span>
          </button>

          {/* Comment */}
          <button
            onClick={(e) => {
              navigate(`/community/post/${post._id}`);
              e.stopPropagation();
            }}
            className="flex items-center gap-1 hover:text-blue-500 transition cursor-pointer"
          >
            <MessageCircle size={16} />
            <span>{post?.comments?.length || 0}</span>
          </button>

          {/* Share */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Share");
            }}
            className="flex items-center gap-1 hover:text-green-500 transition"
          >
            <Forward size={18} />
            <span>0</span>
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
