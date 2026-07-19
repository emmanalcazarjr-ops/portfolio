'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

interface CounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
}

export default function Counter({ 
  from = 0, 
  to, 
  duration = 2, 
  suffix = '',
  prefix = '' 
}: CounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const display = useTransform(rounded, (latest) => `${prefix}${latest}${suffix}`)

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: 'easeOut',
    })
    return controls.stop
  }, [count, to, duration])

  return <motion.span>{display}</motion.span>
}
