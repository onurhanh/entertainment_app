'use client'

import { useState, useEffect } from 'react'
import Dashboard from './components/sections/dashborad'
import Movies from './components/sections/movies'
import Tv from './components/sections/tv'
import Header from './components/header'
import BookmarksPage from './components/sections/bookmarkspage'
import { BookmarkProvider } from './components/context/BookmarkContext'


export default function Page() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('activeSection');
    setSection(stored || 'dashboard');
  }, []);

  const handleSectionChange = (value) => {
    setSection(value);
    localStorage.setItem('activeSection', value);
  };

  const renderContent = () => {
    switch (section) {
      case 'dashboard':
        return <Dashboard key="dashboard" />
      case 'movies':
        return <Movies key="movies" />
      case 'tv':
        return <Tv key="tv" />
      case 'bookmarks':
        return <BookmarksPage key={Date.now()} /> 
      default:
        return null
    }
  }



  return (
    <BookmarkProvider>
      <div className="min-h-screen bg-[#10141E]">
        {/* Sabit sol sidebar */}
        <Header onSectionChange={handleSectionChange}
          currentSection={section} />

        {/* Sağ içerik alanı */}
        <main className="xl:px-6 xl:ml-[128px]">
          <div className="">
            {renderContent()}
          </div>
        </main>
      </div>
    </BookmarkProvider>
  )
}
