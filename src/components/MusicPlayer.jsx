"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "motion/react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [autoplayAttempted, setAutoplayAttempted] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const updateProgress = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100)
                setCurrentTime(audio.currentTime)
            }
        }

        const setAudioDuration = () => {
            setDuration(audio.duration)
        }

        audio.addEventListener("timeupdate", updateProgress)
        audio.addEventListener("loadedmetadata", setAudioDuration)

        // Attempt autoplay after component mounts
        if (!autoplayAttempted) {
            const attemptAutoplay = async () => {
                try {
                    await audio.play()
                    setIsPlaying(true)
                    setAutoplayAttempted(true)
                } catch (error) {
                    console.log("Autoplay prevented by browser. User interaction required.")
                    setAutoplayAttempted(true)
                }
            }

            // Delay slightly to ensure audio is loaded
            const timer = setTimeout(attemptAutoplay, 500)

            return () => {
                clearTimeout(timer)
                audio.removeEventListener("timeupdate", updateProgress)
                audio.removeEventListener("loadedmetadata", setAudioDuration)
            }
        }

        return () => {
            audio.removeEventListener("timeupdate", updateProgress)
            audio.removeEventListener("loadedmetadata", setAudioDuration)
        }
    }, [autoplayAttempted])

    // Enable autoplay on first user interaction anywhere on the page
    useEffect(() => {
        const handleFirstInteraction = async () => {
            if (!isPlaying && audioRef.current) {
                try {
                    await audioRef.current.play()
                    setIsPlaying(true)
                } catch (error) {
                    console.log("Play failed:", error)
                }
            }
            // Remove listener after first interaction
            document.removeEventListener("click", handleFirstInteraction)
            document.removeEventListener("touchstart", handleFirstInteraction)
        }

        document.addEventListener("click", handleFirstInteraction)
        document.addEventListener("touchstart", handleFirstInteraction)

        return () => {
            document.removeEventListener("click", handleFirstInteraction)
            document.removeEventListener("touchstart", handleFirstInteraction)
        }
    }, [isPlaying])

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause()
        } else {
            audioRef.current?.play()
        }
        setIsPlaying(!isPlaying)
    }

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00"
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <>
            <audio ref={audioRef} loop preload="auto">
                <source src="/audio/Kina Chir.mp3" type="audio/mpeg" />
            </audio>

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
            >
                <div className="bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl px-6 py-3">
                    <div className="flex items-center gap-4">
                        {/* Play/Pause Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={togglePlay}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-2 hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg"
                        >
                            {isPlaying ? (
                                <Pause className="w-5 h-5 text-white fill-current" />
                            ) : (
                                <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                            )}
                        </motion.button>

                        {/* Progress Bar with Enhanced Glow */}
                        <div className="flex-1 space-y-1">
                            <div className="relative h-1.5 bg-white/20 rounded-full overflow-visible">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        filter: 'blur(0.5px)'
                                    }}
                                    animate={{
                                        boxShadow: isPlaying
                                            ? [
                                                "0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.6), 0 0 30px rgba(236, 72, 153, 0.4)",
                                                "0 0 15px rgba(236, 72, 153, 1), 0 0 30px rgba(236, 72, 153, 0.8), 0 0 45px rgba(236, 72, 153, 0.6)",
                                                "0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.6), 0 0 30px rgba(236, 72, 153, 0.4)"
                                            ]
                                            : "0 0 8px rgba(236, 72, 153, 0.5), 0 0 15px rgba(236, 72, 153, 0.3)",
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                />

                                {/* Progress indicator dot with glow */}
                                {progress > 0 && (
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"
                                        style={{
                                            left: `${progress}%`,
                                            marginLeft: '-6px'
                                        }}
                                        animate={{
                                            boxShadow: isPlaying
                                                ? [
                                                    "0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(236, 72, 153, 0.6)",
                                                    "0 0 12px rgba(255, 255, 255, 1), 0 0 20px rgba(236, 72, 153, 1)",
                                                    "0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(236, 72, 153, 0.6)"
                                                ]
                                                : "0 0 6px rgba(255, 255, 255, 0.5)",
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                )}
                            </div>

                            <div className="flex justify-between text-xs text-white/60">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Mute Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleMute}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            {isMuted ? (
                                <VolumeX className="w-5 h-5" />
                            ) : (
                                <Volume2 className="w-5 h-5" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
