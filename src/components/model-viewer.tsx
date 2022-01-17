import { OrbitControls, Environment, PerspectiveCamera, useProgress, Center } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorCubeFallback, LoadMesh } from "../helpers/geometry";

export function StatusBar(props: { height?: number, color?: string }) {
  const { progress } = useProgress()

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      display: progress < 100 ? 'block' : 'none',
      width: 20 + progress * .80 + '%',
      height: props.height ?? 10,
      backgroundColor: props.color ?? 'black'
    }}></div>
  )
}

export default function ModelViewer(props: { url: string }) {
  return (
    <div style={{ position: 'relative', cursor: 'grab' }}>
      <StatusBar />
      <Canvas>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <pointLight intensity={.5} />
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <OrbitControls enableZoom={false} enableRotate autoRotate />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Center>
            <ErrorBoundary FallbackComponent={ErrorCubeFallback}>
              <LoadMesh path={props.url} size={10}></LoadMesh>
            </ErrorBoundary>
          </Center>
        </Suspense>
      </Canvas>
    </div>
  )
}