"use client"
import React, { useEffect, useState } from 'react';
import { Bookmark, Film, Tv2 } from 'lucide-react';

export default function Movies() {
  const [data, setData] = useState([]);
  const [bookmarks, setBookmarks] = useState({});

  useEffect(() => {
    fetch('/data/data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const toggleBookmark = (index) => {
    setBookmarks((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  return (
    <>
      <div className='text-white px-4 py-4 text-[20px] font-normal leading-[100%]'>
        <h1>Movies</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {data.length === 0 ? (
          <p className="text-white">Loading...</p>
        ) : (
          data
            .filter((item) => item.type === 'movie')
            .map((item, index) => (
              <div key={index} className="relative w-[164px] flex flex-col h-[164px] rounded-md overflow-hidden shadow-lg z-50">
                {/* Bookmark Icon */}
                <button
                  onClick={() => toggleBookmark(index)}
                  className={`absolute top-2 right-2 p-2 rounded-full z-10 transition-colors ${bookmarks[index] ? 'bg-[#10141E]/70 text-white' : 'bg-[#10141E]/70 text-white'
                    }`}
                >
                  <Bookmark
                    size={16}
                    fill={bookmarks[index] ? 'currentColor' : 'none'}
                  />
                </button>

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[110px] object-cover"
                />

                {/* Content */}
                <div className="text-white pt-2 flex flex-col justify-between">
                  <div className="text-xs opacity-80 gap-2 flex items-center">
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
                    <h2 className="text-base font-semibold py-1">{item.title}</h2>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </>
  )
}
