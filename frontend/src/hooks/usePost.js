import { useQuery } from "@tanstack/react-query";
import postService from "../services/postService";

const usePost = (postId) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => postService.getPostById(postId),
    enabled: !!postId,
  });
};

export default usePost;
