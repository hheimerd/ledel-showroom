import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import Navigation from './ui/navigation';
import './slider.css';
import './index.css';
import infoImage from './img/info.png'

const initialValue = {
  camera: {
    positionIdx: 0,
    rotation: 0,
  }
}

export const CameraContext = React.createContext(initialValue)

function App() {
  const [infoIsVisible, setInfoIsVisible] = useState(true)

  return (
    <>
      <CameraContext.Provider value={initialValue}>
        {
          !infoIsVisible 
          ? 
            <div className="info-button" onClick={() => setInfoIsVisible(true)}>
              <img src={infoImage} alt="Get info"/>
            </div>
          :
          <div className="welcome-popup">
            <div style={{ position: 'relative' }}>
              <div className="close" onClick={() => setInfoIsVisible(false)}>
                &times;
              </div>
            </div>
            <h3>Добро пожаловать в виртуальный шоурум LEDEL.</h3><br/>
            <p>Здесь вы можете увидеть основные характеристики светильника
            и понять его реальные размеры. Мы разбили все светильники 
            по сферам применения: 1 комната - 1 сфера.</p>

            <p>Перемещение как в картах, двигайтесь по стрелочкам. Нажимайте
            на шайбы на дверях, чтобы попасть в комнату. Кликайте 
            на шайбу возле стенда, чтобы узнать о светильнике больше.</p>

            <p>В левом верхнем углу доступно общее меню. Кликните
            на него для быстрого перехода в нужную комнату</p>
          </div>
        }
        
        <BrowserRouter>
          <Navigation/>
          <Routes>
            {
              ROUTES.map((route) => (
                <Route key={route.name} path={route.name} element={route.component} />
              ))
            }
          </Routes>
        </BrowserRouter>
      </CameraContext.Provider>

    </>
  );
}

export default App;

