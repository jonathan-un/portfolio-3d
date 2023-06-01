import { Suspense, useEffect, useState, UseState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.15}
      groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
        />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.65}
        position={isMobile ? [0, -2.2, -1.85] : [0, -2.95, -1]}
        rotation={[0, -0.25, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ajoute un event-listener lorsque l'écran change de taille
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Fixe une valeur initiale à 'isMobile'
    setIsMobile(mediaQuery.matches);

    // Definit une fonction de rappel pour gérer les modifications de la requête média
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    // Ajoute la fonction de rappel en tant qu'event-listener pour les modifications de la requête média
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Supprime l'event-listener quand le composant est démonté
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

  return (
    <Canvas
      frameLoop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          />
          <Computers isMobile={isMobile}/>
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas;