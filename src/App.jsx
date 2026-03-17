import { Routes, Route } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import FloatingIcosahedron from './FloatingIcosahedron'
import MahirVerseTitle from './MahirVerseTitle'
import CustomCursor from './CustomCursor'
import PlaceholderPage from './PlaceholderPage'

const RADIUS = 3.2

const GEMS = [
  { color: '#4fc3f7', angle: 0,                 label: 'Projects',   path: '/projects'   },
  { color: '#ce93d8', angle: Math.PI / 2,        label: 'Experience', path: '/experience' },
  { color: '#69f0ae', angle: Math.PI,            label: 'Blog',       path: '/blog'       },
  { color: '#ffb74d', angle: (3 * Math.PI) / 2, label: 'Connect',    path: '/connect'    },
]

function Scene() {
  return (
    <>
      <CustomCursor />
      <Canvas
        camera={{ position: [0, 2.5, 9], fov: 60 }}
        style={{ width: '100vw', height: '100vh', background: '#030014', pointerEvents: 'auto' }}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[0, 6, 6]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-6, -4, -4]} intensity={0.4} color="#8080ff" />

        <Stars
          radius={120}
          depth={60}
          count={6000}
          factor={4}
          saturation={0.1}
          fade
          speed={0.6}
        />

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
            label={gem.label}
            path={gem.path}
          />
        ))}

        <MahirVerseTitle />

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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Scene />} />
      <Route path="/projects"   element={<PlaceholderPage title="Projects" />} />
      <Route path="/experience" element={<PlaceholderPage title="Experience" />} />
      <Route path="/blog"       element={<PlaceholderPage title="Blog" />} />
      <Route path="/connect"    element={<PlaceholderPage title="Connect" />} />
    </Routes>
  )
}
