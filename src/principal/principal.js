import React from 'react'
import { Route, Routes} from 'react-router-dom'
import { InicioSesion } from '../login/InicioSesion'
import { Registro } from '../login/Registro'
import { ListaProductos } from '../secundarias/ListaProductos'
export const principal = () => {
  return (
    <>
            
    <Routes>
      <Route path="/inicio" element={<InicioSesion/>}>
      </Route>
      <Route path="/registro" element={<Registro/>}>
      <Route path="/lista" element={<ListaProductos/>}></Route>
     </Route>
      </Routes>
      
        </>
  )
}