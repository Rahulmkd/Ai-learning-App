import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  toggleSave,
  addComment,
} from "../controllers/postController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// PROTECTED ROUTES (auth required)
router.use(protect);

//CREATE
router.post("/", createPost);

//READ
router.get("/", getPosts);
router.get("/:id", getPostById);

//UPDATE
router.put("/:id", updatePost);

//DELETE
router.delete("/:id", deletePost);

// LIKE & SAVE
router.patch("/:id/like", toggleLike);
router.patch("/:id/save", toggleSave);

//COMMENT
router.post("/:id/comment", addComment);

export default router;
