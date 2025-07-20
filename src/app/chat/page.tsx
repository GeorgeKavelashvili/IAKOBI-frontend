'use client'

import { useEffect, useState, useRef } from 'react'
import { ExternalLink, Copy, Check, AlertCircle, Bot, User, Search, Loader2, ArrowUp, Sun, Moon } from 'lucide-react'
import Image from 'next/image'
interface Message {
  sender: 'user' | 'ai'
  text: string
  sources?: string[]
  timestamp: Date
  status?: 'thinking' | 'searching' | 'processing' | 'done' | 'error'
  queries?: string[]
}

interface PipelineUpdate {
  type: 'status' | 'queries' | 'error' | 'done'
  content?: {
    answer?: string
    sources?: string[]
    status?: string
    queries?: string[]
    error?: string
  }
}

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [aiTyping, setAiTyping] = useState(false)
  const [animatedText, setAnimatedText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copiedSource, setCopiedSource] = useState<string | null>(null)
  const [currentStatus, setCurrentStatus] = useState<string>('')
  const [socketConnected, setSocketConnected] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  
  const socketRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // Initialize WebSocket connection
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.socket.io/4.0.0/socket.io.min.js'
    script.onload = () => {
      // @ts-ignore
      const io = window.io
      socketRef.current = io('https://late-venice-eric-prototype.trycloudflare.com/')
      
      socketRef.current.on('connect', () => {
        console.log('Connected to backend via WebSocket')
        setSocketConnected(true)
        setError(null)
      })

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from backend')
        setSocketConnected(false)
      })

      socketRef.current.on('pipeline_update', (data: PipelineUpdate) => {
        console.log('Pipeline update:', data)
        
        if (data.type === 'status' && data.content?.status) {
          setCurrentStatus(data.content.status)
          setMessages(prev => {
            const newMessages = [...prev]
            const lastAiIndex = newMessages.findLastIndex(msg => msg.sender === 'ai')
            if (lastAiIndex !== -1) {
              newMessages[lastAiIndex] = {
                ...newMessages[lastAiIndex],
                status: data.content.status as any
              }
            }
            return newMessages
          })
        } 
        else if (data.type === 'queries' && data.content?.queries) {
          setMessages(prev => {
            const newMessages = [...prev]
            const lastAiIndex = newMessages.findLastIndex(msg => msg.sender === 'ai')
            if (lastAiIndex !== -1) {
              newMessages[lastAiIndex] = {
                ...newMessages[lastAiIndex],
                queries: data.content.queries,
                status: 'searching'
              }
            }
            return newMessages
          })
        }
        else if (data.type === 'error' && data.content?.error) {
          setError(data.content.error)
          setAiTyping(false)
          setCurrentStatus('')
          setAnimatedText('')
        }
        else if (data.type === 'done' && data.content?.answer) {
          const aiText = data.content.answer
          const sources = data.content.sources || []
          
          // Clear any existing animation
          if (animationRef.current) {
            clearInterval(animationRef.current)
          }
          
          let index = 0
          setAnimatedText('')
          
          const typeText = () => {
            if (index < aiText.length) {
              setAnimatedText(aiText.substring(0, index + 1))
              index++
              animationRef.current = setTimeout(typeText, 25)
            } else {
              // Animation complete
              setAiTyping(false)
              setCurrentStatus('')
              
              setMessages(prev => {
                const newMessages = [...prev]
                const lastAiIndex = newMessages.findLastIndex(msg => msg.sender === 'ai')
                if (lastAiIndex !== -1) {
                  newMessages[lastAiIndex] = {
                    ...newMessages[lastAiIndex],
                    text: aiText,
                    sources: sources,
                    status: 'done'
                  }
                }
                return newMessages
              })
              setAnimatedText('')
            }
          }
          
          typeText()
        }
      })
    }
    
    document.head.appendChild(script)

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, animatedText])

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || aiTyping) return

    const userMessage: Message = {
      sender: 'user',
      text: input,
      timestamp: new Date()
    }

    const placeholderAiMessage: Message = {
      sender: 'ai',
      text: '',
      timestamp: new Date(),
      status: 'thinking'
    }

    setMessages(prev => [...prev, userMessage, placeholderAiMessage])
    setInput('')
    setAiTyping(true)
    setError(null)
    setCurrentStatus('thinking')

    try {
      const response = await fetch('https://late-venice-eric-prototype.trycloudflare.com/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: input
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error calling AI API:', error)
      setError('Failed to get response from AI. Please check your connection and try again.')
      setAiTyping(false)
      setCurrentStatus('')
      setMessages(prev => prev.slice(0, -1))
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedSource(text)
      setTimeout(() => setCopiedSource(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getStatusEmoji = (status?: string) => {
    switch (status) {
      case 'thinking':
        return '🤔'
      case 'searching':
        return '🔍'
      case 'processing':
        return '⚡'
      case 'done':
        return '✅'
      case 'error':
        return '❌'
      default:
        return '🤔'
    }
  }

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'thinking':
        return 'Thinking...'
      case 'searching':
        return 'Searching...'
      case 'processing':
        return 'Processing...'
      case 'done':
        return 'Complete'
      case 'error':
        return 'Error occurred'
      default:
        return 'Thinking...'
    }
  }

  const suggestedQuestions = [
    "How does AI work?",
    "Are black holes real?",
    "How many Rs are in the word \"strawberry\"?",
    "What is the meaning of life?"
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`flex flex-col h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-gray-900'
    }`}>
      {/* Header */}
      <div className={`flex-shrink-0 flex items-center justify-between px-6 py-4 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900' 
          : 'bg-white'
      }`}>
       <div className="flex items-center">
  <Image
    src="/logos.png"
    alt="IAKOBI"
    width={168}
    height={60}
    className="h-8 w-auto"
    priority
  />
</div>
        
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
              
            </span>
            <span className={`transition-opacity duration-300 ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
              
            </span>
          </div>
        </button>
      </div>

      {/* Messages Area - Scrollable */}
      <div className={`flex-1 overflow-y-auto px-4 py-6 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900' 
          : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && !aiTyping ? (
            <div className="h-full flex flex-col items-center justify-center space-y-8 max-w-2xl mx-auto">
              {/* Title */}
              <div className="text-center space-y-4">
                <h1 className={`text-3xl font-normal transition-colors duration-300 ${
                  darkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  How can I help you today?
                </h1>
                <p className={`text-base transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Your AI companion ready to assist with any question
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700' 
                    : 'bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200'
                }`}>
                  <span className="text-lg animate-pulse">✨</span>
                  <span className="text-sm font-medium">Create</span>
                </button>
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700' 
                    : 'bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200'
                }`}>
                  <span className="text-lg animate-bounce">📖</span>
                  <span className="text-sm font-medium">Explore</span>
                </button>
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700' 
                    : 'bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200'
                }`}>
                  <span className="text-lg animate-pulse">💻</span>
                  <span className="text-sm font-medium">Code</span>
                </button>
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700' 
                    : 'bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200'
                }`}>
                  <span className="text-lg animate-bounce">🎓</span>
                  <span className="text-sm font-medium">Learn</span>
                </button>
              </div>

              {/* Suggested Questions */}
              <div className="space-y-3 w-full max-w-md">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(question)}
                    className={`w-full text-left p-3 text-sm rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
                      darkMode
                        ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800 border border-gray-700 hover:border-gray-600'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-orange-50 border border-orange-200 hover:border-orange-300'
                    }`}
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Connection Status */}
              {(!socketConnected || error) && (
                <div className="text-center space-y-2">
                  {!socketConnected && (
                    <div className="text-sm text-red-500 flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span>Disconnected from server</span>
                    </div>
                  )}
                  {error && (
                    <div className="text-sm text-red-500 max-w-md">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <AlertCircle size={14} />
                        <span>Error</span>
                      </div>
                      <p className="text-xs">{error}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 pb-6">
              {messages.map((msg, idx) => (
                <div key={idx} className="space-y-3">
                  <div className={`flex items-start space-x-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === 'user' 
                        ? darkMode 
                          ? 'bg-orange-500 text-white'
                          : 'bg-orange-500 text-white'
                        : darkMode
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-800 text-white'
                    }`}>
                      {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    
                    <div className={`flex-1 max-w-3xl ${msg.sender === 'user' ? 'flex justify-end' : 'text-left'}`}>
                      {/* Status indicator for AI messages */}
                      {msg.sender === 'ai' && msg.status && msg.status !== 'done' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg animate-bounce">{getStatusEmoji(msg.status)}</span>
                          <span className={`text-sm transition-colors duration-300 ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>{getStatusText(msg.status)}</span>
                        </div>
                      )}
                      
                      {/* Search queries display */}
                      {msg.queries && msg.queries.length > 0 && (
                        <div className="mb-2 space-y-1">
                          {msg.queries.map((query, queryIdx) => (
                            <div key={queryIdx} className={`inline-block rounded-md px-2 py-1 text-xs mr-2 mb-1 transition-colors duration-300 ${
                              darkMode
                                ? 'bg-yellow-900/30 border border-yellow-700/50 text-yellow-300'
                                : 'bg-yellow-100 border border-yellow-200 text-yellow-800'
                            }`}>
                              <Search size={10} className="inline mr-1" />
                              {query}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className={`inline-block break-words transition-colors duration-300 ${
                        msg.sender === 'user'
                          ? darkMode
                            ? 'bg-orange-600 text-white px-4 py-3 rounded-2xl'
                            : 'bg-orange-500 text-white px-4 py-3 rounded-2xl'
                          : darkMode
                            ? 'bg-transparent text-gray-200'
                            : 'bg-transparent text-gray-800'
                      }`}>
                        <div className="whitespace-pre-wrap leading-relaxed">
                          {msg.text || (aiTyping && msg.sender === 'ai' ? animatedText : '')}
                          {msg.sender === 'ai' && aiTyping && msg.text === '' && (
                            <span className={`animate-pulse ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>|</span>
                          )}
                        </div>
                        {msg.sender === 'user' && (
                          <div className="text-xs mt-1 opacity-70 text-right">
                            {formatTime(msg.timestamp)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="ml-11 space-y-2">
                      <div className={`text-xs font-medium flex items-center space-x-2 transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <ExternalLink size={12} />
                        <span>Sources ({msg.sources.length})</span>
                      </div>
                      <div className="space-y-2">
                        {msg.sources.map((source, sourceIdx) => (
                          <div
                            key={sourceIdx}
                            className={`rounded-lg p-3 transition-all duration-200 hover:scale-[1.01] ${
                              darkMode
                                ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750'
                                : 'bg-orange-50 border border-orange-200 hover:bg-orange-100'
                            }`}
                          >
                            <div className="flex items-center justify-between space-x-3">
                              <div className="flex-1 min-w-0">
                                <a
                                  href={source}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`text-xs transition-colors break-all ${
                                    darkMode
                                      ? 'text-blue-400 hover:text-blue-300'
                                      : 'text-orange-600 hover:text-orange-800'
                                  }`}
                                >
                                  {source}
                                </a>
                              </div>
                              <button
                                onClick={() => copyToClipboard(source)}
                                className={`p-1 rounded transition-colors ${
                                  darkMode
                                    ? 'text-gray-400 hover:text-gray-200'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                                title="Copy link"
                              >
                                {copiedSource === source ? (
                                  <Check size={12} className="text-green-500" />
                                ) : (
                                  <Copy size={12} />
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className={`flex-shrink-0 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900' 
          : 'bg-white'
      }`}>
        {/* Terms and Conditions (only show when no messages) */}
        {messages.length === 0 && !aiTyping && (
          <div className={`text-center py-2 text-xs transition-colors duration-300 ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            By using IAKOBI, you agree to our{' '}
            <button className={`underline transition-colors hover:scale-105 transform ${
              darkMode ? 'hover:text-gray-300' : 'hover:text-gray-700'
            }`}>
              Terms
            </button>{' '}
            and{' '}
            <button className={`underline transition-colors hover:scale-105 transform ${
              darkMode ? 'hover:text-gray-300' : 'hover:text-gray-700'
            }`}>
              Privacy Policy
            </button>
          </div>
        )}

        <div className="p-4">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                className={`w-full px-4 py-3 pr-12 rounded-2xl focus:outline-none focus:ring-2 resize-none placeholder-gray-500 transition-all duration-300 border ${
                  darkMode
                    ? 'focus:ring-orange-500 focus:border-orange-500 bg-gray-800 text-white border-gray-600'
                    : 'focus:ring-orange-500 focus:border-orange-500 bg-gray-50 text-gray-900 border-gray-300'
                }`}
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={aiTyping}
                rows={1}
                style={{
                  minHeight: '52px',
                  maxHeight: '200px',
                  overflow: 'auto'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 200) + 'px'
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={aiTyping || !input.trim()}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 ${
                  darkMode
                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {aiTyping ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ArrowUp size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}