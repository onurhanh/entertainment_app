import { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedItems, setBookmarkedItems] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("bookmarkedItems");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error("Bookmark verisi okunamadı", e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarkedItems", JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  // ✅ Toggle Bookmark
  const toggleBookmark = (item) => {
    const exists = bookmarkedItems.find((i) => i.title === item.title);
    if (exists) {
      setBookmarkedItems((prev) =>
        prev.filter((i) => i.title !== item.title)
      );
    } else {
      setBookmarkedItems((prev) => [...prev, item]);
    }
  };

  // ✅ Check if bookmarked
  const isBookmarked = (title) =>
    bookmarkedItems.some((item) => item.title === title);

  return (
    <BookmarkContext.Provider value={{ bookmarkedItems, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
