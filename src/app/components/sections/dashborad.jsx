"use client";
import React, { useEffect, useState } from "react";
import { Bookmark, Film, Tv2 } from "lucide-react";
import Search from "../search-bar";

export default function MediaList() {
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
                section="dashboard"
                data={data}
                onFilter={setFilteredData}
            />
            <div className="text-white sm:px-[25px] sm:pt-0 py-4 px-4 pb-6 text-[20px] sm:text-[32px] font-normal leading-[100%]">
                <h1>Trending</h1>
            </div>

            {/* Trending yatay scroll */}
            <div className="overflow-x-auto whitespace-nowrap scroll-smooth sm:px-[25px] px-4 hide-scrollbar">
                {data.length === 0 ? (
                    <p className="text-white">Loading...</p>
                ) : (
                    filteredData.slice(0, 8).map((items, index) => (
                        <div
                            key={index}
                            className="inline-block w-[240px] sm:w-[420px] mr-4 bg-[#1F1F1F] rounded-lg overflow-hidden text-white "
                        >
                            <div className="relative sm:text-[24px] h-[140px] sm:h-[230px]">
                                <img
                                    src={items.image}
                                    alt={items.title}
                                    className="w-full h-full object-cover"
                                />

                                <button
                                    onClick={() => toggleBookmark(items)}
                                    className={`absolute cursor-pointer top-2 right-2 p-2 rounded-full z-10 transition-colors ${isBookmarked(items.title)
                                        ? "bg-[#10141E]/70 text-white"
                                        : "bg-[#10141E]/70 text-white"
                                        }`}
                                >
                                    <Bookmark
                                        size={16} c
                                        fill={
                                            isBookmarked(items.title) ? "currentColor" : "none"
                                        }
                                    />
                                </button>

                                <div className="absolute bottom-0 left-0 w-full sm:p-[24px] px-3 pb-3 text-sm bg-gradient-to-t from-black/60 to-transparent">
                                    <div className="flex items-center sm:text-[15px]  text-xs opacity-80 gap-2">
                                        <span>{items.release_date.slice(0, 4)}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            {items.type === "movie" ? (
                                                <Film size={12} />
                                            ) : (
                                                <Tv2 size={12} />
                                            )}{" "}
                                            {items.type}
                                        </span>
                                        <span>•</span>
                                        <span>{items.age_rating}</span>
                                    </div>
                                    <h2 className="text-base font-semibold sm:text-[24px]">{items.title}</h2>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="text-white px-4 py-5 sm:px-[25px] sm:text-[32px] text-[20px] font-normal leading-[100%]">
                <h1>Recommended for you</h1>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:px-[25px] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
                {data.length === 0 ? (
                    <p className="text-white">Loading...</p>
                ) : (
                    filteredData.map((item, index) => (
                        <div
                            key={index}
                            className="relative w-[164px] sm:w-[220] sm:h-[202px] flex flex-col h-[164px] rounded-md overflow-hidden shadow-lg z-50"
                        >
                            <button
                                onClick={() => toggleBookmark(item)}
                                className={`absolute cursor-pointer top-2 right-2 p-2 rounded-full z-10 transition-colors ${isBookmarked(item.title) ? 'bg-[#10141E]/70 text-white' : 'bg-[#10141E]/70 text-white'
                                    }`}
                            >
                                <Bookmark
                                    size={16}
                                    fill={isBookmarked(item.title) ? 'currentColor' : 'none'}
                                />
                            </button>

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
                    ))
                )}
            </div>
        </>
    );
}


