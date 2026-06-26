"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import dynamic from "next/dynamic"
import * as THREE from "three"
import type { GlobeMethods } from "react-globe.gl"

// react-globe.gl touches `window`, so it must be client-only.
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false })

const GLOBE_BASE = "#040a07"

export function HeroGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [countries, setCountries] = useState<{ features: object[] }>({
    features: [],
  })

  // size of the rendered globe canvas — much larger than the container so the
  // sphere reads as a massive hemisphere clipped by the right screen edge.
  const globeSize = useMemo(() => {
    const { w, h } = box
    if (!w || !h) return 0
    return Math.round(Math.max(h * 1.55, w * 1.15))
  }, [box])

  // offsets so the globe centre sits near the right edge, bleeding off-screen
  const offset = useMemo(() => {
    const { w, h } = box
    if (!globeSize) return { left: 0, top: 0 }
    return {
      left: Math.round(w * 0.74 - globeSize / 2),
      top: Math.round(h * 0.5 - globeSize / 2),
    }
  }, [box, globeSize])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () =>
      setBox({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    let active = true
    fetch("/countries.geojson")
      .then((response) => response.json())
      .then((geo) => {
        if (active) setCountries(geo)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  // configure controls + initial point of view exactly when the globe
  // instance is live. react-globe.gl fires `onGlobeReady` once the underlying
  // THREE scene + camera exist, which is the only reliable moment to call
  // `controls()` and `pointOfView()` — an effect tied to `globeSize` runs too
  // early (the dynamic import hasn't populated `globeRef.current` yet) and
  // would never re-run, leaving the camera stuck and rotation off.
  const initTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handleGlobeReady = useCallback(() => {
    const g = globeRef.current
    if (!g) return

    const controls = g.controls()
    controls.enableZoom = false
    controls.enablePan = false
    controls.enableRotate = false
    // extra-slow, gentle cinematic rotation around the polar axis
    controls.autoRotateSpeed = 0.16
    controls.autoRotate = true

    // begin firmly centred on India...
    g.pointOfView({ lat: 22, lng: 79, altitude: 1.72 }, 0)
  }, [])

  // clean up the pending rotation timer if the component unmounts
  useEffect(() => {
    return () => {
      if (initTimerRef.current) clearTimeout(initTimerRef.current)
    }
  }, [])

  const globeMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({ color: GLOBE_BASE })
  }, [])

  return (
    <div ref={containerRef} className="relative h-full w-full" aria-hidden="true">
      {globeSize > 0 && (
        <div
          className="absolute"
          style={{ left: offset.left, top: offset.top }}
        >
          <Globe
            ref={globeRef}
            onGlobeReady={handleGlobeReady}
            width={globeSize}
            height={globeSize}
            backgroundColor="rgba(0,0,0,0)"
            globeMaterial={globeMaterial}
            hexPolygonsData={countries.features}
            hexPolygonResolution={3}
            hexPolygonMargin={0.42}
            hexPolygonAltitude={0.004}
            hexPolygonUseDots
            hexPolygonColor={() => "rgba(76, 245, 160, 0.62)"}
          />
        </div>
      )}
    </div>
  )
}
