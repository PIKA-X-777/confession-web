"use client"

import { motion } from "motion/react"
import { Heart, Sparkles } from "lucide-react"

export default function FinalConfession({ onComplete }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex flex-col items-center justify-center text-white px-4 py-6 md:px-6 md:py-8"
        >
            <div className="w-full max-w-3xl flex flex-col justify-center space-y-8 md:space-y-12">
                {/* Animated Hearts Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -100],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.5,
                            }}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                bottom: '0%',
                            }}
                        >
                            <Heart className="w-6 h-6 text-pink-300/30 fill-current" />
                        </motion.div>
                    ))}
                </div>

                {/* Main Content */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="relative z-10"
                >
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl text-center space-y-8">
                        {/* Animated Icon */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-pink-400 mx-auto drop-shadow-lg" />
                        </motion.div>

                        {/* Main Question */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                                So, Muskan...
                            </h1>

                            <motion.p
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-2xl md:text-3xl text-pink-200 font-light"
                            >
                                Will you be my Gwen? 🎀
                            </motion.p>
                        </motion.div>

                        {/* Decorative Hearts */}
                        <div className="flex justify-center gap-4 py-4">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                >
                                    <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-400 fill-current" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Sweet Message */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="space-y-4 text-pink-100/90"
                        >
                            <p className="text-lg md:text-xl font-light leading-relaxed">
                                I know we haven't talked much, and our departments keep us apart,
                                but every little moment with you feels special to me.
                            </p>

                            <p className="text-lg md:text-xl font-light leading-relaxed">
                                Your smile brightens my day, and I genuinely care about you.
                            </p>

                            <p className="text-lg md:text-xl font-light leading-relaxed">
                                I'd love to get to know you better, slowly and naturally. 💖
                            </p>
                        </motion.div>

                        {/* Bottom Note */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 1 }}
                            className="pt-6 border-t border-white/10"
                        >
                            <p className="text-sm md:text-base text-pink-200/70 font-light italic">
                                No pressure at all, Muskan. Your feelings and comfort matter the most to me. 🌸
                            </p>
                        </motion.div>

                        {/* Continue Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5, duration: 1 }}
                            onClick={onComplete}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                        >
                            <Heart className="w-5 h-5 fill-current" />
                            Continue
                        </motion.button>
                    </div>
                </motion.div>

                {/* Bottom Floating Text */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    className="text-center text-white/60 text-base md:text-lg font-light"
                >
                    Take your time to think about it ✨
                </motion.p>
            </div>
        </motion.div>
    )
}
