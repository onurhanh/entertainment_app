'use client'

import { useRouter } from "next/router";
import { Bookmark, Film, Grid2x2, Tv } from 'lucide-react'

export default function Header({ onSectionChange, currentSection }) {

  const iconClass = (key) =>
    `w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] cursor-pointer transition-colors duration-200 ${currentSection === key ? 'text-white' : 'text-[#5A698F]'
    } hover:text-white`

  const RefreshButton = () => {
    const router = useRouter();
  }

    return (
      <>
        {/* Mobil görünüm: Üst bar */}
        <div className="xl:hidden sm:px-[25px] sm:pt-[23px]">
          <div className="bg-[#161D2F] flex justify-between items-center p-[18px] sm:p-[22px] sm:rounded-[10px] xl:rounded-[20px]">
            <img src="/path.svg" alt="logo" />
            <div className="flex gap-[20px] sm:gap-[32px] xl:gap-[40px]">
              <Grid2x2
                onClick={() => {
                  onSectionChange('dashboard')
                }}
                className={iconClass('dashboard')}
              />
              <Film
                onClick={() => {
                  onSectionChange('movies')
                }}
                className={iconClass('movies')}
              />
              <Tv
                onClick={() => {
                  onSectionChange('tv')
                }}
                className={iconClass('tv')}
              />
              <Bookmark
                onClick={() => {
                  router.replace(router.asPath)
                  onSectionChange('bookmarks')
                }}
                className={iconClass('bookmarks')}
              />
            </div>
            <img src="/oval.svg" alt="avatar" />
          </div>
        </div>

        {/* Masaüstü görünüm: Sol sabit sidebar */}
        <div className="hidden xl:flex fixed top-8 left-8 bottom-8 w-[96px] h-4/5 bg-[#161D2F] rounded-[20px] flex-col justify-between items-center py-8 z-50">
          {/* Logo */}

          {/* Menü ikonları */}
          <div className='flex-col'>
            <div>
              <img src="/path.svg" alt="logo" className="w-[25px] h-[20px]" />
            </div>
            <div className="flex flex-col gap-10 pt-[75px]">


              <Grid2x2
                onClick={() => {
                  onSectionChange('dashboard')
                }}
                className={iconClass('dashboard')}
              />
              <Film
                onClick={() => {
                  onSectionChange('movies')
                }}
                className={iconClass('movies')}
              />
              <Tv
                onClick={() => {
                  onSectionChange('tv')
                }}
                className={iconClass('tv')}
              />
              <Bookmark
                onClick={() => {
                  onSectionChange('bookmarks')
                }}
                className={iconClass('bookmarks')}
              />
            </div>
          </div>

          {/* Avatar */}
          <img src="/oval.svg" alt="avatar" className="w-8 h-8 rounded-full border border-white" />
        </div>
      </>
    )
  }

