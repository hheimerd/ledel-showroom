import Architecture from "./pages/architecture/architecture";
import Commercial from "./pages/commercial/commercial";
import Hall from "./pages/hall/hall";
import Household from "./pages/household/household";
import Industrial from "./pages/industrial/industrial";
import Office from "./pages/office/office";
import Street from "./pages/street/street";

// INDEX IS ID!
export const ROUTES = [
  {
    name: '/hall',
    component: <Hall />,
    label: 'Холл',
    defaultCameraRotation: 180
  },
  {
    name: '/industrial',
    component: <Industrial />,
    label: 'Промышленное освещение',
    defaultCameraRotation: 180
  },
  {
    name: '/street',
    component: <Street/>,
    label: 'Уличное освещение',
    defaultCameraRotation: 180
  },
  {
    name: '/office',
    component: <Office />,
    label: 'Офисное освещение',
    defaultCameraRotation: 180
  },
  {
    name: '/commercial',
    component: <Commercial/>,
    label: 'Торговое освещение',
    defaultCameraRotation: 180
  },
  {
    name: '/household',
    component: <Household />,
    label: 'Бытовое освещение',
    defaultCameraRotation: 5
  },
  {
    name: '/architecture',
    component: <Architecture />,
    label: 'Архитектурное освещение',
    defaultCameraRotation: 10
  },
]

