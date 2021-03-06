import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import Navigation from './ui/navigation';
import './slider.css';
import './index.css';
import { Info } from './ui/info';

export type initialValueType = {
  camera: {
    positionIdx: number;
    rotation?: number;
  };
};
const initialValue: initialValueType = {
  camera: {
    positionIdx: 0,
  }
}

export const CameraContext = React.createContext(initialValue)

function App() {

  return (
    <>
      <CameraContext.Provider value={initialValue}>
        <Info />
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

