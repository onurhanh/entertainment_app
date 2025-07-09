"use client";
import { createContext, useContext, useEffect, useState } from "react";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  // Sayfa yüklenince localStorage'tan oku
  useEffect(() => {
    const stored = localStorage.getItem("bookmarkedItems");
    if (stored) {
      setBookmarkedItems(JSON.parse(stored));
    }
  }, []);

  // Değiştikçe localStorage'a yaz
  useEffect(() => {
    localStorage.setItem("bookmarkedItems", JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  const toggleBookmark = (item) => {
    const exists = bookmarkedItems.find((i) => i.title === item.title);
    if (exists) {
      setBookmarkedItems((prev) => prev.filter((i) => i.title !== item.title));
    } else {
      setBookmarkedItems((prev) => [...prev, item]);
    }
  };

  const isBookmarked = (title) => {
    return bookmarkedItems.some((i) => i.title === title);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedItems, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);
