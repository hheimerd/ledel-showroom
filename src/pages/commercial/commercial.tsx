import BaseGallery, { T3DLink, USER_HEITHT } from "../base-gallery";
import sphere2 from '../../spheres/commercial/comm_back_2.png';
import sphere3 from '../../spheres/commercial/comm_back_3.png';
import sphere4 from '../../spheres/commercial/comm_back_4.png';

import t_sphere2 from '../../spheres/commercial/thumb/comm_back_2.png';
import t_sphere3 from '../../spheres/commercial/thumb/comm_back_3.png';
import t_sphere4 from '../../spheres/commercial/thumb/comm_back_4.png';

import { Vector3 } from "three/src/math/Vector3";
import { Euler } from "three/src/math/Euler";

import info from "./commercial.json"
import { PopUpProps } from "../pop-up";
import { generateStands, generateSteps } from "../generators";

const stepLength = -6.1;

const spheres = [
  sphere2,
  sphere3,
  sphere4,
]

const thumbs = [
  t_sphere2,
  t_sphere3,
  t_sphere4
]

const steps = generateSteps(spheres, stepLength, USER_HEITHT, thumbs)

const stands = generateStands(info as PopUpProps[], stepLength, 2, 3,-3.6)

const links = [
  {
    path: '/',
    initRotation: 90,
    initPosition: 0,
    position: new Vector3(3, 2, 0),
    rotation: new Euler(0, Math.PI / 2, 0)
  },
] as T3DLink[]

export default function Commercial() {
  return (
    <BaseGallery steps={steps} links={links} stands={stands} />
  )
}