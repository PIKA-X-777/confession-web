"use client"

import { motion } from "motion/react"
import { Heart, Sparkles, Star, RotateCcw } from "lucide-react"

export default function ThankYouScreen({ onRestart }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex items-center justify-center text-white px-4 py-8 relative overflow-hidden"
        >
            {/* Floating Hearts Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [-20, -100, -200],
                            x: [0, Math.random() * 100 - 50],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0.5],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: '-20px',
                        }}
                    >
                        <Heart className="w-4 h-4 md:w-6 md:h-6 text-pink-300/40 fill-current" />
                    </motion.div>
                ))}
            </div>

            {/* Twinkling Stars */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`star-${i}`}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 2 + Math.random(),
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    >
                        <Star className="w-3 h-3 text-yellow-300/50 fill-current" />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                {/* Main Content Card */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, type: "spring" }}
                    className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl text-center space-y-6"
                >
                    {/* Animated Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: "spring", stiffness: 200 }}
                        className="relative"
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-pink-400 mx-auto drop-shadow-2xl" />
                        </motion.div>

                        {/* Orbiting Hearts */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`orbit-${i}`}
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: "linear",
                                }}
                                className="absolute inset-0"
                            >
                                <Heart className="w-5 h-5 text-pink-400 fill-current absolute top-0 left-1/2 -translate-x-1/2" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Main Message */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
                            Thank You, Muskan! 💖
                        </h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 1 }}
                            className="space-y-3 text-pink-100/90"
                        >
                            <p className="text-base md:text-lg font-light leading-relaxed">
                                Thank you so much for taking the time to visit this little corner of the internet that I created just for you. 🌸
                            </p>

                            <p className="text-base md:text-lg font-light leading-relaxed">
                                Every line, every word, every animation here was crafted with you in mind. I hope it brought a smile to your face. ✨
                            </p>

                            <p className="text-base md:text-lg font-light leading-relaxed">
                                You are genuinely special, and I'm grateful our paths crossed.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Decorative Element */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 2, duration: 0.8 }}
                        className="flex justify-center gap-2 py-3"
                    >
                        {[...Array(7)].map((_, i) => (
                            <motion.div
                                key={`heart-${i}`}
                                animate={{
                                    y: [0, -10, 0],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                }}
                            >
                                <Heart className="w-4 h-4 md:w-6 md:h-6 text-pink-400 fill-current opacity-80" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Bottom Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5, duration: 1 }}
                        className="pt-4 border-t border-white/10 space-y-3"
                    >
                        <p className="text-base md:text-lg text-pink-200/90 font-light italic">
                            "Some people make the world brighter just by being in it."
                        </p>

                        <p className="text-sm md:text-base text-pink-200/70">
                            You're one of those people, Muskan. 🌟
                        </p>

                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className="pt-2"
                        >
                            <p className="text-xl md:text-2xl">
                                Stay amazing! 💫
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Restart Button */}
                    {onRestart && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3, duration: 1 }}
                            onClick={onRestart}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-6 bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-400/30 text-pink-200 px-8 py-3 rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto backdrop-blur-sm hover:from-pink-500/30 hover:to-purple-600/30"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Experience Again
                        </motion.button>
                    )}
                </motion.div>

                {/* Bottom Floating Text */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 1 }}
                    className="text-center mt-6 space-y-2"
                >
                    <p className="text-white/50 text-sm font-light">
                        This website will always be here, just for you 💝
                    </p>
                    <motion.p
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="text-pink-300/60 text-xs"
                    >
                        You can come back anytime you want ✨
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    )
}
