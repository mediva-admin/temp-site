"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Meteor {
  id: number
  x: number
  y: number
  delay: number
  duration: number
}

export function MeteorEffect() {
  const [meteors, setMeteors] = useState<Meteor[]>([])

  useEffect(() => {
    const generateMeteors = () => {
      const newMeteors: Meteor[] = []
      for (let i = 0; i < 20; i++) {
        newMeteors.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 10,
          duration: 2 + Math.random() * 3,
        })
      }
      setMeteors(newMeteors)
    }

    generateMeteors()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute"
          style={{
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
          }}
          animate={{
            x: [0, 200],
            y: [0, 100],
            opacity: [1, 0.8, 0],
            scale: [1, 1.5, 0],
          }}
          transition={{
            duration: meteor.duration,
            repeat: Infinity,
            ease: "linear",
            delay: meteor.delay,
          }}
        >
          {/* Meteor trail */}
          <div className="absolute w-0.5 h-0.5 bg-gradient-to-r from-white via-blue-300 to-transparent rounded-full" />
          
          {/* Meteor head */}
          <div className="absolute w-1 h-1 bg-white rounded-full shadow-lg" />
        </motion.div>
      ))}
    </div>
  )
}
