'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const NODE_COUNT = 80
const CONNECTION_DISTANCE = 2.2
const ORANGE = new THREE.Color('#FF5C2E')
const TEAL = new THREE.Color('#00C9A7')
const LINE_COLOR = new THREE.Color(0.9, 0.9, 0.9)

export default function ProspectParticles() {
  const groupRef = useRef<THREE.Group>(null)

  const { positions, colors, nodeColors } = useMemo(() => {
    const positions: number[] = []
    const colors: number[] = []
    const nodeColors: THREE.Color[] = []

    for (let i = 0; i < NODE_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6
      )
      const c = Math.random() > 0.55 ? TEAL : ORANGE
      colors.push(c.r, c.g, c.b)
      nodeColors.push(c)
    }

    return { positions, colors, nodeColors }
  }, [])

  const linePositions = useMemo(() => {
    const pts: number[] = []
    const lineColors: number[] = []

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const xi = positions[i * 3], yi = positions[i * 3 + 1], zi = positions[i * 3 + 2]
        const xj = positions[j * 3], yj = positions[j * 3 + 1], zj = positions[j * 3 + 2]
        const dist = Math.sqrt((xi - xj) ** 2 + (yi - yj) ** 2 + (zi - zj) ** 2)

        if (dist < CONNECTION_DISTANCE) {
          pts.push(xi, yi, zi, xj, yj, zj)
          const alpha = 1 - dist / CONNECTION_DISTANCE
          lineColors.push(
            LINE_COLOR.r * alpha * 0.3,
            LINE_COLOR.g * alpha * 0.3,
            LINE_COLOR.b * alpha * 0.3,
            LINE_COLOR.r * alpha * 0.3,
            LINE_COLOR.g * alpha * 0.3,
            LINE_COLOR.b * alpha * 0.3
          )
        }
      }
    }

    return { pts, lineColors }
  }, [positions])

  const nodeGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return geo
  }, [positions, colors])

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions.pts, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(linePositions.lineColors, 3))
    return geo
  }, [linePositions])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.04
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.12
  })

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeo}>
        <pointsMaterial
          size={0.09}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial vertexColors transparent opacity={0.6} />
      </lineSegments>
    </group>
  )
}
