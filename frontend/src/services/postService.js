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

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to Get Post" };
  }
};

const postService = {
  submitPost,
  getPosts,
};
export default postService;
