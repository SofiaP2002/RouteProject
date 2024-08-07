
import './App.css';
import React from 'react';
import { ListaProductos } from './secundarias/ListaProductos';
import { Mapa } from './secundarias/Mapa';
import StoreMap from './secundarias/StoreMap';
import { principal } from './principal/principal';
import { InicioSesion } from './login/InicioSesion';
import { Registro } from './login/Registro';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <InicioSesion/>
            </>
          }
        />
        <Route path="/registro" element={<Registro />} />
        <Route path="/lista" element={<ListaProductos />} />
        <Route path="/inicio" element={<InicioSesion />} />
        <Route path="/mapa" element={<Mapa />} />
         </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
