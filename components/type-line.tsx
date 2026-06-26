"use client"

import { useEffect, useState } from "react"

export function TypeLine({
  text,
  speed = 38,
  startDelay = 0,
  className = "",
  cursor = true,
  onDone,
}: {
  text: string
  speed?: number
  startDelay?: number
  className?: string
  cursor?: boolean
  onDone?: () => void
}) {
  const [shown, setShown] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    let interval: ReturnType<typeof setInterval>

    timer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setShown(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
          onDone?.()
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  return (
    <span className={`${className} ${cursor && !done ? "blink-cursor" : ""}`}>
      {shown}
    </span>
  )
}
