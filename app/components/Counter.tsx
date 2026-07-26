'use client'

import { useEffect, useState } from 'react'

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
  const [value, setValue] = useState(from)

  useEffect(() => {
    let startTime: number | null = null
    let frame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (progress < 1) {
        frame = requestAnimationFrame(step)
      }
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [from, to, duration])

  return <span>{prefix}{value}{suffix}</span>
}
