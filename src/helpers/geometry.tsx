import { Box, Html, useGLTF } from "@react-three/drei";
import { useCursor } from "@react-three/drei/web/useCursor";
import { useLoader, useThree } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Euler } from "three/src/math/Euler";
import { Vector3 } from "three/src/math/Vector3";


export function LoadMesh(props: { path: string, [key: string]: any }) {
  const { path, ...primitiveProps } = props;
  const { scene } = useLoader(GLTFLoader, path)

  const copiedScene = useMemo(() => scene.clone(), [scene])
  return (
    <mesh castShadow >
      <primitive object={copiedScene} {...primitiveProps} />
    </mesh>
  )
}

export function Point3D(props: { position: Vector3, rotation?: Euler, scale: number[], path: string }) {
  const [hovered, setHovered] = useState<boolean>(false)
  useCursor(hovered, /*'pointer', 'auto'*/)

  return (
    <LoadMesh
      castShadow
      receiveShadow
      onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
      {...props}
    />
  )
}

export function FloorPoint(props = { position: new Vector3(0, 0, 0) } as any) {
  return (
    <Point3D
      {...props}
      path={'/models/point.glb'}
      rotation={[Math.PI / 2, 0, Math.PI / 2]}
      scale={[.5, .5, .5]}
    />
  )
}


export function LinkWall(props: { position: Vector3, rotation?: Euler, [key: string]: any, text?: string, scale?: Vector3}) {
  const [hovered, setHovered] = useState<boolean>(false)
  useCursor(hovered, /*'pointer', 'auto'*/)
  const { mouse, size } = useThree()

  return (
    <>
      <Box
        {...props}
        scale={props.scale ?? [2, 4, .2]}
        onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial opacity={0} color="white" transparent={true} />
        { props.text && hovered &&
          <Html center calculatePosition={() => {
            return [(((mouse.x + 1) / 2)) * size.width, ((1 - mouse.y) / 2) * size.height + 100]
          }}>
            <p className="tooltip">{props.text}</p>
          </Html>
        }
      </Box>

    </>
  )
} 