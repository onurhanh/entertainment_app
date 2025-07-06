"use client"
import React, { useEffect, useState } from 'react';
import Tv from './tv';
import { Film } from 'lucide-react';

export default function MediaList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/data/data.json')
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 p-4">
            {data.length === 0 ? (
                <p className="text-white">Loading...</p>
            ) : (
                data.map((item, index) => (
                    <div key={index} className="w-[164px] flex flex-col h-[154px] rounded-md overflow-hidden shadow-lg z-50">
                        {/* Background image */}

                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-[110px] object-cover"
                        />

                        {/* Overlay content */}
                        <div className="text-white pt-2 flex flex-col justify-between">
                            <div className="text-xs opacity-80 gap-2 flex items-center">

                                <div className='capitalize gap-2 flex'>
                                    <div>{item.release_date.slice(0, 4)}</div>
                                    <div className='w-[2px] h-[2px] border my-auto bg-[#FFFFFF]'></div>
                                    <div className=''>{item.type === 'movie' ? (
                                        <Film size={14} className="inline-block " />
                                    ) : (
                                        <Tv size={14} className="inline-block " />
                                    )} {item.type}
                                    </div>
                                    <div className='w-[2px] h-[2px] border my-auto bg-[#FFFFFF]'>
                                    </div>
                                    {item.age_rating}
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold">{item.title}</h2>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
