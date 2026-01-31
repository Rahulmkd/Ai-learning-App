import expres from "express";
import {
  getFlashcards,
  getAllFlashcardSets,
  reviewFlashcard,
  togglesStarFlashcard,
  deleteFlashcardSet,
} from "../controllers/flashcardController.js";
import protect from "../middleware/auth.js";

const router = expres.Router();

router.use(protect);

router.get("/", getAllFlashcardSets);
router.get("/:documentId", getFlashcards);
router.post("/:cardId/review", reviewFlashcard);
router.put("/:cardId/star", togglesStarFlashcard);
router.delete("/:id", deleteFlashcardSet);

export default router;
