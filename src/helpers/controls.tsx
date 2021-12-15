import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Vector3 } from "three/src/math/Vector3";

extend({ OrbitControls })

export function Controls(props: { position: Vector3, [key: string]:any }) {
  const { camera, gl } = useThree()
  const ref = useRef<OrbitControls>()
  const [prevTarget, setTarget] = useState<Vector3>(new Vector3(100,0,0));

  useEffect(() => {
    if (!ref.current) return;

    if (prevTarget !== props.position) {
      console.log(prevTarget, props.position);

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
