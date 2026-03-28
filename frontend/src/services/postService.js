import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const submitPost = async (post) => {
  try {
    const response = await axiosInstance.post(API_PATHS.POST.SUBMIT_POST, {
      ...post,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to Submit Post" };
  }
};

const getPosts = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.POST.GET_POSTS);
    console.log("API CALLED__getPosts");
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to Get Post" };
  }
};

const getPostById = async (postId) => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.POST.GET_POSTS_BY_ID(postId),
    );
    console.log("API CALLED__getPostById");
    return response.data.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to Get Post" };
  }
};

const updatePost = async (postId, post) => {
  try {
    const response = await axiosInstance.put(
      API_PATHS.POST.UPDATE_POST(postId),
      { ...post },
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update Post" };
  }
};

const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(
      API_PATHS.POST.DELETE_POST(postId),
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete Post" };
  }
};

const addComment = async (postId, comment) => {
  try {
    const response = await axiosInstance.post(
      API_PATHS.POST.ADD_COMMENT(postId),
      { comment },
    );
    console.log("API CALLED__ADD_COMMENT");

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to add comment Post" };
  }
};
const postService = {
  submitPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  addComment,
};
export default postService;
