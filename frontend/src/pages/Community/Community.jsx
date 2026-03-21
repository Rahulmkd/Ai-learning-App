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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="w-full flex justify-center mt-4 px-2">
        <div className="w-full md:w-[90%] bg-white text-black px-3 md:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl">
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
                      ? "bg-slate-200 text-black shadow-md"
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
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 md:px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
          >
            <SquarePen size={16} />
            Create
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-[90%] mx-auto mt-6 px-3">
        {/* {activeTab === "forYou" && <p>For You Content</p>}
        {activeTab === "career" && <p>Career Content</p>}
        {activeTab === "interview" && <p>Interview Content</p>}
        {activeTab === "feedback" && <p>Feedback Content</p>} */}

        <PostContent />
      </div>
    </div>
  );
};

export default Community;
