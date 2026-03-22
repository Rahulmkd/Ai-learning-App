import { Plus, Send } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CreatePost = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-4 sm:mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5">
      <form className="space-y-4">
        {/* Title + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full h-12 sm:h-14 px-4 rounded-xl focus:outline-none placeholder:font-semibold placeholder:text-slate-300"
            required
          />

          {/* Buttons */}
          <div className="flex justify-end sm:justify-center gap-2 sm:gap-3">
            <Link to="/community" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto flex justify-center items-center gap-2 px-3 sm:px-4 py-2 text-sm font-semibold rounded-lg transition bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              className="w-full sm:w-auto flex justify-center items-center gap-2 px-3 sm:px-4 py-2 text-sm font-semibold rounded-lg transition bg-green-500 hover:bg-green-600 text-white"
            >
              <Send size={16} />
              Post
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
            placeholder="Write Something..."
            className="w-full h-full resize-none text-base sm:text-lg focus:outline-none placeholder:text-base sm:placeholder:text-lg placeholder:text-slate-300 placeholder:font-semibold"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
