import BaseGallery, { T3DLink, USER_HEITHT } from "../base-gallery";
import sphere2 from '../../spheres/architecture/arch_front_2.jpg';
import sphere3 from '../../spheres/architecture/arch_front_3.jpg';
import sphere4 from '../../spheres/architecture/arch_front_4.jpg';
import sphere5 from '../../spheres/architecture/arch_front_5.jpg';

import t_sphere2 from '../../spheres/architecture/thumb/arch_front_2.jpg';
import t_sphere3 from '../../spheres/architecture/thumb/arch_front_3.jpg';
import t_sphere4 from '../../spheres/architecture/thumb/arch_front_4.jpg';
import t_sphere5 from '../../spheres/architecture/thumb/arch_front_5.jpg';

import { Vector3 } from "three/src/math/Vector3";
import { Euler } from "three/src/math/Euler";
import info from "./architecture.json"
import { PopUpProps } from "../pop-up";
import { generateStands, generateSteps } from "../generators";

const stepLength = 5;

const thumbs = [
  t_sphere2,
  t_sphere3,
  t_sphere4,
  t_sphere5,
]

const spheres = [
  sphere2,
  sphere3,
  sphere4,
  sphere5,
] 

const steps = generateSteps(spheres, stepLength, USER_HEITHT, thumbs)

const stands = generateStands(info as unknown as PopUpProps[], stepLength, 2, -3.5, 3)

const links = [
  {
    path: '/',
    initRotation: 270,
    position: new Vector3(-3, 2, 0),
    rotation: new Euler(0, Math.PI / 2, 0) 
  },
] as T3DLink[]

export default function Architecture() {
  return (
    <BaseGallery steps={steps} links={links} stands={stands}/>
  )
}