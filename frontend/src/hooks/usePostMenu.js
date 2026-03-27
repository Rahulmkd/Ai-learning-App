import { useMemo } from "react";
import { getPostMenuItems } from "../utils/postMenuItems";
import { getPostMenuActions } from "../utils/postMenuActions";

const usePostMenu = ({ user, post, navigate, onDelete }) => {
  const isOwner = user?.id?.toString() === post?.authorId?._id?.toString();

  const menuItems = useMemo(() => getPostMenuItems(isOwner), [isOwner]);

  const menuActions = useMemo(
    () => getPostMenuActions({ post, navigate, onDelete }),
    [post, navigate, onDelete],
  );

  return {
    isOwner,
    menuItems,
    menuActions,
  };
};

export default usePostMenu;
