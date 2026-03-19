import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
// THREE is used for THREE.BackSide

export default function FloatingIcosahedron({ position, phaseOffset, color, label, path, href }) {
  const groupRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const coreRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)
  const scaleRef = useRef(1)
  const navigate = useNavigate()

  const baseY = position[1]
  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime + phaseOffset

    // float
    groupRef.current.position.y = baseY + Math.sin(t * 0.7) * 0.35

    // rings spin independently
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.9
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.6
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 1.1

    // core slow pulse
    if (coreRef.current) {
      const pulse = 0.9 + Math.sin(t * 2.2) * 0.08
      coreRef.current.scale.setScalar(pulse)
    }

    // glow breathe
    if (glowRef.current) {
      glowRef.current.material.opacity = hovered
        ? 0.18 + Math.sin(t * 3) * 0.06
        : 0.07 + Math.sin(t * 2) * 0.03
    }

    const targetScale = hovered ? 1.22 : 1.0
    scaleRef.current += (targetScale - scaleRef.current) * Math.min(delta * 8, 1)
    groupRef.current.scale.setScalar(scaleRef.current)
  })

  const ringMat = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={hovered ? 2.2 : 0.6}
      metalness={0.7}
      roughness={0.1}
    />
  )

  const hitHandlers = {
    onPointerOver: (e) => {
      e.stopPropagation()
      setHovered(true)
      document.body.style.cursor = 'pointer'
    },
    onPointerOut: () => {
      setHovered(false)
      document.body.style.cursor = 'auto'
    },
    onClick: (e) => {
      e.stopPropagation()
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else {
        navigate(path)
      }
    },
  }

  return (
    <group ref={groupRef} position={[position[0], baseY, position[2]]}>

      {/* invisible hit area */}
      <mesh {...hitHandlers}>
        <sphereGeometry args={[1.0, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.88, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.07}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* planet core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.46, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.8 : 0.55}
          metalness={0.3}
          roughness={0.35}
        />
      </mesh>

      {/* equatorial ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.032, 8, 64]} />
        {ringMat}
      </mesh>

      {/* tilted orbital ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3.5, 0, 0]}>
        <torusGeometry args={[0.92, 0.022, 8, 64]} />
        {ringMat}
      </mesh>

      {/* second tilted ring — opposite axis */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 3]}>
        <torusGeometry args={[1.05, 0.016, 8, 64]} />
        {ringMat}
      </mesh>

      {/* label */}
      {hovered && (
        <Text
          position={[0, 1.55, 0]}
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
