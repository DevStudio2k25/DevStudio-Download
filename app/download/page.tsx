'use client'

import Navbar from '@/components/navbar'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Asset {
  name: string
  browser_download_url: string
  size: number
  download_count: number
}

interface Release {
  tag_name: string
  name: string
  body: string
  published_at: string
  html_url: string
  assets: Asset[]
  prerelease: boolean
}

export default function DownloadPage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReleases()
  }, [])

  const fetchReleases = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/repos/DevStudio2k25/devstudio/releases'
      )
      
      if (!response.ok) {
        throw new Error('Failed to fetch releases')
      }

      const data = await response.json()
      setReleases(data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load releases. Please try again later.')
      setLoading(false)
      console.error('Error fetching releases:', err)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getPlatformIcon = (filename: string) => {
    if (filename.includes('arm64') || filename.includes('armeabi') || filename.includes('apk')) {
      return '📱'
    } else if (filename.includes('exe') || filename.includes('msi') || filename.includes('windows')) {
      return '🖥️'
    } else if (filename.includes('dmg') || filename.includes('mac')) {
      return '🍎'
    } else if (filename.includes('deb') || filename.includes('rpm') || filename.includes('linux')) {
      return '🐧'
    }
    return '📦'
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
        <div className="container mx-auto px-4 py-20 mt-16">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#00E5FF] via-[#7C3AED] to-[#00E5FF] bg-clip-text text-transparent mb-4">
              Download DevStudio
            </h1>
            <p className="text-xl text-gray-300">Get the latest version for your platform</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="max-w-4xl mx-auto text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-[#00E5FF] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 mt-4">Loading releases...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
                <p className="text-red-400">{error}</p>
                <button
                  onClick={fetchReleases}
                  className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Releases List */}
          {!loading && !error && (
            <div className="max-w-6xl mx-auto space-y-12">
              {releases.map((release, index) => (
                <div key={release.tag_name} className="group relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

                  {/* Release Card */}
                  <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-700 group-hover:border-[#00E5FF]/50 rounded-3xl p-8 backdrop-blur-md transition-all duration-500">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-3xl font-bold text-white font-mono">
                            {release.name || release.tag_name}
                          </h2>
                          {index === 0 && (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[#00E5FF] to-[#06C1A0] text-white">
                              Latest
                            </span>
                          )}
                          {release.prerelease && (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] text-white">
                              Pre-release
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">
                          Released on {formatDate(release.published_at)}
                        </p>
                      </div>
                      <a
                        href={release.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00E5FF] hover:text-[#7C3AED] transition-colors text-sm flex items-center gap-2"
                      >
                        View on GitHub <span>↗</span>
                      </a>
                    </div>

                    {/* Release Notes */}
                    {release.body && (
                      <div className="mb-6 p-4 bg-black/30 rounded-xl border border-gray-800">
                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Release Notes</h3>
                        <div className="text-gray-300 text-sm whitespace-pre-wrap max-h-40 overflow-y-auto custom-scrollbar">
                          {release.body}
                        </div>
                      </div>
                    )}

                    {/* Download Assets */}
                    {release.assets.length > 0 ? (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                          Downloads ({release.assets.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {release.assets.map((asset) => (
                            <a
                              key={asset.name}
                              href={asset.browser_download_url}
                              className="group/asset flex items-center gap-4 p-4 bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-[#00E5FF]/50 rounded-xl transition-all duration-300"
                            >
                              <div className="text-4xl">{getPlatformIcon(asset.name)}</div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate group-hover/asset:text-[#00E5FF] transition-colors">
                                  {asset.name}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                  <span>{formatFileSize(asset.size)}</span>
                                  <span>•</span>
                                  <span>{asset.download_count} downloads</span>
                                </div>
                              </div>
                              <div className="text-[#00E5FF] group-hover/asset:translate-x-1 transition-transform">
                                ↓
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No download assets available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Releases */}
          {!loading && !error && releases.length === 0 && (
            <div className="max-w-4xl mx-auto text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Releases Yet</h3>
              <p className="text-gray-400">Check back soon for the latest releases!</p>
            </div>
          )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 229, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 229, 255, 0.5);
        }
      `}</style>
    </main>
  )
}
