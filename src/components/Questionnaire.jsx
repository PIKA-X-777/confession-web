"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Heart, Send, Loader2, Phone } from "lucide-react"

export default function Questionnaire({ onComplete }) {
    const [answers, setAnswers] = useState({
        phoneNumber: "",
        feeling: "",
        thoughts: "",
        response: "",
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState("")

    const questions = [
        {
            id: "phoneNumber",
            question: "Your Phone Number (so I can reach you)",
            type: "tel",
            placeholder: "Enter your 10-digit number..."
        },
        {
            id: "feeling",
            question: "How are you feeling right now after reading all of this?",
            type: "textarea",
            placeholder: "Share your honest feelings..."
        },
        {
            id: "thoughts",
            question: "What's going through your mind?",
            type: "textarea",
            placeholder: "Your thoughts matter to me..."
        },
        {
            id: "response",
            question: "Would you like to give us a chance?",
            type: "select",
            options: ["Select an option...", "Yes, I'd like to try", "I need some time to think", "Let's stay friends", "I'm not sure yet"]
        },
        {
            id: "message",
            question: "Anything you'd like to tell me?",
            type: "textarea",
            placeholder: "Optional - but I'd love to hear from you..."
        }
    ]

    const handleChange = (id, value) => {
        if (id === "phoneNumber") {
            const cleaned = value.replace(/\D/g, "").slice(0, 10)
            setAnswers(prev => ({ ...prev, [id]: cleaned }))
        } else {
            setAnswers(prev => ({ ...prev, [id]: value }))
        }
        setError("")
    }

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^[6-9]\d{9}$/
        return phoneRegex.test(number)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validatePhoneNumber(answers.phoneNumber)) {
            setError("Please enter a valid 10-digit Indian phone number")
            return
        }

        setIsSubmitting(true)
        setError("")

        try {
            // Replace with YOUR Formspree endpoint
            const FORMSPREE_ENDPOINT = "https://formspree.io/f/movgykka"

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: `+91${answers.phoneNumber}`,
                    feeling: answers.feeling,
                    thoughts: answers.thoughts,
                    response: answers.response,
                    message: answers.message || 'None',
                    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
                }),
            })

            if (response.ok) {
                setSubmitted(true)
                setTimeout(() => {
                    onComplete()
                }, 3000)
            } else {
                setError("Something went wrong. Please try again.")
                setIsSubmitting(false)
            }
        } catch (error) {
            setError("Failed to send. Please check your connection.")
            setIsSubmitting(false)
        }
    }

    const isFormValid =
        validatePhoneNumber(answers.phoneNumber) &&
        answers.feeling &&
        answers.thoughts &&
        answers.response &&
        answers.response !== "Select an option..."

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-screen flex items-center justify-center text-white px-4"
            >
                <div className="text-center space-y-6 max-w-md">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart className="w-20 h-20 text-pink-400 fill-current mx-auto drop-shadow-lg" />
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold text-pink-300">
                        Thank you so much, Muskan! 💖
                    </h2>
                    <p className="text-lg text-pink-200">
                        Your response has been received. I'll reach out to you soon! 🌸
                    </p>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex items-center justify-center text-white px-4 py-8"
        >
            <div className="w-full max-w-2xl">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent mb-4">
                        I'd Love to Hear From You, Muskan
                    </h2>
                    <p className="text-pink-200 text-lg">Please share your thoughts with me 💭</p>
                </motion.div>

                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={handleSubmit}
                    className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl space-y-6"
                >
                    {questions.map((q, index) => (
                        <motion.div
                            key={q.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="space-y-3"
                        >
                            <label className="block text-pink-200 font-medium text-lg">
                                {q.question}
                            </label>

                            {q.type === "tel" ? (
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/60">
                                        <Phone className="w-4 h-4" />
                                        <span className="text-sm">+91</span>
                                    </div>
                                    <input
                                        type="tel"
                                        value={answers[q.id]}
                                        onChange={(e) => handleChange(q.id, e.target.value)}
                                        placeholder={q.placeholder}
                                        maxLength={10}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-20 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                                    />
                                </div>
                            ) : q.type === "textarea" ? (
                                <textarea
                                    value={answers[q.id]}
                                    onChange={(e) => handleChange(q.id, e.target.value)}
                                    placeholder={q.placeholder}
                                    rows={4}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all resize-none"
                                />
                            ) : (
                                <select
                                    value={answers[q.id]}
                                    onChange={(e) => handleChange(q.id, e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all cursor-pointer"
                                >
                                    {q.options.map((option, i) => (
                                        <option key={i} value={option} className="bg-gray-900">
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </motion.div>
                    ))}

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                        whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                        className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${isFormValid
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg"
                            : "bg-white/10 cursor-not-allowed opacity-50"
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending Your Response...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                Send My Response
                            </>
                        )}
                    </motion.button>

                    <p className="text-center text-white/60 text-sm mt-4">
                        Your response will be sent securely 🔒💌
                    </p>
                </motion.form>
            </div>
        </motion.div>
    )
}
