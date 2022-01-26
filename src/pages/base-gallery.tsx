import { Suspense, useContext, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei';
import { useNavigate, useLocation } from "react-router-dom";
import { Controls } from '../helpers/controls'
import { VRSphere } from '../helpers/sphere'
import { Vector3 } from 'three/src/math/Vector3';
import { FloorPoint, LinkWall } from '../helpers/geometry';
import { Euler } from 'three/src/math/Euler';
import { PopUp, PopUpProps } from './pop-up';
import { CameraContext } from '../App';
import { ROUTES } from '../routes';
import { Preloader } from '../ui/preloader';

export const USER_HEITHT = 2;

export type TSteps = {
  userPosition: Vector3,
  spherePath: string,
  sphereThumb?: string,
  pointPosition: Vector3,
}

export type T3DLink = {
  position: Vector3,
  path: string,
  rotation?: Euler,
  initRotation?: number,
  initPosition?: number,
}

export type TInfo = {
  position: Vector3,
  popup: PopUpProps,
  rotation?: Euler,
}

export default function BaseGallery(props: {
  steps: TSteps[],
  links?: T3DLink[],
  stands?: TInfo[],
  [key: string]: any
}) {
  const cameraConfig = useContext(CameraContext)

  const [positionIdx, setPositionIdx] = useState<number>(cameraConfig.camera.positionIdx)
  const [popupIdx, setPopupIdx] = useState<number>(-1)
  const nav = useNavigate();
  const position = props.steps[positionIdx].userPosition.clone();

  const spherePath = props.steps[positionIdx].spherePath;
  const sphereThumb = props.steps[positionIdx].sphereThumb;
  
  let startPosition = new Vector3(100, 0, 0)

  const location = useLocation();
  const currentRoute = ROUTES.find(r => r.name === location.pathname);
  if (cameraConfig.camera.rotation === undefined)
    cameraConfig.camera.rotation = currentRoute?.defaultCameraRotation ?? 0;
  console.log(cameraConfig.camera.rotation);
    

  const floorPoints = useMemo(() => (
    props.steps.map((st, i) => (
      <FloorPoint onClick={() => setPositionIdx(i)} position={st.pointPosition.clone()} key={i} />
    ))
  ), [props.steps])

  const canvasRef = useRef<HTMLCanvasElement>()

  const linkPoints = useMemo(() => (
    props.links?.map((link, i) => {
      const location = ROUTES.find(r => r.name === link.path)

      return (
      <LinkWall
        onClick={() => {
          cameraConfig.camera.rotation = link.initRotation ?? undefined
          cameraConfig.camera.positionIdx = link.initPosition ?? 0
          nav(link.path);
        }}
        scale={new Vector3(2.3, 4, .1)}
        rotation={link.rotation || new Euler(0, 0, 0)}
        text={`Нажмите, чтобы перейти в <b>${location?.label ?? 'эту локацию'}</b>`}
        position={link.position.clone()}
        key={i}
      />
    )})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [props.links])

  const infoPoints = useMemo(() => (
    props.stands?.map((link, i) => (
      <LinkWall
        onClick={() => setPopupIdx(i)}
        rotation={link.rotation || new Euler(0, 0, 0)}
        position={link.position.clone()}
        text="Нажмите на стенд, чтобы узнать о светильнике больше"
        key={i}
      />
    ))
  ), [props.stands])

  const { progress } = useProgress()
  return (
    <>
      {popupIdx >= 0 && props.stands?.[popupIdx] &&
        <PopUp 
          key={props.stands[popupIdx].popup.title}
          {...props.stands[popupIdx].popup as PopUpProps}
          close={() => setPopupIdx(-1)} 
          />
      }
      <Preloader progress={progress}  />
      
      <Canvas ref={canvasRef as any} shadows={true}>
        <ambientLight rotation={[1,1,1]} position={[0, 10, 0]} intensity={3} color={'white'} />
        <Controls canvasRef={canvasRef} enableZoom={false} position={position} enableDamping maxDistance={.01} dampingFactor={0.3} initPosition={startPosition} />
        <Suspense fallback={
          <Suspense fallback={null}>
            { sphereThumb && <VRSphere texturePath={sphereThumb} position={position} /> }
          </Suspense>
        }>
          <VRSphere texturePath={spherePath} position={position} />
        </Suspense>
        
        <Suspense fallback={null}>
          {infoPoints}
          {floorPoints}
          {linkPoints}
          {props.children}
        </Suspense>
      </Canvas>
    </>
  )
}
