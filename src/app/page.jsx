'use client'

import { useState } from 'react'
import Dashboard from './components/sections/dashborad'
import Movies from './components/sections/movies'
import Bookmarks from './components/sections/bookmarks'
import Tv from './components/sections/tv'
import Search from './components/search-bar'
import Header from './components/header'

export default function Page() {
  const [section, setSection] = useState('dashboard')

  const renderContent = () => {
    switch (section) {
      case 'dashboard':
        return <Dashboard />
      case 'movies':
        return <Movies />
      case 'tv':
        return <Tv />
      case 'bookmarks':
        return <Bookmarks />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#10141E]">
      <Header onSectionChange={setSection} />
      <Search section={section} />
      {renderContent()}
    </div>
  )
}
