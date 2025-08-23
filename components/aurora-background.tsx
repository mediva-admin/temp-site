"use client"

import { motion } from "framer-motion"

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Aurora effect */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(120, 119, 198, 0.4) 0%, transparent 50%), radial-gradient(circle at 100% 0%, rgba(120, 119, 198, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(120, 119, 198, 0.4) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(120, 119, 198, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(120, 119, 198, 0.4) 0%, transparent 50%), radial-gradient(circle at 100% 0%, rgba(120, 119, 198, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Moving light beams */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            "linear-gradient(45deg, transparent 30%, rgba(120, 119, 198, 0.1) 50%, transparent 70%)",
            "linear-gradient(-45deg, transparent 30%, rgba(120, 119, 198, 0.1) 50%, transparent 70%)",
            "linear-gradient(45deg, transparent 30%, rgba(120, 119, 198, 0.1) 50%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
