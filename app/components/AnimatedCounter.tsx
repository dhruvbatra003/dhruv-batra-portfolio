'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function parse(val: string) {
  const match = val.match(/^([\d.]+)(.*)$/)
  if (!match) return { num: 0, suffix: val, decimals: 0 }
  const numStr = match[1]
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  return { num: parseFloat(numStr), suffix: match[2], decimals }
}

export default function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)
  const { num, suffix, decimals } = parse(value)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const totalFrames = (duration / 1000) * 60
    let frame = 0
    const timer = setInterval(() => {
      frame++
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3)
      setCount(num * progress)
      if (frame >= totalFrames) { setCount(num); clearInterval(timer) }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, num])

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString()
  return <span ref={ref} className={className}>{display}{suffix}</span>
}
