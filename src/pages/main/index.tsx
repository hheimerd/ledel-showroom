import BaseGallery, { I3DLink, ISteps, USER_HEITHT } from "../base-gallery";
import sphere1 from '../../spheres/hall/hall_front_1.png';
import sphere2 from '../../spheres/hall/hall_front_2.png';
import sphere3 from '../../spheres/hall/hall_front_3.png';
import { Vector3 } from "three/src/math/Vector3";

const steps = [
  {
    userPosition: new Vector3(0, USER_HEITHT, 0),
    spherePath: sphere1,
    pointPosition: new Vector3(0, 0, 0)
  },
  {
    userPosition: new Vector3(-8, USER_HEITHT, 0),
    spherePath: sphere2,
    pointPosition: new Vector3(-8, 0, 0)
  },
  {
    userPosition: new Vector3(-16, USER_HEITHT, 0),
    spherePath: sphere3,
    pointPosition: new Vector3(-16, 0, 0)
  },
] as ISteps[]


const links = [
  {
    path: 'prom',
    position: new Vector3(0, 2, 4),
  },
  {
    path: '',
    position: new Vector3(-8, 2, 4),
  },
  {
    path: '',
    position: new Vector3(-16, 2, 4),
  },
  {
    path: '',
    position: new Vector3(0, 2, -4),
  },
  {
    path: '',
    position: new Vector3(-8, 2, -4),
  },
  {
    path: '',
    position: new Vector3(-16, 2, -4),
  },
] as I3DLink[]

export default function Main() {
  return (
    <BaseGallery steps={steps} links={links} />
  )
}