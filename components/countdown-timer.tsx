"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set target date to 1 year from today
    const today = new Date()
    const targetDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div 
      className="flex flex-col items-center mx-2 md:mx-4 group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="relative"
        animate={{ 
          scale: [1, 1.02, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.span 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
          whileHover={{ 
            scale: 1.1,
            color: "#93c5fd" // blue-300
          }}
          transition={{ duration: 0.3 }}
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
        
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 bg-white/20 blur-xl rounded-full"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Subtle border glow */}
        <motion.div 
          className="absolute inset-0 border border-white/10 rounded-lg"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      <motion.span 
        className="text-sm sm:text-base md:text-lg font-light text-gray-300 uppercase tracking-wider mt-3"
        whileHover={{ color: "#93c5fd" }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.span>
    </motion.div>
  )

  return (
    <motion.div 
      className="flex flex-wrap justify-center items-center mb-16 gap-4 md:gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <TimeUnit value={timeLeft.days} label="days" />
      <TimeUnit value={timeLeft.hours} label="hrs" />
      <TimeUnit value={timeLeft.minutes} label="min" />
      <TimeUnit value={timeLeft.seconds} label="sec" />
    </motion.div>
  )
}
