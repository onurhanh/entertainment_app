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

  return (
    <BookmarkContext.Provider value={{ bookmarkedItems, setBookmarkedItems }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
