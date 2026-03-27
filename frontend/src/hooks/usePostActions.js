import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "../services/postService";

const usePostActions = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (postId) => postService.deletePost(postId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const deletePost = (postId, options) => {
    deleteMutation.mutate(postId, options); //  forward options
  };

  return { deletePost };
};

export default usePostActions;
