import { useQuery } from "@tanstack/react-query";
import postService from "../services/postService";

const usePosts = (tab) => {
  return useQuery({
    queryKey: ["posts", tab],
    queryFn: () => postService.getPosts(tab),
  });
};

export default usePosts;
