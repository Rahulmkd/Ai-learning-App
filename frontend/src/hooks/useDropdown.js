import { useEffect, useRef } from "react";

const useDropdown = (openId, setOpenId) => {
  const ref = useRef(null);

  const isOpen = (id) => openId === id;

  const toggle = (id) => (e) => {
    e.stopPropagation();
    setOpenId((prev) => (prev === id ? null : id));
  };

  const close = () => setOpenId(null);

  // Outside click + ESC key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return {
    ref,
    isOpen,
    toggle,
    close,
  };
};

export default useDropdown;
