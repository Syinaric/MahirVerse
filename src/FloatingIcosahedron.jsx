import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'

export default function FloatingIcosahedron({ position, phaseOffset, color, label, path }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const scaleRef = useRef(1)
  const navigate = useNavigate()

  const baseY = position[1]

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime
    meshRef.current.rotation.x = t * 0.3
    meshRef.current.rotation.y = t * 0.5
    groupRef.current.position.y = baseY + Math.sin(t * 0.8 + phaseOffset) * 0.35

    const targetScale = hovered ? 1.2 : 1.0
    scaleRef.current += (targetScale - scaleRef.current) * Math.min(delta * 8, 1)
    groupRef.current.scale.setScalar(scaleRef.current)
  })

  return (
    <group ref={groupRef} position={[position[0], baseY, position[2]]}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          navigate(path)
        }}
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

      {hovered && (
        <Text
          position={[0, 1.3, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  )
}
