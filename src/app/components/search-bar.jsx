"use client"
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'

export default function Search({ section, data, onFilter }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
  if (!data || !Array.isArray(data)) return

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  )
  onFilter(filtered)
}, [query, data, onFilter])

  const getPlaceholder = () => {
    if (section === 'movies') return 'Search for movies'
    if (section === 'tv') return 'Search for TV series'
    if (section === 'bookmarks') return 'Search for bookmarked shows'
    return 'Search for Movies or TV Series'
  }

  return (
    <div className="flex items-center gap-4 px-5 py-3 sm:text-[24px] sm:py-[30px] sm:px-[25px] bg-transparent lg:pt-[55px]">
      <SearchIcon className="text-white " />
      <Input
        placeholder={getPlaceholder()}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent sm:text-[24px] text-white border-0 border-b-2 border-transparent focus:border-b focus:border-[#5A698F] focus:outline-none rounded-none"
      />
    </div>
  )
}
