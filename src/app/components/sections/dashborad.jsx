"use client";
import React, { useEffect, useState } from "react";
import { Bookmark, Film, Tv2 } from "lucide-react";

export default function MediaList() {
    const [data, setData] = useState([]);
    const [bookmarkedItems, setBookmarkedItems] = useState([]);

    // Veriyi çek
    useEffect(() => {
        fetch("/data/data.json")
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error(err));
    }, []);

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
            <div className="text-white px-4 pb-6 text-[20px] font-normal leading-[100%]">
                <h1>Trending</h1>
            </div>

            {/* Trending yatay scroll */}
            <div className="overflow-x-auto whitespace-nowrap scroll-smooth px-4 hide-scrollbar">
                {data.length === 0 ? (
                    <p className="text-white">Loading...</p>
                ) : (
                    data.slice(0, 8).map((items, index) => (
                        <div
                            key={index}
                            className="inline-block w-[240px] mr-4 bg-[#1F1F1F] rounded-lg overflow-hidden text-white"
                        >
                            <div className="relative h-[140px]">
                                <img
                                    src={items.image}
                                    alt={items.title}
                                    className="w-full h-full object-cover"
                                />

                                <button
                                    onClick={() => toggleBookmark(items)}
                                    className={`absolute top-2 right-2 p-2 rounded-full z-10 transition-colors ${isBookmarked(items.title)
                                            ? "bg-[#10141E]/70 text-white"
                                            : "bg-[#10141E]/70 text-white"
                                        }`}
                                >
                                    <Bookmark
                                        size={16}
                                        fill={
                                            isBookmarked(items.title) ? "currentColor" : "none"
                                        }
                                    />
                                </button>

                                <div className="absolute bottom-0 left-0 w-full px-3 pb-3 text-sm bg-gradient-to-t from-black/60 to-transparent">
                                    <div className="flex items-center text-xs opacity-80 gap-2">
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
                                    <h2 className="text-base font-semibold">{items.title}</h2>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="text-white px-4 py-5 text-[20px] font-normal leading-[100%]">
                <h1>Recommended for you</h1>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                {data.length === 0 ? (
                    <p className="text-white">Loading...</p>
                ) : (
                    data.map((item, index) => (
                        <div
                            key={index}
                            className="relative w-[164px] flex flex-col h-[164px] rounded-md overflow-hidden shadow-lg z-50"
                        >
                            <button
                                onClick={() => toggleBookmark(item)}
                                className={`absolute top-2 right-2 p-2 rounded-full z-10 transition-colors ${isBookmarked(item.title) ? 'bg-[#10141E]/70 text-white' : 'bg-[#10141E]/70 text-white'
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
                                className="w-full h-[110px] object-cover"
                            />

                            <div className="text-white pt-2 flex flex-col justify-between">
                                <div className="text-xs opacity-80 gap-2 flex items-center">
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
                                    <h2 className="text-base font-semibold py-1">
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


