import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import { Environment } from '@react-three/drei';
const Earth = () => {
  const earth = useGLTF('robo.gltf');
  return (
    <primitive object={earth.scene} scale={0.01} position-y={-1.8} rotation-y={0} rotation-z={0} rotation-x={4.7} position-x={0.5} />
  );
};

export const EarthCanvas = () => {
  return (

    <Canvas 
      shadows 
      frameloop='demand' 
      gl={{ preserveDrawingBuffer: true }} 
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      
      <Suspense fallback={null}>
        {/* Orbit controls to allow camera movement */}
        <OrbitControls 
          autoRotate 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2} 
        />

        {/* Ambient light for general illumination */}
        <ambientLight intensity={0.5} />

        {/* Hemisphere light for uniform lighting */}
        <hemisphereLight 
          skyColor={'#ffffff'} 
          groundColor={'#444444'} 
          intensity={0.6} 
          position={[0, 50, 0]} 
        />

        {/* Directional light 1 */}
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />

        {/* Directional light 2 - Back light */}
        <directionalLight 
          position={[-10, 10, -10]} 
          intensity={0.8} 
        />

        {/* SpotLight to highlight the model */}
        <spotLight 
          position={[15, 25, 10]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />

        {/* Point light for additional lighting */}
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Load and render the Earth model */}
       
        <Earth />
        
        {/* Preload assets */}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};
