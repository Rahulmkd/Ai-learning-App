import {
  Bookmark,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const PostContent = ({ post, onDelete, openMenuId, setOpenMenuId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const menuOpen = openMenuId === post._id;

  const isOwner = user?.id?.toString() === post?.authorId?._id?.toString();

  // Stop bubbling helper
  const stop = (e) => e.stopPropagation();

  const baseItems = [
    { label: "Copy link", key: "copy" },
    { label: "Report", key: "report" },
  ];

  const ownerItems = [
    { label: "Delete", key: "delete", danger: true },
    { label: "Edit", key: "edit" },
  ];

  const menuItems = isOwner ? [...ownerItems, ...baseItems] : baseItems;

  const menuActions = {
    delete: async () => {
      const confirmDelete = window.confirm("Are you sure?");
      if (!confirmDelete) return;
      await onDelete(post._id);
    },

    edit: () => {
      navigate(`/community/create/${post._id}`);
    },

    copy: () => {
      navigator.clipboard.writeText(
        `${window.location.origin}/post/${post._id}`,
      );
    },

    report: () => {
      console.log("Report id:", post._id);
    },
  };

  const handleMenuAction = async (key) => {
    setOpenMenuId(null);
    const action = menuActions[key];
    if (action) await action();
  };

  const handleCardClick = () => {
    navigate(`/community/post/${post._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-gray-200 p-5 shadow-sm 
      hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 
      relative cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        {/* Left */}
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center text-white shrink-0">
            <User size={18} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-900 truncate">
                {post.authorId?.username}
              </span>
              <span>·</span>
              <span>{post.time}</span>
            </div>

            <p className="mt-2 text-base font-bold text-gray-900 leading-snug line-clamp-2">
              {post.title}
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="relative" onClick={stop}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(menuOpen ? null : post._id);
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <Ellipsis size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
              {menuItems.map((item) => (
                <div
                  key={item.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuAction(item.key);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                    item.danger ? "text-red-500" : ""
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 ml-11 mr-8">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t my-4 ml-11 opacity-60" />

      {/* Footer */}
      <div className="flex items-center justify-between ml-11">
        <div className="flex items-center gap-6 text-gray-500 text-sm">
          {/* Like */}
          <button
            onClick={(e) => {
              stop(e);
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
              stop(e);
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
              stop(e);
              console.log("Share");
            }}
            className="flex items-center gap-1 hover:text-green-500 transition"
          >
            <Share size={18} />
          </button>
        </div>

        {/* Bookmark */}
        <button
          onClick={(e) => {
            stop(e);
            console.log("Bookmark");
          }}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Bookmark size={18} />
        </button>
      </div>
    </div>
  );
};

export default PostContent;
