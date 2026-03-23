import Post from "../models/Post.js";

// @desc   Create Post by user
// @route  POST /api/post
// @access Private
export const createPost = async (req, res, next) => {
  try {
    const { title, content, topics, attachments } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const post = await Post.create({
      authorId: req.user.id,
      title,
      content,
      topics,
      attachments,
    });

    res.status(201).json({
      success: true,
      message: "Post created sucessfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   GET ALL POSTS (FEED)
// @route
// @access Private

export const getPosts = async (req, res, next) => {
  try {
    const { topic } = req.query;
    let filter = { isDeleted: false };

    if (topic) {
      filter.topics = topic;
    }

    const posts = await Post.find(filter)
      .sort({
        createdAt: -1,
      })
      .populate("authorId", "username")
      .lean();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc  GET Post by id
// @route  POST /api/post/id
// @access Private

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("authorId", "username")
      .populate("comments.userId", "username");

    if (!post || post.isDeleted) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
        statusCode: 404,
      });
    }
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Post update
// @route
// @access Private

export const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post || post.isDeleted) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
        statusCode: 404,
      });
    }

    // only owner can edit
    if (post.authorId.toString() != req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized",
        statusCode: 403,
      });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    post.isEdited = true;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated sucessfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @desc DELETE POST (SOFT DELETE)
// @route
// @access Private

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || post.isDeleted) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
        statusCode: 404,
      });
    }

    if (post.authorId.toString() != req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized",
        statusCode: 403,
      });
    }

    post.isDeleted = true;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post deleted sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc ❤️ LIKE / UNLIKE (TOGGLE)
// @route
// @access Private

export const toggleLike = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
        statusCode: 404,
      });
    }

    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      post.likedBy.pull(userId);
    } else {
      post.likedBy.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? "Unliked" : "Liked",
      likesCount: post.likedBy.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc   SAVE / UNSAVE (TOGGLE)
// @route
// @access Private

export const toggleSave = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
        statusCode: 404,
      });
    }

    const alreadySaved = post.savedBy.includes(userId);

    if (alreadySaved) {
      post.savedBy.pull(userId);
    } else {
      post.savedBy.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: alreadySaved ? "Unsaved" : "Saved",
      data: post.savedBy,
    });
  } catch (error) {
    next(error);
  }
};

// @desc ADD COMMENT
// @route
// @access Private

export const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });

    post.comments.push({
      userId: req.user.id,
      content,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Comment added",
      data: post.comments,
    });
  } catch (error) {}
};
