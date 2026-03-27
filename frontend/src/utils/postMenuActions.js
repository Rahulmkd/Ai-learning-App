export const getPostMenuActions = ({ post, navigate, onDelete }) => {
  return {
    delete: () => {
      onDelete?.(post._id, {
        onSuccess: () => {
          navigate("/community"); // redirect after delete
        },
        onError: (err) => {
          console.error("Delete failed:", err);
        },
      });
    },

    edit: () => {
      navigate(`/community/create/${post._id}`);
    },
  };
};
