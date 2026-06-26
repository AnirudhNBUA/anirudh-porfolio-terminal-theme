"use client"

import { useEffect, useRef } from "react"

/**
 * Animated dotted world-map background with a soft wave glow.
 *
 * 1. A land mask (public/world-map.png) is sampled once into a low-res
 *    grayscale buffer, then drawn as a grid of dots — land bright, ocean faint.
 * 2. A soft wave glow travels across the dots, giving the background a slow
 *    sense of movement without any arc interactions.
 *
 * Respects prefers-reduced-motion and pauses when the tab is hidden.
 */

export function DotMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    // --- sample the world map into a low-res grayscale buffer ---
    const BUF = 320
    let mask: Float32Array | null = null
    let maskW = 0
    let maskH = 0

    type Dot = { x: number; y: number; land: number; seed: number }
    let dots: Dot[] = []

    let width = 0
    let height = 0
    let dpr = 1
    const SPACING_BASE = 9

    function buildGrid() {
      if (!mask) return
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const spacing = width < 640 ? SPACING_BASE - 2 : SPACING_BASE

      // cover-fit the (square) mask across the canvas
      const scale = Math.max(width / maskW, height / maskH)
      const dispW = maskW * scale
      const dispH = maskH * scale
      const offX = (width - dispW) / 2
      const offY = (height - dispH) / 2

      dots = []
      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          const u = (x - offX) / dispW
          const v = (y - offY) / dispH
          let land = 0
          if (u >= 0 && u < 1 && v >= 0 && v < 1) {
            const mx = Math.floor(u * maskW)
            const my = Math.floor(v * maskH)
            land = mask![my * maskW + mx]
          }
          // skip most ocean dots to keep things light + sparse seas
          if (land < 0.35 && (x + y) % (spacing * 3) > spacing) continue
          dots.push({ x, y, land, seed: Math.random() * Math.PI * 2 })
        }
      }

    }

    let raf = 0
    let start = performance.now()

    function render(now: number) {
      const t = reduceMotion ? 0 : (now - start) / 1000

      ctx.clearRect(0, 0, width, height)

      // ---- dots with a soft wave glow across the background ----
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        const isLand = d.land >= 0.35

        let alpha = isLand ? 0.2 + d.land * 0.3 : 0.05

        if (!reduceMotion) {
          // gentle per-dot twinkle
          alpha *= 0.85 + 0.15 * Math.sin(t * 1.6 + d.seed)

          const waveA = Math.sin((d.x + d.y) * 0.012 - t * 1.05)
          const waveB = Math.sin((d.x - d.y) * 0.008 - t * 0.7)
          const glow = Math.max(0, waveA * 0.65 + waveB * 0.35)
          alpha += glow * (isLand ? 0.28 : 0.16)
        }

        if (alpha <= 0.02) continue
        const a = alpha > 1 ? 1 : alpha
        const size = isLand ? 1.7 : 1.2
        ctx.fillStyle = `rgba(232, 238, 235, ${a})`
        ctx.fillRect(d.x - size / 2, d.y - size / 2, size, size)
      }

      // ---- traveling glow band that sweeps across the dots ----
      if (!reduceMotion) {
        const waveX = (Math.sin(t * 0.45) * 0.5 + 0.5) * width
        const waveY = (Math.cos(t * 0.28) * 0.5 + 0.5) * height
        const maxDist = Math.hypot(width, height) * 0.45

        for (let i = 0; i < dots.length; i++) {
          const d = dots[i]
          const dist = Math.hypot(d.x - waveX, d.y - waveY)
          const wave = Math.max(0, 1 - dist / maxDist)
          if (wave <= 0.02) continue

          const pulse = Math.sin(t * 2.2 - dist * 0.04) * 0.5 + 0.5
          const alpha = wave * (0.14 + pulse * 0.24)
          ctx.fillStyle = `rgba(90, 190, 255, ${alpha})`
          ctx.fillRect(d.x - 1.1, d.y - 1.1, 2.2, 2.2)
        }
      }

      if (!reduceMotion) raf = requestAnimationFrame(render)
    }

    function startLoop() {
      cancelAnimationFrame(raf)
      start = performance.now()
      if (reduceMotion) {
        render(start)
      } else {
        raf = requestAnimationFrame(render)
      }
    }

    function handleResize() {
      buildGrid()
      if (!reduceMotion) startLoop()
      else render(performance.now())
    }

    function handleVisibility() {
      if (document.hidden) cancelAnimationFrame(raf)
      else if (!reduceMotion) startLoop()
    }

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const off = document.createElement("canvas")
      off.width = BUF
      off.height = BUF
      const octx = off.getContext("2d")
      if (!octx) return
      octx.drawImage(img, 0, 0, BUF, BUF)
      const data = octx.getImageData(0, 0, BUF, BUF).data
      maskW = BUF
      maskH = BUF
      mask = new Float32Array(BUF * BUF)
      for (let i = 0; i < BUF * BUF; i++) {
        mask[i] = data[i * 4] / 255
      }
      buildGrid()
      startLoop()
    }
    img.src = "/world-map.png"

    window.addEventListener("resize", handleResize)
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* vignette so foreground text stays legible over the dots */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_92%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
