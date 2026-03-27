export const getPostMenuItems = (isOwner) => {
  if (isOwner) {
    return [
      { label: "Delete", key: "delete", danger: true },
      { label: "Edit", key: "edit" },
      { label: "Copy link", key: "copy" },
      { label: "Report", key: "report" },
    ];
  }

  return [
    { label: "Copy link", key: "copy" },
    { label: "Report", key: "report" },
  ];
};
