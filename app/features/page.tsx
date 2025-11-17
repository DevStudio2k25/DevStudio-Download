'use client'

import Navbar from '@/components/navbar'
import Link from 'next/link'
import { useState } from 'react'
import { 
  Search, Users, Video, BookOpen, Youtube, Bot, MessageSquare, 
  UserCheck, BadgeCheck, FileText, BarChart3, MessageCircle, 
  Code, Heart, FolderOpen, Briefcase, Zap, Smartphone, 
  Globe, Shield, Play, List, Sparkles
} from 'lucide-react'

interface Feature {
  icon: any
  title: string
  description: string
  category: string
  color: string
}

const features: Feature[] = [
  // Social Features
  { icon: Search, title: 'User Search', description: 'Find developers by name or email with real-time search and suggested users', category: 'Social', color: 'from-[#00E5FF] to-[#06C1A0]' },
  { icon: Users, title: 'Social Following', description: 'Follow developers, view followers and following lists with live statistics', category: 'Social', color: 'from-[#06C1A0] to-[#7C3AED]' },
  { icon: BadgeCheck, title: 'Verified Badges', description: 'Official verification badges for trusted accounts across the platform', category: 'Social', color: 'from-[#7C3AED] to-[#00E5FF]' },
  { icon: UserCheck, title: 'Rich Profiles', description: 'Detailed user profiles with posts, stats, bio, and social connections', category: 'Social', color: 'from-[#00E5FF] to-[#06C1A0]' },
  
  // Learning Hub
  { icon: Video, title: 'Learning Hub', description: 'Comprehensive video tutorials organized by topics and programming languages', category: 'Learning', color: 'from-[#7C3AED] to-[#00E5FF]' },
  { icon: List, title: 'Playlists', description: 'Create and manage custom learning paths with organized video collections', category: 'Learning', color: 'from-[#00E5FF] to-[#06C1A0]' },
  { icon: Youtube, title: 'YouTube Integration', description: 'Live channel statistics including subscribers, videos, and total views', category: 'Learning', color: 'from-[#06C1A0] to-[#7C3AED]' },
  { icon: BookOpen, title: 'Material Store', description: 'Access learning materials, PDFs, and resources with category organization', category: 'Learning', color: 'from-[#7C3AED] to-[#00E5FF]' },
  
  // AI Tools
  { icon: Bot, title: 'AI Tools Hub', description: 'Collection of AI-powered development tools for coding assistance', category: 'AI', color: 'from-[#00E5FF] to-[#06C1A0]' },
  { icon: Sparkles, title: 'AI Assistance', description: 'Smart code suggestions and AI-powered development helpers', category: 'AI', color: 'from-[#06C1A0] to-[#7C3AED]' },
  
  // Content Creation
  { icon: FileText, title: 'Post System', description: 'Create and share text posts, code snippets, and polls with the community', category: 'Content', color: 'from-[#7C3AED] to-[#00E5FF]' },
  { icon: BarChart3, title: 'Poll System', description: 'Interactive polls with live voting, results, and visual progress indicators', category: 'Content', color: 'from-[#00E5FF] to-[#06C1A0]' },
  { icon: MessageCircle, title: 'Comments', description: 'Engage with posts through threaded comments and discussions', category: 'Content', color: 'from-[#06C1A0] to-[#7C3AED]' },
  { icon: Code, title: 'Code Sharing', description: 'Share code snippets with syntax highlighting and one-click copy', category: 'Content', color: 'from-[#7C3AED] to-[#00E5FF]' },
  
  // Organization
  { icon: Heart, title: 'Favorites', description: 'Save and organize AI tools, videos, channels, playlists, and projects', category: 'Organization', color: 'from-[#00E5FF] to-[#06C1A0]' },
  { icon: FolderOpen, title: 'Projects Gallery', description: 'Browse, explore, and save development projects from the community', category: 'Organization', color: 'from-[#06C1A0] to-[#7C3AED]' },
  
  // Platform
  { icon: Globe, title: 'Cross-Platform', description: 'Seamless experience across Android, Windows, and Web platforms', category: 'Platform', color: 'from-[#7C3AED] to-[#00E5FF]' },
  { icon: Smartphone, title: 'Mobile Optimized', description: 'Touch-friendly interface designed specifically for mobile devices', category: 'Platform', color: 'from-[#00E5FF] to-[#06C1A0]' },
  { icon: Zap, title: 'Fast Performance', description: 'Optimized loading speeds with intelligent caching and smooth animations', category: 'Platform', color: 'from-[#06C1A0] to-[#7C3AED]' },
  { icon: Shield, title: 'Secure Auth', description: 'Protected authentication with persistent sessions and data encryption', category: 'Platform', color: 'from-[#7C3AED] to-[#00E5FF]' },
]

const categories = ['All', 'Social', 'Learning', 'AI', 'Content', 'Organization', 'Platform']

export default function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFeatures = features.filter(feature => {
    const matchesCategory = selectedCategory === 'All' || feature.category === selectedCategory
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-background">
      <Navbar />
      
      <div className="lg:pl-20 xl:pl-72">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#7C3AED] opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#06C1A0] opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 mt-16">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#00E5FF] via-[#7C3AED] to-[#00E5FF] bg-clip-text text-transparent mb-4">
              Features
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">Everything you need for a premium developer experience</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/50 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] text-white shadow-lg shadow-[#7C3AED]/30'
                    : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    animation: 'fade-in-up 0.6s ease-out forwards',
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-700 group-hover:border-[#00E5FF]/50 rounded-2xl p-6 backdrop-blur-md transition-all duration-500 h-full transform group-hover:scale-105">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>

                    {/* Category */}
                    <p className="text-[#00E5FF] text-sm mb-3 font-medium">{feature.category}</p>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Corner accents */}
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-lg"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredFeatures.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Search className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No features found</h3>
                <p className="text-gray-400">Try adjusting your search or filter</p>
              </div>
            )}
          </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
