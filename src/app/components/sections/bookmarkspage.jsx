"use client";
import { useBookmarks } from '../context/BookmarkContext';
import { Film, Tv2 } from 'lucide-react';

export default function BookmarksPage() {
  const { bookmarkedItems } = useBookmarks();

  return (
    <div className="text-white sm:pt-[0px] p-4 sm:px-[25px]">
      <h1 className="text-xl mb-4 sm:text-[32px]">Bookmarked Items</h1>
      {bookmarkedItems.length === 0 ? (
        <p>Hiç favori eklenmemiş.</p>
      ) : (
        <div className="grid grid-cols-2 sm:px-[25px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-4">
          {bookmarkedItems.map((item, index) => (
            <div key={index} className="bg-[#1F1F1F] p-2 rounded-md">
              <img src={item.image} alt={item.title} className="w-full h-[110px] object-cover rounded-md" />
              <div className="mt-2 text-xs opacity-70 flex gap-2 items-center">
                <span>{item.release_date.slice(0, 4)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  {item.type === "movie" ? <Film size={12} /> : <Tv2 size={12} />} {item.type}
                </span>
              </div>
              <h2 className="text-sm font-semibold mt-1">{item.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
