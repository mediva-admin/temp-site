"use client"

import { CountdownTimer } from "@/components/countdown-timer"
import { Footer } from "@/components/footer"
import { StarryBackground } from "@/components/starry-background"
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"

export function ComingSoonLanding() {
  return (
    <div className="relative min-h-screen">
      {/* Starry Background */}
      <StarryBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center text-white px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Countdown Timer */}
          <CountdownTimer />
          
          {/* Announcement Text */}
          <motion.div 
            className="mt-12 md:mt-16 lg:mt-20 space-y-3 md:space-y-4 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {/* Spotlight Effect */}
            <Spotlight
              className="-top-20 left-1/2 transform -translate-x-1/2"
              fill="rgba(255, 255, 255, 0.3)"
            />
            
            <motion.h2 
              className="text-base sm:text-lg md:text-xl font-light uppercase tracking-wider text-gray-300"
              whileHover={{ color: "#93c5fd" }}
              transition={{ duration: 0.3 }}
            >
              BEFORE LAUNCHING OUR
            </motion.h2>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-wider leading-tight relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              MEDIVA
            </motion.h1>
          </motion.div>
          
          {/* Sub Text */}
          <motion.div 
            className="mt-8 md:mt-12 lg:mt-16 space-y-3 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed"
              whileHover={{ color: "#e5e7eb" }}
              transition={{ duration: 0.3 }}
            >
              We're coming soon! Awesome design to present our future product or service.
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed"
              whileHover={{ color: "#d1d5db" }}
              transition={{ duration: 0.3 }}
            >
              We're working hard to give you the best experience!
            </motion.p>
          </motion.div>
          
          {/* Call-to-action button */}
          <motion.div 
            className="mt-12 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            <motion.button 
              className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Stay Updated
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer with 3D Marquee */}
      <Footer />
    </div>
  )
}
