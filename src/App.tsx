import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import Burger from './ui/burger';
import './slider.css';
import './index.css';

import { PopUp } from './pages/pop-up';
import { PROM_PAGES } from './pages/prom/pages';


function App() {
  return (
    <>          
      <PopUp { ...PROM_PAGES[0]}/>
      <BrowserRouter>
        <Burger/>
        <Routes>

          <Route  path="/main" element={ROUTES.main.component} />
          <Route  path="/" element={ROUTES.main.component} />
          <Route  path="/prom" element={ROUTES.prom.component} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

