import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const Earth = () => {
  const earth = useGLTF("ravenjltf-2/ravenjltf/raven.gltf");
  return (
    <primitive
      object={earth.scene}
      scale={1.5}
      position-y={-1.7}
      position-z={0}
      rotation-y={0}
      position-x={-0.05}
    />
  );
};

export const EarthCanvas3 = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
      style={{ width: "100%", height: "100%" }} // Ensure Canvas takes full size of its container
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[0, 10, 0]}
          intensity={5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[-10, -10, -10]}
          intensity={5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight
          position={[10, 20, 10]}
          angle={0.15}
          penumbra={1}
          intensity={0.8}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};
