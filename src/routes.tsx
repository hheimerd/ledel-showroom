import Main from "./pages/main/index";
import Prom from "./pages/prom";

export const ROUTES = {
  'main': {
    component: <Main />,
    label: 'Холл'
  },
  'prom': {
    component: <Prom />,
    label: 'Промышленное освещение'
  },
  'street': {
    component: <></>,
    label: 'Уличное освещение'
  },
  'office': {
    component: <></>,
    label: 'Офисное освещение'
  },
  'comm': {
    component: <></>,
    label: 'Торговое освещение'
  },
  'bit': {
    component: <></>,
    label: 'Бытовое освещение'
  },
  'arch': {
    component: <></>,
    label: 'Архитектурное освещение'
  },
}

