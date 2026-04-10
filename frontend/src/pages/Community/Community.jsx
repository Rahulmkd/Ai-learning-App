import { Flame, SquarePen } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostContent from "../../components/community/PostContent";
import Spinner from "../../components/common/Spinner";
import usePosts from "../../hooks/usePosts";
import usePostActions from "../../hooks/usePostActions";
const tabLists = [
  { tab: "For You", value: "forYou", icon: Flame },
  { tab: "Career", value: "career" },
  { tab: "Interview", value: "interview" },
  { tab: "Feedback", value: "feedback" },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("forYou");
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const { data: posts, isLoading } = usePosts(activeTab);
  console.log("POSTS___DATA:", posts);
  const { deletePost } = usePostActions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="w-full min-h-[60px] mb-6 sm:mb-10 lg:mb-12 px-4 sm:px-8 lg:px-20 flex items-center justify-center sm:justify-start bg-linear-to-r from-indigo-200 to-purple-300 rounded-xl">
        <h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-indigo-500 text-center sm:text-left">
          {/* What’s on your mind? */}
        </h1>
      </div>

      <div className="w-full flex justify-center mt-4 px-2">
        <div className="w-full md:w-[90%] px-3 md:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl">
          {/* Tabs (Scrollable on mobile) */}
          <div className="flex flex-wrap items-center gap-2 w-full">
            {tabLists.map((list) => {
              const isActive = activeTab === list.value;
              const Icon = list.icon;

              return (
                <button
                  key={list.value}
                  onClick={() => setActiveTab(list.value)}
                  className={`flex-shrink-0 group flex items-center gap-2 px-3 md:px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-slate-200 text-black"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {Icon && (
                    <Icon
                      size={16}
                      className={`transition-transform ${
                        isActive ? "scale-110" : ""
                      }`}
                    />
                  )}
                  {list.tab}
                </button>
              );
            })}
          </div>

          {/* Create Button */}
          <button
            onClick={() => navigate("/community/create")}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 md:px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 active:scale-95 hover:scale-[1.02]"
          >
            <SquarePen size={16} />
            Create
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="w-full md:w-[85%] mx-auto mt-6 px-3 sm:px-4">
        <div className="space-y-4">
          {/* Loading UI */}
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Spinner />
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts found</p>
          ) : (
            posts.map((post) => (
              <PostContent
                key={post._id}
                post={post}
                onDelete={deletePost}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
