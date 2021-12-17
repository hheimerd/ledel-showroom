import { extend, useFrame, useThree } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Vector2 } from "three/src/math/Vector2";
import { Vector3 } from "three/src/math/Vector3";
import { CameraContext } from '../App';
import { USER_HEITHT } from "../pages/base-gallery";

extend({ OrbitControls })

export function Controls(props: { position: Vector3, [key: string]: any }) {
  const { camera, gl } = useThree()
  const ref = useRef<OrbitControls>()

  const cameraConf = useContext(CameraContext)
  const offset = degToVec2(cameraConf.camera.rotation)
  const initial = new Vector3(offset.x * 100, 0, offset.y * 100)
  console.log(initial);
  
  const [prevTarget, setTarget] = useState<Vector3>(initial);

  useEffect(() => {
    if (!ref.current) return;

    if (prevTarget !== props.position) {

      if (!prevTarget) return
      const prevPosition = camera.position;

      const diff = new Vector3().subVectors(prevPosition, prevTarget)
      const newPosition = new Vector3().addVectors(props.position, diff)
      camera.position.set(newPosition.x, newPosition.y, newPosition.z)
      setTarget(props.position)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.position])

  useFrame(() => ref.current?.update())
  return <orbitControls ref={ref} target={props.position}  {...props} args={[camera, gl.domElement]} />
}


const degToRad = (deg: number) => (deg * Math.PI / 180)

function degToVec2(deg: number) {
  const radians = degToRad(deg);
  return new Vector2(Math.cos(radians), (Math.sin(radians)));
}
