"use client";
import { useState, useEffect } from 'react';
import { useBookmarks } from '../context/BookmarkContext';
import { Film, Tv2 } from 'lucide-react';
import Search from '../search-bar';

export default function BookmarksPage({ section }) {
  const { bookmarkedItems } = useBookmarks();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(bookmarkedItems);
  }, [bookmarkedItems, section]);

  // Filtrelenmiş verileri iki gruba ayır
  const bookmarkedMovies = filteredData.filter(item => item.type === 'movie');
  const bookmarkedTVSeries = filteredData.filter(item => item.type === 'series');

  return (
    <>
      <Search
        section="bookmarks"
        data={bookmarkedItems}
        onFilter={setFilteredData}
      />

      <div className="text-white sm:pt-[0px] p-4 sm:px-[25px]">
        {/* Bookmarked Movies */}
        <h1 className="text-xl mb-4 sm:text-[32px]">Bookmarked Movies</h1>
        {bookmarkedMovies.length === 0 ? (
          <p>Hiç film favorilenmemiş veya eşleşen sonuç bulunamadı.</p>
        ) : (
          <div className="grid grid-cols-2 sm:px-[25px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-4">
            {bookmarkedMovies.map((item, index) => (
              <div key={index} className="relative w-[164px] sm:w-[220] sm:h-[202px] flex flex-col h-[164px] rounded-md overflow-hidden shadow-lg z-50">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-[110px] sm:h-[140px] object-cover"
                            />

                            <div className="text-white pt-2 flex flex-col justify-between">
                                <div className="text-xs sm:text-[13px] opacity-80 gap-2 flex items-center">
                                    <div className="capitalize gap-2 flex">
                                        <div>{item.release_date.slice(0, 4)}</div>
                                        <div className="w-[2px] h-[2px] border my-auto bg-[#FFFFFF]"></div>
                                        <div className="flex items-center gap-1">
                                            {item.type === "movie" ? (
                                                <Film size={14} className="inline-block" />
                                            ) : (
                                                <Tv2 size={14} className="inline-block" />
                                            )}
                                            {item.type}
                                        </div>
                                        <div className="w-[2px] h-[2px] border my-auto bg-[#FFFFFF]"></div>
                                        {item.age_rating}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-base sm:text-[18px] font-semibold py-1">
                                        {item.title}
                                    </h2>
                                </div>
                            </div>
                        </div>
            ))}
          </div>
        )}

        {/* Bookmarked TV Series */}
        <h1 className="text-xl mt-8 mb-4 sm:text-[32px]">Bookmarked TV Series</h1>
        {bookmarkedTVSeries.length === 0 ? (
          <p>Hiç dizi favorilenmemiş veya eşleşen sonuç bulunamadı.</p>
        ) : (
          <div className="grid grid-cols-2 sm:px-[25px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-4">
            {bookmarkedTVSeries.map((item, index) => (
              <div key={index} className="relative w-[164px] sm:w-[220] sm:h-[202px] flex flex-col h-[164px] rounded-md overflow-hidden shadow-lg z-50">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-[110px] sm:h-[140px] object-cover"
                            />

                            <div className="text-white pt-2 flex flex-col justify-between">
                                <div className="text-xs sm:text-[13px] opacity-80 gap-2 flex items-center">
                                    <div className="capitalize gap-2 flex">
                                        <div>{item.release_date.slice(0, 4)}</div>
                                        <div className="w-[2px] h-[2px] border my-auto bg-[#FFFFFF]"></div>
                                        <div className="flex items-center gap-1">
                                            {item.type === "movie" ? (
                                                <Film size={14} className="inline-block" />
                                            ) : (
                                                <Tv2 size={14} className="inline-block" />
                                            )}
                                            {item.type}
                                        </div>
                                        <div className="w-[2px] h-[2px] border my-auto bg-[#FFFFFF]"></div>
                                        {item.age_rating}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-base sm:text-[18px] font-semibold py-1">
                                        {item.title}
                                    </h2>
                                </div>
                            </div>
                        </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
