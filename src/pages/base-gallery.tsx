import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Box, PerspectiveCamera } from '@react-three/drei';
import { useNavigate } from "react-router-dom";
import { Controls } from '../helpers/controls'
import { VRSphere } from '../helpers/sphere'
import { Vector3 } from 'three/src/math/Vector3';
import { FloorPoint, InfoPoint, LinkPoint } from '../helpers/geometry';
import { Euler } from 'three/src/math/Euler';

export const USER_HEITHT = 2;

export type ISteps = {
  userPosition: Vector3,
  spherePath: string,
  pointPosition: Vector3,
}

export type I3DLink = {
  position: Vector3,
  path: string,
  rotation?: Euler,
}

export type IInfo = {
  position: Vector3,
  component: JSX.Element,
  rotation?: Euler,
}

export default function BaseGallery(props: {
  steps: ISteps[],
  links?: I3DLink[],
  info?: IInfo[],
  [key: string]: any
}) {

  const [positionIdx, setPositionIdx] = useState<number>(0)
  const [popupIdx, setPopupIdx] = useState<number>(-1)
  const position = props.steps[positionIdx].userPosition.clone();
  const nav = useNavigate();

  const spherePath = props.steps[positionIdx].spherePath;

  const floorPoints = useMemo(() => (
    props.steps.map((st, i) => (
      <FloorPoint onClick={() => setPositionIdx(i)} position={st.pointPosition.clone()} key={i} />
    ))
  ), [props.steps])

  const linkPoints = useMemo(() => (
    props.links?.map((link, i) => (
      <LinkPoint 
        onClick={() => nav(link.path)} 
        rotation={link.rotation || new Euler(0,0,0)} 
        position={link.position.clone()} 
        key={i} 
        />
    ))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [props.links])

  const infoPoints = useMemo(() => (
    props.info?.map((link, i) => (
      <InfoPoint 
        onClick={() => setPopupIdx(i)} 
        rotation={link.rotation || new Euler(0,0,0)} 
        position={link.position.clone()} 
        key={i} 
        />
    ))
  ), [props.info])

 
  return (
    <Canvas >
      <PerspectiveCamera position={position} />
      <hemisphereLight position={[0, 10, 0]} intensity={.4} color={'white'} castShadow /> 
      <Controls position={position} enableDamping maxDistance={.01} dampingFactor={0.3} />
      <Suspense fallback={null}>
        <VRSphere texturePath={spherePath} position={position} />
        {infoPoints}
        {floorPoints}
        {linkPoints}
        {props.children}
      </Suspense>
    </Canvas>
  )
}
