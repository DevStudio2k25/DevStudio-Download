'use client'

import Navbar from '@/components/navbar'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { supabase } from '@/lib/supabase'

interface ReleaseNote {
  id: string
  version: string
  title: string
  release_date: string
  build_number: number
  content: string
  created_at: string
  updated_at: string
}

export default function ChangelogPage() {
  const [releases, setReleases] = useState<ReleaseNote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchReleaseNotes()
  }, [])

  const fetchReleaseNotes = async () => {
    try {
      const { data, error: supabaseError } = await supabase
        .from('release_notes')
        .select('*')
        .order('build_number', { ascending: false })

      if (supabaseError) {
        throw supabaseError
      }

      setReleases(data || [])
      setLoading(false)
    } catch (err) {
      setError('Failed to load release notes. Please try again later.')
      setLoading(false)
      console.error('Error fetching release notes:', err)
    }
  }

  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getVersionBadgeColor = (version: string) => {
    if (version.includes('1.0.9')) return 'from-[#7C3AED] to-[#00E5FF]'
    if (version.includes('1.0.8')) return 'from-[#00E5FF] to-[#06C1A0]'
    if (version.includes('1.0.7')) return 'from-[#06C1A0] to-[#7C3AED]'
    return 'from-gray-600 to-gray-700'
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 mt-16">
          <div className="text-center mb-12 md:mb-20">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#00E5FF] via-[#7C3AED] to-[#00E5FF] bg-clip-text text-transparent mb-4">
              Changelog
            </h1>
            <p className="text-lg md:text-xl text-gray-300">Track our journey and latest updates</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="max-w-5xl mx-auto text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 mt-4">Loading release notes...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
                <p className="text-red-400">{error}</p>
                <button
                  onClick={fetchReleaseNotes}
                  className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Release Notes */}
          {!loading && !error && (
            <div className="max-w-5xl mx-auto space-y-6">
              {releases.map((release, index) => {
                const isExpanded = expandedCards.has(release.id)
                
                return (
                  <div
                    key={release.id}
                    className="group relative"
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getVersionBadgeColor(release.version)} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-700 group-hover:border-[#00E5FF]/50 rounded-2xl md:rounded-3xl backdrop-blur-md transition-all duration-500 overflow-hidden">
                      {/* Header - Always Visible */}
                      <button
                        onClick={() => toggleCard(release.id)}
                        className="w-full p-6 md:p-8 text-left hover:bg-white/5 transition-colors duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h2 className="text-2xl md:text-3xl font-bold text-white font-mono">{release.version}</h2>
                              {index === 0 && (
                                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[#00E5FF] to-[#06C1A0] text-white">
                                  Latest
                                </span>
                              )}
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${getVersionBadgeColor(release.version)} text-white`}>
                                Build {release.build_number}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm md:text-base mb-2">{formatDate(release.release_date)}</p>
                            <p className="text-gray-300 text-base md:text-lg font-medium">{release.title}</p>
                          </div>
                          
                          {/* Expand/Collapse Icon */}
                          <div className="flex-shrink-0">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                              <svg className="w-5 h-5 md:w-6 md:h-6 text-[#00E5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Expandable Content - Only render when expanded */}
                      {isExpanded && (
                        <div className="animate-fade-in">
                          <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-gray-800">
                            <div className="prose prose-invert prose-sm md:prose-base max-w-none mt-6">
                              <ReactMarkdown
                                components={{
                                  h1: ({ children }) => <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{children}</h1>,
                                  h2: ({ children }) => <h2 className="text-xl md:text-2xl font-bold text-white mb-3 mt-6">{children}</h2>,
                                  h3: ({ children }) => <h3 className="text-lg md:text-xl font-bold text-[#00E5FF] mb-2 mt-4">{children}</h3>,
                                  p: ({ children }) => <p className="text-gray-300 mb-3 leading-relaxed">{children}</p>,
                                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">{children}</ul>,
                                  li: ({ children }) => <li className="text-gray-300">{children}</li>,
                                  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                                  a: ({ href, children }) => (
                                    <a href={href} className="text-[#00E5FF] hover:text-[#7C3AED] transition-colors underline" target="_blank" rel="noopener noreferrer">
                                      {children}
                                    </a>
                                  ),
                                  code: ({ children }) => (
                                    <code className="px-2 py-1 bg-gray-800 text-[#00E5FF] rounded text-sm font-mono">{children}</code>
                                  ),
                                  hr: () => <hr className="border-gray-700 my-6" />,
                                }}
                              >
                                {release.content}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* No Releases */}
          {!loading && !error && releases.length === 0 && (
            <div className="max-w-4xl mx-auto text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Release Notes Yet</h3>
              <p className="text-gray-400">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        `}</style>
      </div>
    </main>
  )
}
