'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)
  const [hovered, setHovered] = useState<'default' | 'button' | 'image'>('default')
  const [visible, setVisible] = useState(false)

  const ringX = useSpring(cursorX, { damping: 28, stiffness: 180, mass: 0.5 })
  const ringY = useSpring(cursorY, { damping: 28, stiffness: 180, mass: 0.5 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('button') || t.closest('a')) setHovered('button')
      else if (t.closest('img')) setHovered('image')
      else setHovered('default')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
    }
  }, [cursorX, cursorY, visible])

  if (!visible) return null

  return (
    <>
      {/* Exact crimson dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-crimson rounded-full pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />

      {/* Lagging ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border-2"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovered === 'image' ? 88 : hovered === 'button' ? 56 : 40,
          height: hovered === 'image' ? 88 : hovered === 'button' ? 56 : 40,
          backgroundColor: hovered === 'button' ? 'rgba(230,57,70,0.15)' : 'transparent',
          borderColor: hovered === 'image' ? '#E63946' : 'rgba(241,250,238,0.5)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {hovered === 'image' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-label-caps text-[10px] uppercase tracking-widest text-brand-offwhite"
          >
            View
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
