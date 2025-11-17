'use client'

import Navbar from '@/components/navbar'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function MobileGalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [waveProgress, setWaveProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Generate array of image numbers from 1 to 31
  const images = Array.from({ length: 31 }, (_, i) => i + 1)

  // Continuous wave animation - 1.5 seconds per card (1s highlight + 0.5s transition)
  useEffect(() => {
    let animationFrame: number
    let startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const cycleDuration = images.length * 2000 // 2000ms (2 seconds) per card
      const progress = (elapsed % cycleDuration) / cycleDuration
      setWaveProgress(progress)
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedImage(selectedImage > 1 ? selectedImage - 1 : 31)
      } else if (e.key === 'ArrowRight') {
        setSelectedImage(selectedImage < 31 ? selectedImage + 1 : 1)
      } else if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  const getCardTransform = (index: number, isHovered: boolean) => {
    if (isHovered) {
      return 'scale(1.08) translateZ(60px) rotateY(0deg) rotateX(0deg)'
    }
    
    // Sharp wave effect - only current card animates
    const waveInfluence = getCardGlow(index)
    
    // Wave animation values - more dramatic for single card
    const waveY = waveInfluence * -20
    const waveScale = 1 + (waveInfluence * 0.15)
    const waveRotate = Math.sin(waveInfluence * Math.PI) * 8
    
    // Mouse parallax
    const offsetX = mousePosition.x * 3
    const offsetY = mousePosition.y * 3
    const tiltX = mousePosition.x * 5
    const tiltY = -mousePosition.y * 5
    
    return `translateX(${offsetX}px) translateY(${offsetY + waveY}px) translateZ(${waveInfluence * 30}px) rotateY(${tiltX + waveRotate}deg) rotateX(${tiltY}deg) scale(${waveScale})`
  }

  const getCardGlow = (index: number) => {
    const totalCards = images.length
    const currentCard = Math.floor(waveProgress * totalCards)
    
    // Sharp transition - only current card glows
    if (index === currentCard) {
      // Smooth fade in/out within the card's time (2 seconds)
      const cardStartProgress = currentCard / totalCards
      const cardEndProgress = (currentCard + 1) / totalCards
      const cardDuration = cardEndProgress - cardStartProgress
      const cardLocalProgress = (waveProgress - cardStartProgress) / cardDuration
      
      // Slower fade: in first 20%, stay bright 60%, fade out last 20%
      if (cardLocalProgress < 0.2) {
        // Ease in
        const t = cardLocalProgress / 0.2
        return t * t * (3 - 2 * t) // Smoothstep
      } else if (cardLocalProgress > 0.8) {
        // Ease out
        const t = (cardLocalProgress - 0.8) / 0.2
        return 1 - (t * t * (3 - 2 * t)) // Smoothstep
      } else {
        return 1
      }
    }
    
    return 0
  }

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-background">
      <Navbar />
      
      <div className="lg:pl-20 xl:pl-72">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#7C3AED] opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#06C1A0] opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 mt-16">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#00E5FF] via-[#7C3AED] to-[#00E5FF] bg-clip-text text-transparent mb-4">
              📱 Mobile Gallery
            </h1>
            <p className="text-base md:text-lg text-gray-300">Interactive 3D portrait screenshots • {images.length} images</p>
          </div>

          {/* Mobile Gallery Grid - 3D Interactive & Responsive */}
          <div 
            ref={containerRef}
            className="w-full mx-auto perspective-1000"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6 lg:gap-8">
              {images.map((num, index) => (
                <div
                  key={num}
                  className="group relative cursor-pointer preserve-3d animate-fade-in-up"
                  onClick={() => setSelectedImage(num)}
                  onMouseEnter={() => setHoveredImage(num)}
                  onMouseLeave={() => setHoveredImage(null)}
                  style={{
                    transform: getCardTransform(index, hoveredImage === num),
                    transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  {/* 3D Glow effect with wave and pulse */}
                  <div 
                    className="absolute -inset-4 bg-gradient-to-br from-[#7C3AED]/30 to-[#00E5FF]/30 rounded-3xl blur-2xl transition-opacity duration-300"
                    style={{
                      transform: 'translateZ(-20px)',
                      opacity: hoveredImage === num ? 1 : getCardGlow(index) * 0.6,
                      animation: hoveredImage === num ? 'pulse 2s ease-in-out infinite' : 'none',
                    }}
                  ></div>

                  {/* Image container - Dynamic sizing with tilt */}
                  <div 
                    className="relative w-full rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-500 bg-gray-900 shadow-2xl"
                    style={{
                      borderColor: hoveredImage === num 
                        ? 'rgba(0, 229, 255, 0.7)' 
                        : `rgba(0, 229, 255, ${getCardGlow(index) * 0.4})`,
                      boxShadow: hoveredImage === num
                        ? '0 0 40px rgba(0, 229, 255, 0.5)'
                        : `0 0 ${getCardGlow(index) * 30}px rgba(124, 58, 237, ${getCardGlow(index) * 0.4})`,
                    }}
                    onMouseMove={(e) => {
                      if (hoveredImage === num && window.innerWidth >= 768) {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = (e.clientX - rect.left) / rect.width
                        const y = (e.clientY - rect.top) / rect.height
                        const tiltX = (y - 0.5) * 20
                        const tiltY = (x - 0.5) * -20
                        e.currentTarget.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
                    }}
                  >
                    <Image
                      src={`/assets/mobile/${num}.jpg`}
                      alt={`Mobile screenshot ${num}`}
                      width={400}
                      height={711}
                      className="w-full h-auto object-contain transition-all duration-300"
                      style={{
                        filter: hoveredImage === num 
                          ? 'brightness(1.1)' 
                          : `brightness(${1 + getCardGlow(index) * 0.15})`,
                      }}
                    />
                    
                    {/* Shimmer effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.2), transparent)',
                        backgroundSize: '200% 100%',
                        animation: hoveredImage === num ? 'shimmer 2s ease-in-out infinite' : 'none',
                      }}
                    ></div>

                    {/* 3D Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-3 md:pb-6">
                      <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-white font-bold text-sm md:text-lg mb-1 block drop-shadow-lg">Screenshot {num}</span>
                        <span className="text-[#00E5FF] text-xs animate-pulse">Click to view</span>
                      </div>
                    </div>

                    {/* Corner accent with wave */}
                    <div 
                      className="absolute top-1 right-1 md:top-2 md:right-2 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-[#00E5FF] transition-opacity duration-300 rounded-tr-lg"
                      style={{
                        opacity: hoveredImage === num ? 1 : getCardGlow(index) * 0.5,
                      }}
                    ></div>
                    <div 
                      className="absolute bottom-1 left-1 md:bottom-2 md:left-2 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-[#7C3AED] transition-opacity duration-300 rounded-bl-lg"
                      style={{
                        opacity: hoveredImage === num ? 1 : getCardGlow(index) * 0.5,
                      }}
                    ></div>
                  </div>

                  {/* Floating number badge with wave animation */}
                  <div 
                    className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#7C3AED] to-[#00E5FF] rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg transition-all duration-300"
                    style={{
                      opacity: hoveredImage === num ? 1 : getCardGlow(index) * 0.8,
                      transform: hoveredImage === num 
                        ? 'scale(1.1)' 
                        : `scale(${1 + getCardGlow(index) * 0.2})`,
                      animation: hoveredImage === num ? 'float 2s ease-in-out infinite' : 'none',
                      boxShadow: `0 0 ${getCardGlow(index) * 20}px rgba(0, 229, 255, ${getCardGlow(index) * 0.6})`,
                    }}
                  >
                    {num}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox Modal with 3D effects */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white text-2xl md:text-3xl hover:text-[#00E5FF] transition-all duration-300 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md z-10"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-semibold text-sm md:text-base z-10">
            {selectedImage} / 31
          </div>
          
          {/* Main image with 3D effect */}
          <div className="relative max-w-sm md:max-w-md w-full animate-scale-in px-4 md:px-0">
            <div className="relative w-full">
              <Image
                src={`/assets/mobile/${selectedImage}.jpg`}
                alt={`Mobile screenshot ${selectedImage}`}
                width={400}
                height={711}
                className="w-full h-auto rounded-xl md:rounded-2xl shadow-2xl shadow-[#00E5FF]/30"
                priority
              />
              
              {/* Glow effect around image */}
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-br from-[#7C3AED]/40 to-[#00E5FF]/40 rounded-2xl md:rounded-3xl blur-3xl -z-10 animate-pulse"></div>
            </div>
          </div>

          {/* Navigation arrows with better styling */}
          <button
            className="absolute left-2 md:left-6 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-white text-3xl md:text-4xl hover:text-[#00E5FF] transition-all duration-300 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md hover:scale-110"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(selectedImage > 1 ? selectedImage - 1 : 31)
            }}
          >
            ‹
          </button>
          <button
            className="absolute right-2 md:right-6 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center text-white text-3xl md:text-4xl hover:text-[#00E5FF] transition-all duration-300 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md hover:scale-110"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(selectedImage < 31 ? selectedImage + 1 : 1)
            }}
          >
            ›
          </button>

          {/* Keyboard hint */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs md:text-sm hidden sm:block">
            Use ← → keys or swipe to navigate
          </div>
        </div>
      )}

      <style jsx>{`
        .perspective-1000 {
          perspective: 1500px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(-10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9) rotateY(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: translateZ(-20px) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translateZ(-20px) scale(1.1);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        `}</style>
      </div>
    </main>
  )
}
