import { Plus, Send } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CreateNote = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <form className="space-y-4">
        {/* Title Input */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="flex-1 h-15 px-4 rounded-xl focus:outline-none placeholder:font-semibold placeholder:text-slate-300"
            required
          />
          <div className="flex items-center justify-center gap-4">
            <Link to="/community">
              <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-lg transition bg-slate-100 hover:bg-slate-200">
                Cancel
              </button>
            </Link>

            <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-lg transition bg-green-500 hover:bg-green-600 text-white">
              <Send size={16} />
              Post
            </button>
          </div>
        </div>

        {/* Add Topic Button */}

        <button
          type="button"
          className="flex items-center px-4 py-1 text-sm font-semibold text-slate-600 rounded-2xl transition bg-slate-100 hover:bg-slate-200"
        >
          <Plus size={15} />
          Topic
        </button>

        <div className="pt-3 border-t border-slate-200 h-100">
          <textarea
            name="content"
            placeholder="Write Something..."
            className="w-full h-full resize-none text-lg focus:outline-none placeholder:text-lg placeholder:text-slate-300 placeholder:font-semibold"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
