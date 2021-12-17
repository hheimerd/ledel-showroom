import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import Navigation from './ui/navigation';
import './slider.css';
import './index.css';
import { Vector3 } from 'three/src/math/Vector3';

const initialValue = {
  camera: {
    positionIdx: 0,
    rotation: 0,
  }
}

export const CameraContext = React.createContext(initialValue)

function App() {
  return (
    <>
      <CameraContext.Provider value={initialValue}>
        <BrowserRouter>
          <Navigation/>
          <Routes>
            {
              ROUTES.map((route) => (
                <Route key={route.name} path={route.name} element={route.component} />
              ))
            }
            <Route  path="/" element={ROUTES[0].component} />
          </Routes>
        </BrowserRouter>
      </CameraContext.Provider>

    </>
  );
}

export default App;

