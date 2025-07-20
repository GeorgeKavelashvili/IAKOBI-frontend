// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Bot, Sparkles, Zap, Target, Moon, Sun } from 'lucide-react'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  const parallaxOffset = (factor: number) => {
    if (!mounted || typeof window === 'undefined') {
      return { transform: 'translate(0px, 0px)' }
    }
    const x = (mousePosition.x / window.innerWidth - 0.5) * factor
    const y = (mousePosition.y / window.innerHeight - 0.5) * factor
    return { transform: `translate(${x}px, ${y}px)` }
  }

  return (
    <main className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white' 
        : 'bg-gradient-to-br from-white via-orange-50 to-orange-100 text-gray-900'
    }`}>
      {/* Background Grid */}
      <div className={`absolute inset-0 opacity-30 ${
        darkMode 
          ? 'bg-[radial-gradient(circle_at_1px_1px,_rgba(249,115,22,0.3)_1px,_transparent_0)] bg-[length:20px_20px]'
          : 'bg-[radial-gradient(circle_at_1px_1px,_rgba(249,115,22,0.2)_1px,_transparent_0)] bg-[length:20px_20px]'
      }`}></div>
      
      {/* Floating Orbs with Parallax */}
      <div 
        className="absolute top-20 left-20 w-32 h-32 bg-orange-300 dark:bg-orange-600 rounded-full opacity-20 blur-xl animate-pulse"
        style={parallaxOffset(30)}
      ></div>
      <div 
        className="absolute top-40 right-32 w-24 h-24 bg-orange-400 dark:bg-orange-500 rounded-full opacity-30 blur-xl animate-pulse"
        style={{...parallaxOffset(-20), animationDelay: '2s'}}
      ></div>
      <div 
        className="absolute bottom-32 left-32 w-20 h-20 bg-orange-500 dark:bg-orange-400 rounded-full opacity-25 blur-xl animate-pulse"
        style={{...parallaxOffset(15), animationDelay: '4s'}}
      ></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-3">
          <Image
            src="/logos.png"
            alt="IAKOBI"
            width={140}
            height={42}
            className="h-8 w-auto"
            priority
          />
        </div>
        
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`group relative w-16 h-8 rounded-full transition-all duration-500 shadow-lg hover:scale-105 ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
              : 'bg-gradient-to-r from-yellow-400 to-orange-400'
          }`}
        >
          <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-500 flex items-center justify-center transform ${
            darkMode ? 'translate-x-8' : 'translate-x-0'
          }`}>
            <div className={`transition-all duration-300 ${darkMode ? 'rotate-180' : 'rotate-0'}`}>
              {darkMode ? (
                <Moon size={14} className="text-purple-600" />
              ) : (
                <Sun size={14} className="text-orange-500" />
              )}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium text-white">
            <span className={`transition-opacity duration-300 ${darkMode ? 'opacity-0' : 'opacity-100'}`}>
              ☀️
            </span>
            <span className={`transition-opacity duration-300 ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
              🌙
            </span>
          </div>
        </button>
      </header>

      {/* Main Content */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-120px)] max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left max-w-2xl">
          {/* Badge */}
          <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full font-semibold mx-auto lg:mx-0 shadow-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' 
              : 'bg-orange-100/80 text-orange-600 border-orange-200'
          }`}>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold">Purpose Driven AI</span>
          </div>

          {/* Main Heading with Logo */}
          <div className="space-y-6">
            <div className="flex justify-center lg:justify-start mb-6">
              <Image
                src="/logos.png"
                alt="IAKOBI"
                width={336}
                height={121}
                className="h-20 w-auto"
                priority
              />
            </div>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight">
              <span className={`block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent ${
                darkMode ? 'from-orange-400 to-orange-500' : 'from-orange-500 to-orange-600'
              }`}>
                Where Code
              </span>
              <span className={`block bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent ${
                darkMode ? 'from-orange-400 to-orange-500' : 'from-orange-500 to-orange-600'
              }`}>
                Meets Motion
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className={`text-xl lg:text-2xl leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            The humanoid companion that learns and adapts alongside you, bridging the gap between artificial intelligence and human interaction.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
            <div className={`backdrop-blur-sm rounded-xl p-5 text-center hover:scale-105 transition-all duration-300 border shadow-lg ${
              darkMode 
                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                : 'bg-white/80 border-gray-200 hover:bg-white/90'
            }`}>
              <Sparkles size={28} className={`mx-auto mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
              <div className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Smart Learning</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Adapts to your needs</div>
            </div>
            <div className={`backdrop-blur-sm rounded-xl p-5 text-center hover:scale-105 transition-all duration-300 border shadow-lg ${
              darkMode 
                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                : 'bg-white/80 border-gray-200 hover:bg-white/90'
            }`}>
              <Zap size={28} className={`mx-auto mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
              <div className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Lightning Fast</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Instant responses</div>
            </div>
            <div className={`backdrop-blur-sm rounded-xl p-5 text-center hover:scale-105 transition-all duration-300 border shadow-lg ${
              darkMode 
                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                : 'bg-white/80 border-gray-200 hover:bg-white/90'
            }`}>
              <Target size={28} className={`mx-auto mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
              <div className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Purpose Built</div>
              <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Designed for you</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Link
              href="/chat"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 hover:scale-105 relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl"></div>
              
              <span className="text-lg relative z-10">Open Chat</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
            </Link>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-8 pt-8 border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="text-center">
              <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent ${
                darkMode ? 'from-orange-400 to-orange-500' : 'from-orange-500 to-orange-600'
              }`}>
                24/7
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent ${
                darkMode ? 'from-orange-400 to-orange-500' : 'from-orange-500 to-orange-600'
              }`}>
                ∞
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Possibilities</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent ${
                darkMode ? 'from-orange-400 to-orange-500' : 'from-orange-500 to-orange-600'
              }`}>
                1
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>IAKOBI</div>
            </div>
          </div>
        </div>

        {/* Right Content - Robot Visualization */}
        <div className="flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative" style={parallaxOffset(10)}>
            {/* Main Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl blur-3xl opacity-30 animate-pulse scale-110"></div>
            
            {/* Robot Container */}
            <div className={`relative backdrop-blur-sm rounded-3xl p-8 hover:scale-105 transition-all duration-500 border shadow-2xl ${
              darkMode 
                ? 'bg-gray-800/30 border-gray-700' 
                : 'bg-white/30 border-gray-200'
            }`}>
              {/* Robot Display Area */}
              <div className={`w-80 h-80 lg:w-96 lg:h-96 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden ${
                darkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
                  : 'bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-300'
              }`}>
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 animate-pulse"></div>
                
                {/* Robot Icon */}
                <div className="relative z-10 text-center">
                  <div className="relative">
                    <Bot size={120} className={`mx-auto mb-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'} animate-pulse`} />
                    {/* Glow around robot */}
                    <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
                  </div>
                  <div className={`text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    IAKOBI
                  </div>
                  <div className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    AI Companion
                  </div>
                  <div className={`text-sm mt-2 px-3 py-1 rounded-full inline-block ${
                    darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    ● Online
                  </div>
                </div>
                
                {/* Floating Particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/3 left-4 w-1.5 h-1.5 bg-orange-600 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
              </div>
              
              {/* Floating Action Icons */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                <Sparkles size={20} className="text-white animate-pulse" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer" style={{animationDelay: '1s'}}>
                <Zap size={20} className="text-white animate-pulse" />
              </div>
              
              {/* Status Indicators */}
              <div className="absolute top-4 left-4 flex space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 text-center py-8 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <p className="text-sm">
          © 2025 IAKOBI. Bridging the future of AI interaction.
        </p>
      </footer>

      {/* Background Animated Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-purple-500/5 animate-pulse"></div>
      </div>
    </main>
  )
}