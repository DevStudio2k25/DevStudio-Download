'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Home, Sparkles, Image, FileText, Download, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Features', href: '/features', icon: Sparkles },
    { name: 'Gallery', href: '/gallery', icon: Image },
    { name: 'Changelog', href: '/changelog', icon: FileText },
    { name: 'Download', href: '/download', icon: Download },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 xl:w-72">
        <div className="flex h-full flex-col bg-gradient-to-b from-gray-900 to-black border-r border-gray-800">
          {/* Logo */}
          <div className="flex h-20 items-center justify-center xl:justify-start xl:px-6 border-b border-gray-800">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#00E5FF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#7C3AED]/30">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
              <span className="hidden xl:block text-2xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] bg-clip-text text-transparent">
                DevStudio
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-6 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#00E5FF]/20 text-[#00E5FF] shadow-lg shadow-[#00E5FF]/10'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className={`w-6 h-6 flex-shrink-0 ${isActive ? 'text-[#00E5FF]' : 'text-gray-500 group-hover:text-[#00E5FF]'} transition-colors duration-300`} />
                  <span className="hidden xl:block font-medium">{link.name}</span>
                  {isActive && (
                    <div className="hidden xl:block ml-auto w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></div>
                  )}
                </Link>
              )
            })}
          </nav>

        </div>
      </aside>

      {/* Mobile Sidebar - Same as Desktop */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Sidebar - PC Style */}
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-20 items-center justify-start px-6 border-b border-gray-800">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#00E5FF] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#7C3AED]/30">
                  <span className="text-white font-bold text-2xl">D</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] bg-clip-text text-transparent">
                  DevStudio
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-3 py-6 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#00E5FF]/20 text-[#00E5FF] shadow-lg shadow-[#00E5FF]/10'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 flex-shrink-0 ${isActive ? 'text-[#00E5FF]' : 'text-gray-500 group-hover:text-[#00E5FF]'} transition-colors duration-300`} />
                    <span className="font-medium">{link.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></div>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Floating Menu Button - Mobile Only */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-30 w-14 h-14 bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] rounded-full shadow-lg shadow-[#7C3AED]/50 flex items-center justify-center hover:scale-110 transition-transform duration-300"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>
    </>
  )
}
