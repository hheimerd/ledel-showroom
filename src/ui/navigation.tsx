
import { useContext, useState } from 'react';
import '../index.css'
import burgerImage from '../img/burger.svg'
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { CameraContext } from '../App';
export default function Navigation() {

  const [ navIsOpen, setNavIsOpen ] = useState<boolean>();
  const cameraConfig = useContext(CameraContext)

  return (
      <div id="map-nav">

        <img style={{ cursor: 'pointer' }} src={burgerImage} alt="" onClick={() => setNavIsOpen(!navIsOpen)} />
        {
          navIsOpen && 
          <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={() => setNavIsOpen(false)}
          >
            <div id="menu-nav">
              <ul>
                {
                  ROUTES.map((route) => 
                    <li key={route.name}><Link className={"ll"} onClick={() => {
                      cameraConfig.camera.rotation = route.defaultCameraRotation ?? 0;
                      cameraConfig.camera.positionIdx = 0;
                    }}to={route.name}>{route.label}</Link></li>
                  )
                }
              </ul>
            </div>
          </ClickAwayListener>
        }
      </div>
  )
}