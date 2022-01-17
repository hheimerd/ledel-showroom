import { Box, Html } from "@react-three/drei";
import { useCursor } from "@react-three/drei/web/useCursor";
import { useLoader, useThree } from "@react-three/fiber";
import { useMemo, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3 } from "three/src/math/Box3";
import { Euler } from "three/src/math/Euler";
import { Vector3 } from "three/src/math/Vector3";

export function ErrorCubeFallback({ error, resetErrorBoundary }: any) {
  return (
    <Box />
  )
}

type LoadMeshProps = {
  path: string;
  size?: number;
  [key: string]: any;
};

export function LoadMesh(props: LoadMeshProps) {
  const { path, ...primitiveProps } = props;

  const { scene } = useLoader(GLTFLoader, path)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const copiedScene = useMemo(() => scene.clone(), [path])

  if (props.size) {
    const box = new Box3().setFromObject(copiedScene)
    const size = box.getSize(new Vector3()).length();
    copiedScene.scale.set(props.size / size, props.size / size, props.size / size);
  }

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


export function LinkWall(props: { position: Vector3, rotation?: Euler, [key: string]: any, text?: string, scale?: Vector3 }) {
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
        {props.text && hovered &&
          <Html center calculatePosition={() => {
            return [(((mouse.x + 1) / 2)) * size.width, ((1 - mouse.y) / 2) * size.height + 100]
          }}>
            <p className="tooltip" dangerouslySetInnerHTML={{ __html: props.text }}></p>
          </Html>
        }
      </Box>

    </>
  )
} 