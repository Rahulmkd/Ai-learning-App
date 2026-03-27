import { useMutation, useQueryClient } from "@tanstack/react-query";
import postService from "../services/postService";

const useCreatePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => postService.submitPost(data),

    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return {
    createPost: mutation.mutate,
    isCreating: mutation.isPending,
  };
};

export default useCreatePost;
