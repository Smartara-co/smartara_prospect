'use client'

import dynamic from 'next/dynamic'
import { Suspense, Component, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { useIsDesktop } from '@/hooks/useMediaQuery'

const ProspectParticles = dynamic(() => import('./ProspectParticles'), {
  ssr: false,
})

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

const GradientFallback = () => (
  <div
    className="absolute inset-0"
    style={{
      background:
        'radial-gradient(ellipse at 60% 50%, rgba(255,92,46,0.15) 0%, rgba(0,201,167,0.10) 40%, transparent 70%)',
    }}
  />
)

export default function HeroCanvasWrapper() {
  const isDesktop = useIsDesktop()

  if (!isDesktop) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      <ErrorBoundary fallback={<GradientFallback />}>
        <Suspense fallback={<GradientFallback />}>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 55 }}
            gl={{ antialias: true, alpha: true }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.4} />
            <ProspectParticles />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
