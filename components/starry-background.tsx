"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { AuroraBackground } from "./aurora-background"
import { GlowingStars } from "./glowing-stars"
import { MeteorEffect } from "./meteor-effect"
import { Sparkles } from "./sparkles"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

interface ShootingStar {
  id: number
  x: number
  y: number
  delay: number
}

export function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < 300; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 0.5,
          opacity: Math.random() * 0.9 + 0.1,
        })
      }
      setStars(newStars)
    }

    // Generate shooting stars
    const generateShootingStars = () => {
      const newShootingStars: ShootingStar[] = []
      for (let i = 0; i < 12; i++) {
        newShootingStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 8,
        })
      }
      setShootingStars(newShootingStars)
    }

    generateStars()
    generateShootingStars()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Aurora background effect */}
      <AuroraBackground />
      
      {/* Base starry background */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* Shooting stars with trails */}
      {shootingStars.map((shootingStar) => (
        <div key={`shooting-${shootingStar.id}`} className="absolute">
          {/* Shooting star trail */}
          <motion.div
            className="absolute w-0.5 h-0.5 bg-gradient-to-r from-white via-blue-200 to-transparent rounded-full"
            style={{
              left: `${shootingStar.x}%`,
              top: `${shootingStar.y}%`,
            }}
            animate={{
              x: [0, 300],
              y: [0, 150],
              opacity: [1, 0.8, 0],
              scale: [1, 2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: shootingStar.delay,
            }}
          />
          
          {/* Shooting star head */}
          <motion.div
            className="absolute w-1 h-1 bg-white rounded-full shadow-lg"
            style={{
              left: `${shootingStar.x}%`,
              top: `${shootingStar.y}%`,
            }}
            animate={{
              x: [0, 300],
              y: [0, 150],
              opacity: [1, 0.9, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: shootingStar.delay,
            }}
          />
        </div>
      ))}

      {/* Large glowing stars */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`glowing-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 6}%`,
            top: `${20 + i * 5}%`,
          }}
        >
          {/* Star glow */}
          <motion.div
            className="absolute bg-white/30 rounded-full blur-sm"
            style={{
              width: '8px',
              height: '8px',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
          
          {/* Star core */}
          <motion.div
            className="absolute bg-white rounded-full"
            style={{
              width: '3px',
              height: '3px',
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        </motion.div>
      ))}

      {/* Floating constellation groups */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`constellation-${i}`}
          className="absolute"
          style={{
            left: `${25 + i * 10}%`,
            top: `${40 + i * 8}%`,
          }}
        >
          {Array.from({ length: 4 }).map((_, j) => (
            <motion.div
              key={`constellation-star-${i}-${j}`}
              className="absolute bg-white/80 rounded-full"
              style={{
                left: `${j * 25}px`,
                top: `${j * 20}px`,
                width: '1.5px',
                height: '1.5px',
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.4, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i + j) * 0.6,
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Pulsing nebula effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Additional Aceternity UI effects */}
      <MeteorEffect />
      <GlowingStars />
      <Sparkles />
    </div>
  )
}
