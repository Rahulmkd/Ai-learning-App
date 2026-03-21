import { Flame, SquarePen } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen ">
      <div className="w-full flex justify-center mt-4 ">
        <div className="w-[95%] md:w-[90%] bg-white text-black px-6 py-3 flex items-center justify-between rounded-xl">
          {/* Tabs */}
          <div className="flex items-center gap-4">
            {tabLists.map((list) => {
              const isActive = activeTab === list.value;
              const Icon = list.icon;

              return (
                <button
                  key={list.value}
                  onClick={() => setActiveTab(list.value)}
                  className={`group flex items-center gap-3 px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${isActive ? "bg-linear-to-r  text-black shadow-lg shadow-indigo-500/25" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 "}`}
                >
                  {Icon && (
                    <Icon
                      size={18}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${
                        isActive ? "" : "group-hover:scale-110"
                      }`}
                    />
                  )}
                  {list.tab}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-2 px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg cursor-pointer"
          >
            <SquarePen size={15} strokeWidth={2.5} />
            Create
          </button>
        </div>
      </div>

      {/* Filtered Content */}
      <div className="w-[95%] md:w-[90%] mt-6">
        {activeTab === "forYou" && <p> For You Content</p>}
        {activeTab === "career" && <p> Career Content</p>}
      </div>
    </div>
  );
};

export default Community;
