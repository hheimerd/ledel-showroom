import BaseGallery, { T3DLink, USER_HEITHT } from "../base-gallery";
import sphere2 from '../../spheres/household/bit_front_2.png';
import sphere3 from '../../spheres/household/bit_front_3.png';
import sphere4 from '../../spheres/household/bit_front_4.png';
import { Vector3 } from "three/src/math/Vector3";
import { Euler } from "three/src/math/Euler";
import info from "./household.json"
import { PopUpProps } from "../pop-up";
import { generateStands, generateSteps } from "../generators";

const stepLength = 6;

const spheres = [
  sphere2,
  sphere3,
  sphere4,
] 

const steps = generateSteps(spheres, stepLength, USER_HEITHT)

const stands = generateStands(info as unknown as PopUpProps[], stepLength, 2, -3.5, 3)

const links = [
  {
    path: '/',
    initRotation: 90,
    initPosition: 1,
    position: new Vector3(-3, 2, 0),
    rotation: new Euler(0, Math.PI / 2, 0)
  },
] as T3DLink[]

export default function Household() {
  return (
    <BaseGallery steps={steps} links={links} stands={stands} />
  )
}