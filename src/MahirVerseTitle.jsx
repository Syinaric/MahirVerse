import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center } from '@react-three/drei'

const FONT_URL =
  'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json'

export default function MahirVerseTitle() {
  const groupRef = useRef()
  const matRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.18
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.65 + Math.sin(t * 1.1) * 0.45
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={0.55}
          height={0.12}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.015}
          bevelSegments={5}
        >
          MahirVerse
          <meshStandardMaterial
            ref={matRef}
            color="#e8f4fd"
            emissive="#a8d8f0"
            emissiveIntensity={0.65}
            metalness={0.8}
            roughness={0.1}
          />
        </Text3D>
      </Center>
    </group>
  )
}
