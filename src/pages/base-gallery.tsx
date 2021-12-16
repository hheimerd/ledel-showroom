import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Box, PerspectiveCamera } from '@react-three/drei';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Controls } from '../helpers/controls'
import { VRSphere } from '../helpers/sphere'
import { Vector3 } from 'three/src/math/Vector3';
import { FloorPoint, InfoPoint, LinkPoint } from '../helpers/geometry';
import { Euler } from 'three/src/math/Euler';
import { PopUp, PopUpProps } from './pop-up';

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
  initRotation?: number[],
  initPosition?: number,
}

export type IInfo = {
  position: Vector3,
  popup: PopUpProps,
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
  const [searchParams, setSearchParams] = useSearchParams();
  let startPosition = new Vector3(100, 0, 0)

  if (searchParams.has('rotation')) {
    const args = searchParams.get('rotation')?.split(',').map(i => +i)!
    if (args.length === 3)
      startPosition = new Vector3(args[0], args[1], args[2])
    searchParams.delete('rotation')
  }

  if (searchParams.has('rotation')) {
    const initPosition = parseInt(searchParams.get('position')!) || 0;
    if (initPosition !== positionIdx) { 
      setPositionIdx(initPosition)
      searchParams.delete('position')
    }
  }
  

  const floorPoints = useMemo(() => (
    props.steps.map((st, i) => (
      <FloorPoint onClick={() => setPositionIdx(i)} position={st.pointPosition.clone()} key={i} />
    ))
  ), [props.steps])

  const linkPoints = useMemo(() => (
    props.links?.map((link, i) => (
      <LinkPoint
        onClick={() => {
          const query = {} as any
          if (link.initRotation)
            query['rotation'] = link.initRotation.toString()
          if (link.initPosition)
            query['position'] = link.initPosition+''
          nav({pathname: link.path,search: `?${createSearchParams(query)}`});
        }}
        rotation={link.rotation || new Euler(0, 0, 0)}
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
        rotation={link.rotation || new Euler(0, 0, 0)}
        position={link.position.clone()}
        key={i}
      />
    ))
  ), [props.info])

  // setSearchParams({ position: '100,0,0' })

  return (
    <>
      {popupIdx >= 0 &&
        <PopUp key={props.info?.[popupIdx]?.popup.title} {...props.info?.[popupIdx]?.popup as PopUpProps} close={() => setPopupIdx(-1)} />

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
