import {
  FileText,
  Sparkles,
  MessageSquare,
  BookOpen,
  FileQuestionMarkIcon,
  Users,
} from "lucide-react";

export const AiToolsData = [
  {
    title: "Document Upload",
    description:
      "Upload PDFs or notes and get instant summaries and key insights.",
    Icon: FileText,
    bg: { from: "#3588F2", to: "#0BB0D7" },
    path: "/ai/write-article",
  },
  {
    title: "Chat Section",
    description:
      "Ask questions and get real-time answers from an AI chat assistant.",
    Icon: MessageSquare,
    bg: { from: "#B153EA", to: "#E549A3" },
    path: "/ai/blog-titles",
  },
  {
    title: "AI Assistant",
    description:
      "A smart tutor that helps you understand concepts step-by-step.",
    Icon: Sparkles,
    bg: { from: "#20C363", to: "#11B97E" },
    path: "/ai/generate-images",
  },
  {
    title: "Flashcards",
    description:
      "Generate quick flashcards to revise and remember important topics.",
    Icon: BookOpen,
    bg: { from: "#F76C1C", to: "#F04A3C" },
    path: "/ai/remove-background",
  },
  {
    title: "Quizzer",
    description: "Practice with AI-generated quizzes and track your progress.",
    Icon: FileQuestionMarkIcon,
    bg: { from: "#5C6AF1", to: "#427DF5" },
    path: "/ai/remove-object",
  },
  {
    title: "Community",
    description: "Connect with learners, share ideas, and learn together.",
    Icon: Users,
    bg: { from: "#12B7AC", to: "#08B6CE" },
    path: "/ai/review-resume",
  },
];
