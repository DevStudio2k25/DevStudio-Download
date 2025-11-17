'use client'

import Navbar from '@/components/navbar'
import Link from 'next/link'


export default function GalleryPage() {
  const galleries = [
    {
      title: 'Mobile Gallery',
      description: 'Browse mobile screenshots',
      icon: '📱',
      color: 'from-[#7C3AED] to-[#00E5FF]',
      href: '/gallery/mobile',
    },
    {
      title: 'PC Gallery',
      description: 'Browse desktop screenshots',
      icon: '🖥️',
      color: 'from-[#00E5FF] to-[#06C1A0]',
      href: '/gallery/pc',
    },
  ]

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-background">
      <Navbar />
      
      <div className="lg:pl-20 xl:pl-72">
        <div className="fixed inset-0 pointer-events-none overflow-hidden lg:left-20 xl:left-72">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#7C3AED] opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#06C1A0] opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-20 mt-16">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#00E5FF] via-[#7C3AED] to-[#00E5FF] bg-clip-text text-transparent mb-4">
              Gallery
            </h1>
            <p className="text-xl text-gray-300">Choose a platform to explore</p>
          </div>

          {/* Gallery Cards */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleries.map((gallery) => (
              <Link
                key={gallery.title}
                href={gallery.href}
                className="group relative block"
              >
                {/* Glow background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gallery.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
                ></div>

                {/* Card */}
                <div className="relative bg-black/80 border border-gray-700 group-hover:border-[#00E5FF]/50 rounded-3xl p-12 backdrop-blur-md transition-all duration-500 transform group-hover:scale-105">
                  {/* Icon */}
                  <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {gallery.icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-bold text-white mb-3">{gallery.title}</h2>

                  {/* Description */}
                  <p className="text-gray-400 mb-6">{gallery.description}</p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-[#00E5FF] group-hover:gap-4 transition-all duration-300">
                    <span>View Gallery</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}
