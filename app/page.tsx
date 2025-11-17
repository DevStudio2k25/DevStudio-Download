'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/navbar'
import Hero from '@/components/hero'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative w-full overflow-hidden bg-background">
      <Navbar />
      <div className="lg:pl-20 xl:pl-72">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orb top-right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#7C3AED] opacity-10 blur-3xl animate-pulse"></div>
        
        {/* Gradient orb bottom-left */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#06C1A0] opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating particles - Only render on client */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#00E5FF] rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

        {/* Content sections */}
        <div className="relative z-10">
          <Hero scrollY={scrollY} />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
      `}</style>
    </main>
  )
}
