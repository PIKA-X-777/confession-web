"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { Heart, ArrowRight } from "lucide-react"

export default function SpecialMessage({ onComplete }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const messageRef = useRef(null)

  const fullMessage = `My Dearest Muskan,

From the moment I first saw you, I knew something beautiful was beginning. You walked into my life like a gentle breeze, bringing warmth and light to my world in ways I never imagined possible.

Every time I see your smile, my day gets brighter. Your simple, genuine nature touches my heart deeply, and your presence makes everything feel more peaceful and beautiful.

Muskan, you are truly special. Your kindness, your laugh, and the way you carry yourself with such grace—everything about you feels magical to me.

I want to be the reason behind your smiles, to hold your hand through every moment, and to show you every day how incredibly precious you are to me.

Will you be my Gwen, Muskan? 💖

With all my heart,
Someone who cares deeply for you 🌸✨`

  useEffect(() => {
    if (currentIndex < fullMessage.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullMessage.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)

        // Auto scroll to bottom as text appears
        if (messageRef.current) {
          messageRef.current.scrollTop = messageRef.current.scrollHeight
        }
      }, 20)
      return () => clearTimeout(timer)
    } else {
      setShowCursor(false)
      setTimeout(() => setShowButton(true), 1000)
    }
  }, [currentIndex, fullMessage])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col justify-center text-white px-4 py-4 md:px-6 md:py-6"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showButton ? -6 : 0 }}
        className="flex flex-col max-w-4xl mx-auto w-full">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 lg:p-12 border border-white/10 shadow-2xl">
          <div className="text-center mb-6">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-pink-400 fill-current mx-auto" />
            </motion.div>
          </div>

          <div
            ref={messageRef}
            className="max-h-[60vh] overflow-y-auto pr-2 scroll-smooth transition-all duration-500"
          >
            <pre className="text-base md:text-lg lg:text-xl font-light leading-relaxed whitespace-pre-line text-pink-100 text-left">
              {displayedText}
              {currentIndex < fullMessage.length && showCursor && (
                <span className="inline-block w-0.5 h-4 md:h-5 bg-pink-400 ml-1 animate-pulse"></span>
              )}
            </pre>
          </div>
        </div>

        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 md:px-10 py-4 rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-1 md:gap-2">
                <Heart className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                Continue to Next
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
