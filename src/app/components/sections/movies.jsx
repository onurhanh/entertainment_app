"use client"
import React, { useEffect, useState } from 'react';
import { Bookmark, Film, Tv2 } from 'lucide-react';
import Search from '../search-bar';

export default function Movies() {
  const [data, setData] = useState([]);
  const [bookmarks, setBookmarks] = useState({});
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    fetch('/data/data.json')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setFilteredData(json)
      })
      .catch(err => console.error(err))
  }, [])

  const toggleBookmark = (index) => {
    setBookmarks((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  return (
    <>
      <Search
        section="dashboard"
        data={data}
        onFilter={setFilteredData}
      />
      <div className='text-white sm:text-[32px] sm:pt-[0px] sm:px-[25px] px-4 py-4 text-[20px] font-normal leading-[100%]'>
        <h1>Movies</h1>
      </div>
      <div className="grid grid-cols-2 sm:px-[25px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8 gap-4 p-4">
        {data.length === 0 ? (
          <p className="text-white">Loading...</p>
        ) : (
          filteredData
            .filter((item) => item.type === 'movie')
            .map((item, index) => (
              <div key={index} className="relative sm:w-[220px] w-[164px] flex flex-col h-[164px] sm:h-[202px] rounded-md overflow-hidden shadow-lg z-50">
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
                    <h2 className="text-base font-semibold sm:text-[18px] py-1">{item.title}</h2>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </>
  )
}
