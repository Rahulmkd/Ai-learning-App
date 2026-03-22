import { Flame, SquarePen } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostContent from "./PostContent";

const Community = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("forYou");

  const tabLists = [
    { tab: "For You", value: "forYou", icon: Flame },
    { tab: "Career", value: "career" },
    { tab: "Interview", value: "interview" },
    { tab: "Feedback", value: "feedback" },
  ];

  const POSTS = [
    {
      id: 1,
      title: "Cleartrip - Flipkart (UI Developer 1) - Offer Discussion",
      time: "2 hours ago",
      like: 2,
      comments: 1,
      note: "Got an offer from Cleartrip (UI 1 role) and wanted some opinions on whether it's a good move. YOE: ~1.6 years. Offer details (Cleartrip): Base: 16.5 LPA · Bonus: 1.65 LPA · Stocks: ~1.75 LPA · Total: ~20 LPA. Current compensation (Service-based AI company): Base: 12 LPA · Total: ~14 LPA. Looking for advice on whether the switch makes sense given the role, company trajectory, and overall package.",
    },
 
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full flex justify-center mt-4 px-2">
        <div className="w-full md:w-[90%] text-black px-3 md:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl">
          {/* Tabs (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full">
            {tabLists.map((list) => {
              const isActive = activeTab === list.value;
              const Icon = list.icon;

              return (
                <button
                  key={list.value}
                  onClick={() => setActiveTab(list.value)}
                  className={`flex-shrink-0 group flex items-center gap-2 px-3 md:px-4 py-1.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-slate-200 text-black"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {Icon && (
                    <Icon
                      size={16}
                      className={`transition-transform ${
                        isActive ? "" : "group-hover:scale-110"
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
            onClick={() => navigate("/create")}
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
          {POSTS.map((post) => (
            <PostContent key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
