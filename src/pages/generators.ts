import { Vector3 } from "three/src/math/Vector3";
import { TInfo as TStand, TSteps } from "./base-gallery";
import { PopUpProps } from "./pop-up";

export function generateSteps(spheres: string[], stepLength: number, userHeitht: number, thumbs?: string[]) {
  const steps = [] as TSteps[];

  for (let i = 0; i < spheres.length; i++) {
    steps.push({
      userPosition: new Vector3(i * stepLength, userHeitht, 0),
      spherePath: spheres[i],
      sphereThumb: thumbs ? thumbs[i] : undefined,
      pointPosition: new Vector3(i * stepLength, 0, 0)
    })
  }
  return steps;
}


export function generateStands(info: PopUpProps[], stepLength: number, heitht: number, distanceLeft: number, distanceRight: number, invertLast = false) {
  const stands = [] as TStand[]

  for (let i = 0; i < info.length; i++) {
    const isEven = i % 2 === 0;
    let distance = isEven ? distanceLeft : distanceRight

    if (invertLast && i === info.length - 1) {
      distance = distanceRight;
    }
    stands.push(
      {
        popup: info[i],
        position: new Vector3(Math.floor(i / 2) * (stepLength), heitht, distance)
      })
  }
  return stands
}