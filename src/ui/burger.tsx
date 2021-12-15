
import { useState } from 'react';
import '../index.css'
import burgerImage from '../img/burger.svg'
import nextImage from '../img/next.png'
import infoImage from '../img/info.png'
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import ClickAwayListener from '@mui/base/ClickAwayListener';

export default function Burger() {

  const [ navIsOpen, setNavIsOpen ] = useState<boolean>();

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
                  Object.entries(ROUTES).map(([path, route]) => 
                    <li key={path}><Link className={"ll"} to={path}>{route.label}</Link></li>
                  )
                }
              </ul>
              
              <hr/>
              <div className={"ll"}>Активные элементы</div>
              <div>
                <img className={"size"} src={nextImage} alt="next"/>
                <img className={"size"} src={infoImage} alt="info"/>
              </div>
            </div>
          </ClickAwayListener>
        }
      </div>
  )
}