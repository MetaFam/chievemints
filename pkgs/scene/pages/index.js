import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Environment } from '@react-three/drei'
import { Box3, Vector3, Color } from 'three'
import Model from '../models/carbon-dwellers'

export default function Home() {
  // const Scene = ({ source }) => {
  //   const { scene } = useGLTF(source)
  //   const bBox = new Box3()
  //   bBox.setFromObject(scene)
  //   const size = bBox.getSize(new Vector3()).length();
  //   const fov = 50
  //   const near = size / 100;
  //   const far = size * 100;
  //   const position = [0, 0, size]
  //   const lights = [[0, 0, size], [0, 0, -size]]
  //   return (
  //     <Canvas
  //       style={{ height: '100%' }}
  //       camera={{ position, fov, near, far }}
  //     >
  //       {metadata?.background_color && (
  //         <color attach="background" args={[`#${metadata.background_color}`]}/>
  //       )}
  //       <Center>
  //         <primitive object={scene}/>
  //       </Center>
  //       <ambientLight intensity={0.1} />
  //       {lights.map((light, idx) => (
  //         <directionalLight key={idx} position={light} intensity={0.75}/>
  //       ))}
  //       <OrbitControls />
  //     </Canvas>
  //   )
  // }


  return (
    // <Scene source="https://ipfs.infura.io/ipfs/QmcKhVecogdTr2nCzadMNMPwhCWN9TxmL3SVVRHNFSLY1Y/carbon-dwellers1.glb"></Scene>
    <Canvas>
    <Model/>
    <OrbitControls/>
    </Canvas>

  )
}
