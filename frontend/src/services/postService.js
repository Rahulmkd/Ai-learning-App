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

const postService = {
  submitPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
export default postService;
