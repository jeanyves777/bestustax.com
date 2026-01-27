'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface FloatingNumber {
  id: number
  x: number
  y: number
  value: string
  size: number
  duration: number
  delay: number
}

export function FloatingNumbers() {
  const containerRef = useRef<HTMLDivElement>(null)
  const numbers = useRef<FloatingNumber[]>([])

  useEffect(() => {
    // Generate random floating numbers
    const taxNumbers = ['$', '1040', 'W-2', 'IRS', '%', 'TAX', '$$', 'ACCT']
    numbers.current = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      value: taxNumbers[Math.floor(Math.random() * taxNumbers.length)],
      size: Math.random() * 20 + 20,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10 pointer-events-none"
    >
      {numbers.current.map((num) => (
        <motion.div
          key={num.id}
          className="absolute font-bold text-light-accent-primary dark:text-dark-accent-primary"
          style={{
            left: `${num.x}%`,
            top: `${num.y}%`,
            fontSize: `${num.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: num.duration,
            delay: num.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {num.value}
        </motion.div>
      ))}
    </div>
  )
}
