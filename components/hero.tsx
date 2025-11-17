'use client'

import { useEffect, useRef } from 'react'

export default function Hero({ scrollY }: { scrollY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw animated neon ring
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const time = Date.now() / 1000

      // Outer glow
      ctx.strokeStyle = `rgba(0, 229, 255, 0.3)`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, 150 + Math.sin(time) * 20, 0, Math.PI * 2)
      ctx.stroke()

      // Middle glow
      ctx.strokeStyle = `rgba(124, 58, 237, 0.3)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, 120 + Math.cos(time) * 15, 0, Math.PI * 2)
      ctx.stroke()

      animationId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-50"
      />

      {/* Parallax code snippets background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute top-20 left-10 text-xs font-mono text-[#00E5FF] opacity-20">
          {'const AI = true;'}
        </div>
        <div className="absolute top-40 right-20 text-xs font-mono text-[#7C3AED] opacity-20">
          {'build().share().connect()'}
        </div>
        <div className="absolute bottom-40 left-1/4 text-xs font-mono text-[#06C1A0] opacity-20">
          {'future = await nextGen();'}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        {/* Device mockups container - Top */}
        <div className="mb-12 relative min-h-[600px] md:min-h-[500px] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Glow shadow behind devices */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 bg-gradient-to-br from-[#7C3AED] to-[#00E5FF] rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
          </div>

          {/* Floating device mockups with tilt and continuous animation */}
          {/* Mobile mockup - Left/Top with tilt and float */}
          <div
            className="relative rounded-3xl shadow-2xl overflow-hidden animate-float-tilt-left"
            style={{
              boxShadow: '0 0 60px rgba(0, 229, 255, 0.4)',
            }}
          >
            <img 
              src="/assets/mobile.png" 
              alt="Mobile Dashboard" 
              className="h-auto max-h-[350px] md:max-h-[450px] w-auto"
            />
          </div>

          {/* Desktop mockup - Right/Bottom with tilt and float */}
          <div
            className="relative rounded-2xl shadow-2xl overflow-hidden animate-float-tilt-right"
            style={{
              boxShadow: '0 0 60px rgba(124, 58, 237, 0.4)',
            }}
          >
            <img 
              src="/assets/desktop.png" 
              alt="Desktop Dashboard" 
              className="h-auto max-h-[300px] md:max-h-[400px] w-auto"
            />
          </div>
        </div>

        {/* Tagline - Below mockups */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Build. Share. Connect. The Future of Developer Experience.
        </p>
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
        
        @keyframes float-tilt-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateY(0px);
          }
          50% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateY(-20px);
          }
        }
        
        @keyframes float-tilt-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateY(0px);
          }
          50% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateY(-20px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }
        
        :global(.animate-fade-in-up) {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        :global(.animate-float-tilt-left) {
          animation: float-tilt-left 4s ease-in-out infinite;
        }
        
        :global(.animate-float-tilt-right) {
          animation: float-tilt-right 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        :global(.animate-pulse-slow) {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
