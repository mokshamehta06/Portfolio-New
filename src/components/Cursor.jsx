import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId = null

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      rafId = requestAnimationFrame(animate)
    }

    const onMouseEnterInteractive = () => {
      ring.classList.add('hovering')
      dot.classList.add('hovering')
    }

    const onMouseLeaveInteractive = () => {
      ring.classList.remove('hovering')
      dot.classList.remove('hovering')
    }

    const addInteractiveListeners = () => {
      const interactiveEls = document.querySelectorAll('a, button, [data-hover]')
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    }

    addInteractiveListeners()

    // Re-scan for interactive elements periodically (in case DOM changes)
    const observer = new MutationObserver(addInteractiveListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animate)

    // Hide cursor on mouse leave document
    const onMouseLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onMouseEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafId)
      observer.disconnect()
      const interactiveEls = document.querySelectorAll('a, button, [data-hover]')
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive)
        el.removeEventListener('mouseleave', onMouseLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: #ff2d78;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background 0.2s;
          mix-blend-mode: normal;
        }
        .cursor-dot.hovering {
          width: 12px;
          height: 12px;
          background: #ff6eb4;
        }
        .cursor-ring {
          position: fixed;
          width: 36px;
          height: 36px;
          border: 2px solid rgba(255, 45, 120, 0.55);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          transform: translate(-50%, -50%);
          transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .cursor-ring.hovering {
          width: 56px;
          height: 56px;
          border-color: rgba(255, 45, 120, 0.85);
          background: rgba(255, 45, 120, 0.08);
        }
        @media (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
