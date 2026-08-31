"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const FloatingTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div 
      className={`fixed bottom-5 right-5 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={scrollToTop}
    >
      <button
        type="button"
        aria-label="Scroll back to top"
        className="p-0 border-none bg-transparent cursor-pointer"
      >
      <div className="w-[32px] md:w-[64px]">
          <Image
            className="rounded-full hover:opacity-80 transition-opacity"
            src="/atomic_symbol.gif"
            width={200}
            height={200}
            alt="Scroll to Top - Atomic Energy Symbol"
            unoptimized
          />
        </div>
        <span className='block text-xl font-bold text-blue-michigan'>
          Top
        </span>
      </button>
    </div>
  )
}

export default FloatingTop