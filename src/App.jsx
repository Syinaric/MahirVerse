import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import FloatingIcosahedron from './FloatingIcosahedron'
import MahirVerseTitle from './MahirVerseTitle'
import CustomCursor from './CustomCursor'

const RADIUS = 3.2

const GEMS = [
  { color: '#4fc3f7', angle: 0 },
  { color: '#ce93d8', angle: Math.PI / 2 },
  { color: '#69f0ae', angle: Math.PI },
  { color: '#ffb74d', angle: (3 * Math.PI) / 2 },
]

export default function App() {
  return (
    <>
    <CustomCursor />
    <Canvas
      camera={{ position: [0, 2.5, 9], fov: 60 }}
      style={{ width: '100vw', height: '100vh', background: '#030014' }}
    >
      {/* Ambient + directional lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 6, 6]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-6, -4, -4]} intensity={0.4} color="#8080ff" />

      {/* Space starfield */}
      <Stars
        radius={120}
        depth={60}
        count={6000}
        factor={4}
        saturation={0.1}
        fade
        speed={0.6}
      />

      {/* 4 floating icosahedra in a circle */}
      {GEMS.map((gem, i) => (
        <FloatingIcosahedron
          key={i}
          position={[
            Math.cos(gem.angle) * RADIUS,
            0,
            Math.sin(gem.angle) * RADIUS,
          ]}
          phaseOffset={(i * Math.PI) / 2}
          color={gem.color}
        />
      ))}

      {/* Centered 3D title */}
      <MahirVerseTitle />

      {/* Drag to orbit */}
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={16}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </Canvas>
    </>
  )
}
