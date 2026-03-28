import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "../services/postService";

const usePostComment = () => {
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: ({ postId, comment }) =>
      postService.addComment(postId, comment),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },

    onError: (error) => {
      console.error("Add comment failed:", error);
    },
  });

  return {
    addComment: addCommentMutation.mutate,
    isCommenting: addCommentMutation.isLoading,
  };
};

export default usePostComment;
