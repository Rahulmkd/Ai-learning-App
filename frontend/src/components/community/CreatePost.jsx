import { Plus, Send } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCreatePost from "../../hooks/useCreatePost";

const CreatePost = () => {
  const navigate = useNavigate();
  const { createPost, isCreating } = useCreatePost();

  const [post, setPost] = useState({
    title: "",
    content: "",
    topics: [],
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // Submit (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    createPost(post, {
      onSuccess: () => {
        navigate("/community");
      },
      onError: (err) => {
        console.error("Create failed:", err);
      },
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 sm:mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full h-12 text-lg sm:h-14 px-4 rounded-xl focus:outline-none placeholder:font-semibold placeholder:text-slate-300"
            required
          />

          {/* Buttons */}
          <div className="flex justify-end sm:justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate("/community")}
              className="w-full sm:w-auto flex justify-center items-center gap-2 px-3 sm:px-4 py-2 text-sm font-semibold rounded-lg transition bg-slate-100 hover:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isCreating || !post.title.trim() || !post.content.trim()
              }
              className={`w-full sm:w-auto flex justify-center items-center gap-2 px-3 sm:px-4 py-2 text-sm font-semibold rounded-lg transition disabled:opacity-50 ${
                isCreating
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              <Send size={16} />
              {isCreating ? "Posting..." : "Post"}
            </button>
          </div>
        </div>

        {/* Add Topic Button */}
        <button
          type="button"
          className="flex items-center gap-1 px-3 sm:px-4 py-1.5 text-sm font-semibold text-slate-600 rounded-2xl transition bg-slate-100 hover:bg-slate-200"
        >
          <Plus size={15} />
          Topic
        </button>

        {/* Content */}
        <div className="pt-3 border-t border-slate-200 h-60 sm:h-80">
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            placeholder="Write Something..."
            className="w-full h-full resize-none text-slate-600 text-sm sm:text-lg focus:outline-none placeholder:text-base sm:placeholder:text-lg placeholder:text-slate-300 placeholder:font-semibold"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
