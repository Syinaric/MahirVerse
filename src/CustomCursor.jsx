import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const circleRef = useRef(null)
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const smoothed = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const rafId = useRef(null)

  useEffect(() => {

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    const loop = () => {
      smoothed.current.x += (mousePos.current.x - smoothed.current.x) * 0.08
      smoothed.current.y += (mousePos.current.y - smoothed.current.y) * 0.08

      if (circleRef.current) {
        circleRef.current.style.transform =
          `translate(${smoothed.current.x - 30}px, ${smoothed.current.y - 30}px)`
      }

      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={circleRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 60,
        height: 60,
        borderRadius: '50%',
        border: '2px solid white',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
    />
  )
}
