import React, { Suspense } from 'react'
import { Canvas, PrimitiveProps } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Maybe } from '@/lib/types'

export const Model = (
  { model, ...props }:
  {
    model: string
    props: PrimitiveProps & Record<string, (() => void)>
  }
) => {
  const { scene } = useGLTF(model)

  return (
    <primitive {...props} object={scene} />
  )
}

export const ThreeDScene = (
  { model, className = null, bg = null }:
  { model: string; className?: string, bg?: string }
) => {
  const [paused, setPaused] = React.useState(false)

  let args: Maybe<[r: number, g: number, b: number]> = null
  if(bg) {
    args = (
      bg.match(/../g)
      .map((num) => Number(`0x${num}`) / 255)
      .slice(0, 3)
    ) as [r: number, g: number, b: number]
  }

  return (
    <Suspense fallback={null}>
      <Canvas {...{ className }}>
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
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        />
        <OrbitControls
          autoRotate={!paused}
          autoRotateSpeed={3.5}
          makeDefault
        />
      </Canvas>
    </Suspense>
 )
}