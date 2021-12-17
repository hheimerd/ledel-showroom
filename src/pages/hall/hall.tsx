import BaseGallery, { T3DLink, TSteps, USER_HEITHT } from "../base-gallery";
import sphere1 from '../../spheres/hall/hall_1.png';
import sphere2 from '../../spheres/hall/hall_2.png';
import sphere3 from '../../spheres/hall/hall_3.png';
import { Vector3 } from "three/src/math/Vector3";
import { generateSteps } from "../generators";

const spheres = [
  sphere1,
  sphere2,
  sphere3,
]
const steps = generateSteps(spheres, -8, USER_HEITHT)


const links = [
  {
    path: 'commercial',
    initRotation: 180,
    position: new Vector3(0, 2, 4),
  },
  {
    path: 'architecture',
    position: new Vector3(0, 2, -4),
  },
  {
    path: 'household', 
    position: new Vector3(-8, 2, 4),
  },
  {
    path: 'street',
    initRotation: 180,
    position: new Vector3(-8, 2, -4),
  },
  {
    path: 'industrial',
    initRotation: 180,
    position: new Vector3(-16, 2, 4),
  },
  {
    path: 'office',
    initRotation: 180,
    position: new Vector3(-16, 2, -4),
  },
] as T3DLink[]

export default function Hall() {
  return (
    <BaseGallery steps={steps} links={links} />
  )
}