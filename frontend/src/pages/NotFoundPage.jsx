import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-sm max-md:px-4 py-20 mt-30">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text ">
        404 Not Found
      </h1>
      <div className="h-px w-80 rounded bg-gray-900 my-5 md:my-7"></div>
      <p className="md:text-xl text-gray-700 max-w-lg text-center">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        to="/"
        className="group flex items-center gap-1 border border-indigo-500 bg-white hover:bg-slate-100 px-7 py-2.5 text-indigo-600 rounded-full mt-10 font-medium active:scale-95 transition-all "
      >
        Back to Home
        <ArrowRight
          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
          strokeWidth={2}
        />
      </Link>
    </div>
  );
};

export default NotFoundPage;
