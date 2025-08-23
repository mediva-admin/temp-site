"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface GlowingStar {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
}

export function GlowingStars() {
  const [stars, setStars] = useState<GlowingStar[]>([])

  useEffect(() => {
    const generateGlowingStars = () => {
      const colors = [
        "rgba(255, 255, 255, 0.8)",
        "rgba(147, 197, 253, 0.8)", // blue-300
        "rgba(167, 139, 250, 0.8)", // violet-300
        "rgba(134, 239, 172, 0.8)", // green-300
      ]
      
      const newStars: GlowingStar[] = []
      for (let i = 0; i < 25; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 5,
        })
      }
      setStars(newStars)
    }

    generateGlowingStars()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.4, 1],
            boxShadow: [
              `0 0 ${star.size * 2}px ${star.color}`,
              `0 0 ${star.size * 4}px ${star.color}`,
              `0 0 ${star.size * 2}px ${star.color}`,
            ],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  )
}
