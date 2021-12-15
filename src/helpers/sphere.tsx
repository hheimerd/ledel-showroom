import { MeshProps, useLoader } from "@react-three/fiber";
import { TextureLoader, BackSide,  Vector2 } from "three";

export function VRSphere(props: { texturePath: string } & MeshProps) {
  const { texturePath, ...meshProps } = props;

  const texture = useLoader(TextureLoader, props.texturePath)
    
  texture.center = new Vector2(0.5, 0.5);
  texture.rotation = Math.PI;
  texture.flipY = false;
  return (
    <mesh {...meshProps}>
      <sphereBufferGeometry attach="geometry" args={[100, 60, 40]} />
      <meshBasicMaterial attach="material" map={texture} side={BackSide} />
    </mesh>
  )
}