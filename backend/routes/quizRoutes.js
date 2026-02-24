import express from "express";
import {
  getQuizzes,
  getQuizById,
  submitQuiz,
  getQuizResults,
  deleteQuiz,
} from "../controllers/quizController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.get("/:documentId", getQuizzes);
router.get("/quiz/:id", getQuizById);
router.post("/quiz/:id/submit", submitQuiz);
router.get("/quiz/:id/results", getQuizResults);
router.delete("/:id", deleteQuiz);

export default router;
