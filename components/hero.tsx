'use client'

import { useEffect, useRef, useState } from 'react'

export default function Hero({ scrollY }: { scrollY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentAnimation, setCurrentAnimation] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // 12 Different animation types
  const animations = [
    { left: 'animate-float-tilt-left', right: 'animate-float-tilt-right' },
    { left: 'animate-wobble-left', right: 'animate-wobble-right' },
    { left: 'animate-pulse-scale-left', right: 'animate-pulse-scale-right' },
    { left: 'animate-swing-left', right: 'animate-swing-right' },
    { left: 'animate-bounce-left', right: 'animate-bounce-right' },
    { left: 'animate-rotate-3d-left', right: 'animate-rotate-3d-right' },
    { left: 'animate-wave-left', right: 'animate-wave-right' },
    { left: 'animate-zoom-left', right: 'animate-zoom-right' },
    { left: 'animate-flip-left', right: 'animate-flip-right' },
    { left: 'animate-slide-left', right: 'animate-slide-right' },
    { left: 'animate-shake-left', right: 'animate-shake-right' },
    { left: 'animate-spin-slow-left', right: 'animate-spin-slow-right' }
  ]
  
  // Change animation every 15 seconds with smooth fade cover/uncover transition
  useEffect(() => {
    const interval = setInterval(() => {
      // Start transition (cover with fade in)
      setIsTransitioning(true)
      
      // Change animation in the middle of transition
      setTimeout(() => {
        setCurrentAnimation((prev) => (prev + 1) % animations.length)
      }, 500) // Change animation when fully covered
      
      // End transition (uncover with fade out)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 1000) // Total transition time
    }, 15000) // 15 seconds per animation
    
    return () => clearInterval(interval)
  }, [])

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

          {/* Floating device mockups with dynamic animations */}
          {/* Mobile mockup - Left/Top with changing animations */}
          <div className="relative">
            <div
              className={`relative rounded-3xl shadow-2xl overflow-hidden ${animations[currentAnimation].left}`}
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
            
            {/* Transition overlay for mobile - Fade in from top, fade out to top */}
            <div
              className={`absolute inset-0 bg-gradient-to-b from-[#00E5FF] to-[#7C3AED] rounded-3xl transition-all duration-500 ease-in-out ${
                isTransitioning 
                  ? 'translate-y-0 opacity-100' 
                  : '-translate-y-full opacity-0'
              }`}
              style={{
                boxShadow: '0 0 80px rgba(0, 229, 255, 0.6)',
              }}
            />
          </div>

          {/* Desktop mockup - Right/Bottom with changing animations */}
          <div className="relative">
            <div
              className={`relative rounded-2xl shadow-2xl overflow-hidden ${animations[currentAnimation].right}`}
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
            
            {/* Transition overlay for desktop - Fade in from top, fade out to top */}
            <div
              className={`absolute inset-0 bg-gradient-to-b from-[#7C3AED] to-[#00E5FF] rounded-2xl transition-all duration-500 ease-in-out ${
                isTransitioning 
                  ? 'translate-y-0 opacity-100' 
                  : '-translate-y-full opacity-0'
              }`}
              style={{
                boxShadow: '0 0 80px rgba(124, 58, 237, 0.6)',
              }}
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
        
        /* 1. Float & Tilt */
        @keyframes float-tilt-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateY(0px) scale(1);
          }
          50% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateY(-20px) scale(1.02);
          }
        }
        
        @keyframes float-tilt-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateY(0px) scale(1);
          }
          50% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateY(-20px) scale(1.02);
          }
        }
        
        /* 2. Wobble */
        @keyframes wobble-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-5deg) rotateX(0deg) rotateZ(0deg);
          }
          25% {
            transform: perspective(1000px) rotateY(-10deg) rotateX(3deg) rotateZ(-2deg);
          }
          75% {
            transform: perspective(1000px) rotateY(0deg) rotateX(-2deg) rotateZ(2deg);
          }
        }
        
        @keyframes wobble-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(5deg) rotateX(0deg) rotateZ(0deg);
          }
          25% {
            transform: perspective(1000px) rotateY(10deg) rotateX(3deg) rotateZ(2deg);
          }
          75% {
            transform: perspective(1000px) rotateY(0deg) rotateX(-2deg) rotateZ(-2deg);
          }
        }
        
        /* 3. Pulse Scale */
        @keyframes pulse-scale-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) scale(1);
          }
          50% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) scale(1.08);
          }
        }
        
        @keyframes pulse-scale-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) scale(1);
          }
          50% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) scale(1.08);
          }
        }
        
        /* 4. Swing */
        @keyframes swing-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) rotateZ(0deg);
          }
          25% {
            transform: perspective(1000px) rotateY(-15deg) rotateX(5deg) rotateZ(-4deg);
          }
          75% {
            transform: perspective(1000px) rotateY(-2deg) rotateX(-1deg) rotateZ(4deg);
          }
        }
        
        @keyframes swing-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) rotateZ(0deg);
          }
          25% {
            transform: perspective(1000px) rotateY(15deg) rotateX(5deg) rotateZ(4deg);
          }
          75% {
            transform: perspective(1000px) rotateY(2deg) rotateX(-1deg) rotateZ(-4deg);
          }
        }
        
        /* 5. Bounce */
        @keyframes bounce-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateY(0px);
          }
          25% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateY(-25px);
          }
          50% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateY(-5px);
          }
          75% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateY(-15px);
          }
        }
        
        @keyframes bounce-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateY(0px);
          }
          25% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateY(-25px);
          }
          50% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateY(-5px);
          }
          75% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateY(-15px);
          }
        }
        
        /* 6. Rotate 3D */
        @keyframes rotate-3d-left {
          0% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg);
          }
          50% {
            transform: perspective(1000px) rotateY(-20deg) rotateX(10deg);
          }
          100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg);
          }
        }
        
        @keyframes rotate-3d-right {
          0% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg);
          }
          50% {
            transform: perspective(1000px) rotateY(20deg) rotateX(10deg);
          }
          100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg);
          }
        }
        
        /* 7. Wave */
        @keyframes wave-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateX(0px) translateY(0px);
          }
          25% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateX(-10px) translateY(-10px);
          }
          75% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateX(10px) translateY(10px);
          }
        }
        
        @keyframes wave-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateX(0px) translateY(0px);
          }
          25% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateX(10px) translateY(-10px);
          }
          75% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateX(-10px) translateY(10px);
          }
        }
        
        /* 8. Zoom */
        @keyframes zoom-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) scale(1);
          }
          50% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) scale(1.15);
          }
        }
        
        @keyframes zoom-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) scale(1);
          }
          50% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) scale(1.15);
          }
        }
        
        /* 9. Flip */
        @keyframes flip-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg);
          }
          50% {
            transform: perspective(1000px) rotateY(-180deg) rotateX(2deg);
          }
        }
        
        @keyframes flip-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg);
          }
          50% {
            transform: perspective(1000px) rotateY(180deg) rotateX(2deg);
          }
        }
        
        /* 10. Slide */
        @keyframes slide-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateX(0px);
          }
          50% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateX(-30px);
          }
        }
        
        @keyframes slide-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateX(0px);
          }
          50% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateX(30px);
          }
        }
        
        /* 11. Shake */
        @keyframes shake-left {
          0%, 100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateX(0px);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) translateX(5px);
          }
        }
        
        @keyframes shake-right {
          0%, 100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateX(0px);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateX(5px);
          }
          20%, 40%, 60%, 80% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) translateX(-5px);
          }
        }
        
        /* 12. Spin Slow */
        @keyframes spin-slow-left {
          0% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) rotateZ(0deg);
          }
          100% {
            transform: perspective(1000px) rotateY(-8deg) rotateX(2deg) rotateZ(360deg);
          }
        }
        
        @keyframes spin-slow-right {
          0% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) rotateZ(0deg);
          }
          100% {
            transform: perspective(1000px) rotateY(8deg) rotateX(2deg) rotateZ(-360deg);
          }
        }
        
        /* Background Glow */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05) rotate(5deg);
          }
        }
        
        /* Animation Classes */
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
        
        :global(.animate-wobble-left) {
          animation: wobble-left 3s ease-in-out infinite;
        }
        
        :global(.animate-wobble-right) {
          animation: wobble-right 3s ease-in-out infinite;
          animation-delay: 0.3s;
        }
        
        :global(.animate-pulse-scale-left) {
          animation: pulse-scale-left 2.5s ease-in-out infinite;
        }
        
        :global(.animate-pulse-scale-right) {
          animation: pulse-scale-right 2.5s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        
        :global(.animate-swing-left) {
          animation: swing-left 3.5s ease-in-out infinite;
        }
        
        :global(.animate-swing-right) {
          animation: swing-right 3.5s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        
        :global(.animate-bounce-left) {
          animation: bounce-left 2s ease-in-out infinite;
        }
        
        :global(.animate-bounce-right) {
          animation: bounce-right 2s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        
        :global(.animate-rotate-3d-left) {
          animation: rotate-3d-left 4s ease-in-out infinite;
        }
        
        :global(.animate-rotate-3d-right) {
          animation: rotate-3d-right 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        :global(.animate-wave-left) {
          animation: wave-left 3s ease-in-out infinite;
        }
        
        :global(.animate-wave-right) {
          animation: wave-right 3s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        
        :global(.animate-zoom-left) {
          animation: zoom-left 3s ease-in-out infinite;
        }
        
        :global(.animate-zoom-right) {
          animation: zoom-right 3s ease-in-out infinite;
          animation-delay: 0.3s;
        }
        
        :global(.animate-flip-left) {
          animation: flip-left 5s ease-in-out infinite;
        }
        
        :global(.animate-flip-right) {
          animation: flip-right 5s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        :global(.animate-slide-left) {
          animation: slide-left 3s ease-in-out infinite;
        }
        
        :global(.animate-slide-right) {
          animation: slide-right 3s ease-in-out infinite;
          animation-delay: 0.4s;
        }
        
        :global(.animate-shake-left) {
          animation: shake-left 2s ease-in-out infinite;
        }
        
        :global(.animate-shake-right) {
          animation: shake-right 2s ease-in-out infinite;
          animation-delay: 0.2s;
        }
        
        :global(.animate-spin-slow-left) {
          animation: spin-slow-left 8s linear infinite;
        }
        
        :global(.animate-spin-slow-right) {
          animation: spin-slow-right 8s linear infinite;
        }
        
        :global(.animate-pulse-slow) {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
