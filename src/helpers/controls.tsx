import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useContext, useEffect } from "react";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { clamp } from "three/src/math/MathUtils";
import { Vector2 } from "three/src/math/Vector2";
import { Vector3 } from "three/src/math/Vector3";
import { CameraContext } from '../App';


export function Controls(props: { position: Vector3, [key: string]: any }) {
  const { camera, gl } = useThree()
  const cameraConf = useContext(CameraContext)


  useEffect(() => {
    const offset = degToVec2(cameraConf.camera.rotation);
    const initial = new Vector3(offset.x * 100, 0, offset.y * 100);
    camera.position.set(initial.x, initial.y, initial.z);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraConf.camera.rotation]) 


  function onMouseWheel(e:any) {
    let pCamera = camera as PerspectiveCamera;
    const fovVal = Math.sign(e.deltaY) * 0.02 + pCamera.fov + e.deltaY * 0.2;
    pCamera.fov = clamp(fovVal, 40, 100);
    pCamera.updateProjectionMatrix()
  }

  useEffect(() => {
    props.canvasRef?.current?.addEventListener('wheel', onMouseWheel, { passive: true });
    return () => {
      props.canvasRef?.current?.removeEventListener('wheel', onMouseWheel)
    };
  })

  return <OrbitControls rotateSpeed={-.8} onWheel={onMouseWheel} target={props.position}  {...props} args={[camera, gl.domElement]} />
}


const degToRad = (deg: number) => (deg * Math.PI / 180)

function degToVec2(deg: number) {
  const radians = degToRad(deg);
  return new Vector2(Math.cos(radians), (Math.sin(radians)));
}
