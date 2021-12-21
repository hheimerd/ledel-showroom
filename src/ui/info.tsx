import ClickAwayListener from '@mui/base/ClickAwayListener/ClickAwayListener'
import { useState } from 'react'
import infoImage from '../img/info.png'

export function Info() {
  const [infoIsVisible, setInfoIsVisible] = useState(true)

  return (
    !infoIsVisible
      ?
      <div className="info-button" onClick={() => setInfoIsVisible(true)}>
        <img src={infoImage} alt="Get info" />
      </div>
      :
      <ClickAwayListener onClickAway={() => setInfoIsVisible(false)} >
        <div className="welcome-popup">
          <div style={{ position: 'relative' }}>
            <div className="close" onClick={() => setInfoIsVisible(false)}>
              &times;
            </div>
          </div>
          <h3>Добро пожаловать в виртуальный шоурум LEDEL.</h3>
          <p>Здесь вы можете увидеть основные характеристики светильника
            и понять его реальные размеры. Мы разбили все светильники
            по сферам применения: 1 комната - 1 сфера.</p>

          <p>Перемещение как в картах, двигайтесь по стрелкам. Нажимайте
            на двери, чтобы попасть в комнату. Кликайте
            на стенд, чтобы узнать о светильнике больше.</p>

          <p>В левом верхнем углу доступно общее меню. Кликните
            на него для быстрого перехода в нужную комнату</p>
        </div>
      </ClickAwayListener>
  )
}