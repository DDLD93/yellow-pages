'use client';

import { motion } from 'framer-motion';

export default function AbstractBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white pointer-events-none">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230D7B5D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Animated Abstract Shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {/* Top Right Shape - Kaduna Green */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] rounded-full border-[1px] border-kaduna-emerald/10 blur-3xl"
        />
        
        {/* Bottom Left Shape - Kaduna Navy */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full border-[1px] border-kaduna-navy/10 blur-3xl"
        />

        {/* Center Accent - Kaduna Gold */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-kaduna-gold/5 to-transparent blur-[100px]"
        />
      </motion.div>
    </div>
  );
}
