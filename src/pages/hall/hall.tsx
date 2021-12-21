import BaseGallery, { T3DLink, USER_HEITHT } from "../base-gallery";
import sphere1 from '../../spheres/hall/hall_1.png';
import sphere2 from '../../spheres/hall/hall_2.png';
import sphere3 from '../../spheres/hall/hall_3.png';

import t_sphere1 from '../../spheres/hall/thumb/hall_1.png';
import t_sphere2 from '../../spheres/hall/thumb/hall_2.png';
import t_sphere3 from '../../spheres/hall/thumb/hall_3.png';
import { Vector3 } from "three/src/math/Vector3";
import { generateSteps } from "../generators";
import { Box, Html } from "@react-three/drei";

const spheres = [
  sphere1,
  sphere2,
  sphere3,
]

const thumbs = [
  t_sphere1,
  t_sphere2,
  t_sphere3,
]

const steps = generateSteps(spheres, -8, USER_HEITHT, thumbs)


const links = [
  {
    path: '/commercial',
    position: new Vector3(0, 2, 4),
  },
  {
    path: '/architecture',
    initRotation: 180,
    position: new Vector3(0, 2, -4.3),
  },
  {
    path: '/household', 
    initRotation: 180,
    position: new Vector3(-8, 2, 4),
  },
  {
    path: '/street',
    position: new Vector3(-8, 2, -4.3),
  },
  {
    path: '/industrial',
    position: new Vector3(-16, 2, 4),
  },
  {
    path: '/office',
    position: new Vector3(-16, 2, -4.3),
  },
] as T3DLink[]

export default function Hall() {
  return (
    <BaseGallery steps={steps} links={links} />
  )
}