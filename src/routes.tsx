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
    name: '/',
    component: <Hall />,
    label: 'Холл',
    defaultCameraRotation: 180
  },
  {
    name: '/industrial-light',
    component: <Industrial />,
    label: 'Промышленное освещение',
  },
  {
    name: '/street-light',
    component: <Street />,
    label: 'Уличное освещение',
  },
  {
    name: '/office-light',
    component: <Office />,
    label: 'Офисное освещение',
  },
  {
    name: '/trade-light',
    component: <Commercial />,
    label: 'Торговое освещение',
  },
  {
    name: '/home-light',
    component: <Household />,
    label: 'Бытовое освещение',
    defaultCameraRotation: 185
  },
  {
    name: '/architectural-light',
    component: <Architecture />,
    label: 'Архитектурное освещение',
    defaultCameraRotation: 190
  },
]

