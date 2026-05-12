import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "../services/postService";

const useLikePost = () => {
  const queryClient = useQueryClient();

  const addLikeMutation = useMutation({
    mutationFn: ({ postId }) => postService.toggleLike(postId),

    onSuccess: () => {
      // Feed
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      // Single post
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
    onError: (error) => {
      console.error("Add Like Failed", error);
    },
  });

  return { toggleLike: addLikeMutation.mutate };
};

export default useLikePost;
