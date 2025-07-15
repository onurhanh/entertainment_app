"use client"
import React, { useEffect, useState } from 'react';
import { Bookmark, Film, Tv2 } from 'lucide-react';
import Search from '../search-bar';

export default function Tv() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([])

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
  // Veriyi çek
  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setFilteredData(json)
      })
      .catch(err => console.error(err))
  }, [])

  // localStorage'tan oku
  useEffect(() => {
    const stored = localStorage.getItem("bookmarkedItems");
    if (stored) {
      setBookmarkedItems(JSON.parse(stored));
    }
  }, []);

  // localStorage'a yaz
  useEffect(() => {
    localStorage.setItem("bookmarkedItems", JSON.stringify(bookmarkedItems));
  }, [bookmarkedItems]);

  // Ekle/Çıkar
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

  const isBookmarked = (title) =>
    bookmarkedItems.some((item) => item.title === title);
  return (
    <>
      <Search
        section="tv"
        data={data}
        onFilter={setFilteredData}
      />
      <div className='text-white sm:text-[32px] sm:pt-[0px] sm:px-[25px] px-4 py-4 text-[20px] font-normal leading-[100%]'>
        <h1>TV Series</h1>
      </div>
      <div className="grid grid-cols-2 sm:px-[25px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8 gap-4 p-4">
        {data.length === 0 ? (
          <p className="text-white">Loading...</p>
        ) : (
          filteredData
            .filter((item) => item.type === 'series')
            .map((item, index) => (
              <div key={index} className="relative sm:w-[220px] sm:h-[202px] w-[164px] flex flex-col h-[164px] rounded-md overflow-hidden shadow-lg z-50">
                {/* Bookmark Icon */}
                <button
                  onClick={() => toggleBookmark(item)}
                  className={`absolute top-2 cursor-pointer right-2 p-2 rounded-full z-10 transition-colors ${isBookmarked(item.title) ? 'bg-[#10141E]/70 text-white' : 'bg-[#10141E]/70 text-white'
                    }`}
                >
                  <Bookmark
                    size={16}
                    fill={isBookmarked(item.title) ? 'currentColor' : 'none'}
                  />
                </button>

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[110px] sm:h-[140px] object-cover"
                />

                {/* Content */}
                <div className="text-white pt-2 flex flex-col justify-between">
                  <div className="text-xs sm:text-[13px] opacity-80 gap-2 flex items-center">
                    <div className='capitalize gap-2 flex'>
                      <div>{item.release_date.slice(0, 4)}</div>
                      <div className='w-[2px] h-[2px] border my-auto bg-[#FFFFFF]'></div>
                      <div className='flex items-center gap-1'>
                        {item.type === 'movie' ? (
                          <Film size={14} className="inline-block" />
                        ) : (
                          <Tv2 size={14} className="inline-block" />
                        )}
                        {item.type}
                      </div>
                      <div className='w-[2px] h-[2px] border my-auto bg-[#FFFFFF]'></div>
                      {item.age_rating}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold py-1 sm:text-[18px]">{item.title}</h2>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </>
  )
}
