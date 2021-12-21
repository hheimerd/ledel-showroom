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
    name: '/industrial',
    component: <Industrial />,
    label: 'Промышленное освещение',
  },
  {
    name: '/street',
    component: <Street/>,
    label: 'Уличное освещение',
  },
  {
    name: '/office',
    component: <Office />,
    label: 'Офисное освещение',
  },
  {
    name: '/commercial',
    component: <Commercial/>,
    label: 'Торговое освещение',
  },
  {
    name: '/household',
    component: <Household />,
    label: 'Бытовое освещение',
    defaultCameraRotation: 185
  },
  {
    name: '/architecture',
    component: <Architecture />,
    label: 'Архитектурное освещение',
    defaultCameraRotation: 190
  },
]

