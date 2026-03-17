import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FloatingIcosahedron({ position, phaseOffset, color }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  const baseY = position[1]

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    meshRef.current.rotation.x = t * 0.3
    meshRef.current.rotation.y = t * 0.5
    meshRef.current.position.y = baseY + Math.sin(t * 0.8 + phaseOffset) * 0.35
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
    >
      <icosahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 2.0 : 0.3}
        metalness={0.4}
        roughness={0.05}
      />
    </mesh>
  )
}
