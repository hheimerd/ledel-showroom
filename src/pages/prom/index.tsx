import BaseGallery, { I3DLink, IInfo, ISteps, USER_HEITHT } from "../base-gallery";
import sphere2 from '../../spheres/prom/prom_back_2.png';
import sphere3 from '../../spheres/prom/prom_back_3.png';
import sphere4 from '../../spheres/prom/prom_back_4.png';
import sphere5 from '../../spheres/prom/prom_back_5.png';
import sphere6 from '../../spheres/prom/prom_back_6.png';
import sphere7 from '../../spheres/prom/prom_back_7.png';

import { Vector3 } from "three/src/math/Vector3";
import { Euler } from "three/src/math/Euler";

import info from "./prom.json"
import { PopUpProps } from "../pop-up";

const stepLength = -3.1;

const spheres = [
  sphere2,
  sphere3,
  sphere4,
  sphere5,
  sphere6,
  sphere7,
]

const steps = [] as ISteps[]

for (let i = 0; i < spheres.length; i++) {
  steps.push(
  {
    userPosition: new Vector3(i * stepLength, USER_HEITHT, 0),
    spherePath: spheres[i],
    pointPosition: new Vector3(i * stepLength, 0, 0)
  })
}

const infoPoints = [] as IInfo[]

for (let i = 0; i < 11; i++) {
  const isEven = i % 2 === 0;
  const distance = isEven ? 3 : -3.2
  infoPoints.push(
  {
    popup: info[i] as PopUpProps,
    position: new Vector3(Math.floor(i / 2) * (stepLength), 2, distance)
  })
}

const links = [
  {
    path: '/',
    initRotation: [0,0,-1],
    position: new Vector3(3, 2, 0),
    rotation: new Euler(0, Math.PI / 2, 0)
  },
] as I3DLink[]

export default function Prom() {
  return (
    <BaseGallery steps={steps} links={links} info={infoPoints} />
  )
}