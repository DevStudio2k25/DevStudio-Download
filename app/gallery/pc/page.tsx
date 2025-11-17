'use client'

import Navbar from '@/components/navbar'


export default function PCGalleryPage() {
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
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#00E5FF] via-[#7C3AED] to-[#00E5FF] bg-clip-text text-transparent mb-4">
              🖥️ PC Gallery
            </h1>
            <p className="text-lg text-gray-300">Desktop screenshots collection</p>
          </div>

          {/* Coming Soon */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-[#06C1A0]/20 rounded-3xl blur-2xl opacity-50"></div>
              
              <div className="relative bg-black/80 border border-gray-700 rounded-3xl p-16 backdrop-blur-md">
                <div className="text-7xl mb-6">🚧</div>
                <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
                <p className="text-gray-400">PC screenshots will be added here soon!</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </main>
  )
}
