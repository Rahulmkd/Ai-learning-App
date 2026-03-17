import { ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import aiService from "../../services/aiService";
import { useParams } from "react-router-dom";
import Spinner from "../common/Spinner";

const DocumentInfoManager = ({ document }) => {
  const { id: documentId } = useParams();
  const [documentInfo, setDocumentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!documentId) return;

    const fetchDocumentInfo = async () => {
      try {
        const info = await aiService.generateDocumentInfo(documentId);
        setDocumentInfo(info);
      } catch (error) {
        toast.error("Failed to fetch document details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocumentInfo();
  }, [documentId]);

  if (loading) {
    return <Spinner />;
  }

  // 🔹 Helper function to get PDF URL
  const getPdfUrl = () => {
    if (!document?.data?.filePath) return null;

    let filePath = document.data.filePath;

    // If it's Cloudinary raw file, force inline viewing
    if (
      filePath.includes("res.cloudinary.com") &&
      filePath.includes("/raw/upload/")
    ) {
      // Insert fl_attachment:false right after /raw/upload/
      filePath = filePath.replace(
        "/raw/upload/",
        "/raw/upload/fl_attachment:false/",
      );
    }

    // If already absolute URL, return it
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }
    return null;
  };

  if (!document || !document.data || !document.data.filePath) {
    return (
      <div className="text-center p-8">Document Information not available</div>
    );
  }

  const pdfUrl = getPdfUrl();

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* ── 1. TITLE ── */}
        <header>
          <p className="text-xs tracking-wide uppercase text-slate-500 mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-slate-300 inline-block" />
            Research Document
          </p>

          <h1 className="text-3xl font-bold leading-tight text-slate-900">
            {documentInfo?.data?.headline}
          </h1>

          <div className="mt-3 flex gap-4 text-xs text-slate-500">
            <span>
              Published{" "}
              {documentInfo?.data?.createdAt &&
                new Date(documentInfo.data.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                  },
                )}
            </span>
            <span>·</span>
            <span>PDF</span>
          </div>
        </header>

        {/* ── 2. ABOUT ── */}
        <div className="relative bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-transparent rounded-t-2xl" />

          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">
            About this Document
          </p>

          <p className="text-sm leading-relaxed text-slate-700 font-medium">
            {documentInfo?.data?.about}
          </p>
        </div>

        {/* ── 3. TOPIC CARDS ── */}
        <div>
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-slate-500 mb-6 flex items-center gap-3">
            Key Topics Covered
            <span className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {documentInfo?.data?.cards?.map((card, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-transparent hover:from-indigo-500/40 hover:via-purple-500/40 transition-all duration-300"
              >
                {/* Inner Card */}
                <div
                  className="relative h-full bg-white rounded-2xl p-5 border border-slate-200
                             group-hover:-translate-y-1 group-hover:shadow-lg 
                             group-hover:shadow-indigo-500/10
                             transition-all duration-300"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent" />

                  {/* Top Row */}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                      {index + 1}
                    </span>

                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-70 group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Topic */}
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition mb-1">
                    {card.topic}
                  </p>

                  {/* Summary */}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {card.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. VIEW CTA ── */}
        <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition">
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Read your document
            </h4>

            <p className="text-xs text-slate-500 mt-1">
              Opens as an embedded PDF
            </p>
          </div>

          <a
            href={`https://docs.google.com/gview?url=${encodeURIComponent(
              pdfUrl,
            )}&embedded=true`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-px shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            <ExternalLink size={16} />
            View Document
          </a>
        </div>
      </div>
    </div>
  );
};

export default DocumentInfoManager;
