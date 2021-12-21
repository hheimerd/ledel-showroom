import BaseGallery, { T3DLink, USER_HEITHT } from "../base-gallery";
import sphere2 from '../../spheres/office/office_back_2.png';
import sphere3 from '../../spheres/office/office_back_3.png';
import sphere4 from '../../spheres/office/office_back_4.png';

import t_sphere2 from '../../spheres/office/thumb/office_back_2.png';
import t_sphere3 from '../../spheres/office/thumb/office_back_3.png';
import t_sphere4 from '../../spheres/office/thumb/office_back_4.png';


import { Vector3 } from "three/src/math/Vector3";
import { Euler } from "three/src/math/Euler";

import info from "./office.json"
import { PopUpProps } from "../pop-up";
import { generateStands, generateSteps } from "../generators";

const stepLength = -6.1;

const spheres = [
  sphere2,
  sphere3,
  sphere4
] 

const thumbs = [
  t_sphere2,
  t_sphere3,
  t_sphere4
]

const steps = generateSteps(spheres, stepLength, USER_HEITHT, thumbs)

const stands = generateStands(info as PopUpProps[], stepLength, 2, 3.2,-3.2, true)

const links = [
  {
    path: '/',
    initRotation: 270,
    initPosition: 2,
    position: new Vector3(3, 2, 0),
    rotation: new Euler(0, Math.PI / 2, 0)
  },
] as T3DLink[]

export default function Office() {
  return (
    <BaseGallery steps={steps} links={links} stands={stands} />
  )
}