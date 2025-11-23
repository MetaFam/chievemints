import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import type { Maybe } from '#types'
import LoggingErrorBoundary from './LoggingErrorBoundary'

export const Model = (
  { model, group: groupProps, ...props }:
  {
    model: string
    group: Record<string, (() => void)>
    props?: any
  }
) => {
  const { scene } = useGLTF(model)

  return (
    <group {...groupProps}>
      <primitive {...props} object={scene} />
    </group>
  )
}

export const ThreeDScene = (
  { model, className, bg = null }:
  { model: string; className?: string, bg?: Maybe<string> }
) => {
  const [paused, setPaused] = React.useState(false)

  let args: Maybe<[r: number, g: number, b: number]> = null
  if(bg && bg.length >= 6) {
    args = (
      bg.match(/../g)!
      .map((num) => Number(`0x${num}`) / 255)
      .slice(0, 3)
    ) as [r: number, g: number, b: number]
  }

  return (
    <Suspense fallback={null}>
      <LoggingErrorBoundary>
        <section {...{ className }}>
          <Canvas>
            {args?.length === 3 && (
              <color attach="background" {...{ args }}/>
            )}
            <ambientLight intensity={0.2} />
            <directionalLight
              intensity={0.75}
              position={[0, 0, 5]}
            />
            <Model
              {...{ model }}
              group={{
                onPointerEnter: () => setPaused(true),
                onPointerLeave: () => setPaused(false),
              }}
            />
            <OrbitControls
              autoRotate={!paused}
              autoRotateSpeed={3.5}
              makeDefault
            />
          </Canvas>
        </section>
      </LoggingErrorBoundary>
    </Suspense>
  )
}