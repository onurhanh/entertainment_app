'use client'

import { useState } from 'react'
import { Bookmark, Film, Grid2x2, Tv } from 'lucide-react'

export default function Header({ onSectionChange }) {
  const [active, setActive] = useState('dashboard')

  const iconClass = (key) =>
    `w-5 h-5 cursor-pointer transition-colors duration-200 ${
      active === key ? 'text-white' : 'text-[#5A698F]'
    } hover:text-white`

  return (
    <div className="bg-[#161D2F] flex justify-between items-center p-5">
      <div>
        <img src="/path.svg" alt="logo" />
      </div>

      <div className="flex gap-5">
        <Grid2x2
          onClick={() => {
            setActive('dashboard')
            onSectionChange('dashboard')
          }}
          className={iconClass('dashboard')}
        />
        <Film
          onClick={() => {
            setActive('movies')
            onSectionChange('movies')
          }}
          className={iconClass('movies')}
        />
        <Tv
          onClick={() => {
            setActive('tv')
            onSectionChange('tv')
          }}
          className={iconClass('tv')}
        />
        <Bookmark
          onClick={() => {
            setActive('bookmarks')
            onSectionChange('bookmarks')
          }}
          className={iconClass('bookmarks')}
        />
      </div>

      <div>
        <img src="/oval.svg" alt="avatar" />
      </div>
    </div>
  )
}
