import { Suspense, useContext, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Box, PerspectiveCamera } from '@react-three/drei';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Controls } from '../helpers/controls'
import { VRSphere } from '../helpers/sphere'
import { Vector3 } from 'three/src/math/Vector3';
import { FloorPoint, InfoPoint, LinkPoint } from '../helpers/geometry';
import { Euler } from 'three/src/math/Euler';
import { PopUp, PopUpProps } from './pop-up';
import { CameraContext } from '../App';

export const USER_HEITHT = 2;

export type TSteps = {
  userPosition: Vector3,
  spherePath: string,
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
  let startPosition = new Vector3(100, 0, 0)

  const floorPoints = useMemo(() => (
    props.steps.map((st, i) => (
      <FloorPoint onClick={() => setPositionIdx(i)} position={st.pointPosition.clone()} key={i} />
    ))
  ), [props.steps])

  const linkPoints = useMemo(() => (
    props.links?.map((link, i) => (
      <LinkPoint
        onClick={() => {
          cameraConfig.camera.rotation = link.initRotation ?? 0
          cameraConfig.camera.positionIdx = link.initPosition ?? 0
          nav(link.path);
        }}
        rotation={link.rotation || new Euler(0, 0, 0)}
        position={link.position.clone()}
        key={i}
      />
    ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [props.links])

  const infoPoints = useMemo(() => (
    props.stands?.map((link, i) => (
      <InfoPoint
        onClick={() => setPopupIdx(i)}
        rotation={link.rotation || new Euler(0, 0, 0)}
        position={link.position.clone()}
        key={i}
      />
    ))
  ), [props.stands])

  // setSearchParams({ position: '100,0,0' })

  return (
    <>
      {popupIdx >= 0 && props.stands?.[popupIdx] &&
        <PopUp 
          key={props.stands[popupIdx].popup.title}
          {...props.stands[popupIdx].popup as PopUpProps}
          close={() => setPopupIdx(-1)} 
          />
      }
      <Canvas >
        <PerspectiveCamera position={position} />
        <hemisphereLight position={[0, 10, 0]} intensity={.4} color={'white'} castShadow />
        <Controls position={position} enableDamping maxDistance={.01} dampingFactor={0.3} initPosition={startPosition} />
        <Suspense fallback={null}>
          <VRSphere texturePath={spherePath} position={position} />
          {infoPoints}
          {floorPoints}
          {linkPoints}
          {props.children}
        </Suspense>
      </Canvas>
    </>
  )
}
