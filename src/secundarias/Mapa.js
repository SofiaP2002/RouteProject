import React, { useEffect, useRef, useState } from 'react'
import {Stage,Layer,Rect,Text} from 'react-konva';
export const Mapa = () => {
    const responsivoRef=useRef(null);
    const [tamaño, setTamaño]= useState({width:0 ,height:0});
    const secciones = [
        { nombre: 'ENTRADA', x: 50, y: 450, width: 100, height: 50 },
        { nombre: 'SALIDA', x: 800, y: 450, width: 100, height: 50 },
        { nombre: 'PLATOS PREPARADOS', x: 50, y: 50, width: 150, height: 50 },
        { nombre: 'PASTELERÍA', x: 200, y: 50, width: 150, height: 50 },
        { nombre: 'PANADERÍA', x: 350, y: 50, width: 150, height: 50 },
        { nombre: 'CARNES', x: 500, y: 50, width: 150, height: 50 },
        { nombre: 'PESCADERÍA', x: 650, y: 50, width: 150, height: 50 },
        { nombre: 'BOTILLERÍA', x: 50, y: 150, width: 100, height: 100 },
        { nombre: 'FIAMBRERÍA', x: 150, y: 150, width: 100, height: 50 },
        { nombre: 'QUESOS', x: 150, y: 200, width: 100, height: 50 },
        { nombre: 'SNACKS', x: 250, y: 150, width: 100, height: 100 },
        { nombre: 'ABARROTES', x: 350, y: 150, width: 100, height: 100 },
        { nombre: 'LÁCTEOS', x: 450, y: 150, width: 100, height: 100 },
        { nombre: 'CONGELADOS', x: 550, y: 150, width: 100, height: 100 },
        { nombre: 'FRUTAS Y VERDURAS', x: 650, y: 150, width: 100, height: 100 },
        { nombre: 'MUNDO SALUDABLE', x: 750, y: 150, width: 100, height: 100 },
        { nombre: 'MENAJE', x: 50, y: 300, width: 100, height: 100 },
        { nombre: 'PERFUMERÍA', x: 150, y: 300, width: 100, height: 100 },
        { nombre: 'AUDIO Y VIDEO', x: 250, y: 300, width: 100, height: 100 },
        { nombre: 'ASEO Y LIMPIEZA', x: 350, y: 300, width: 100, height: 100 },
        { nombre: 'GALLETAS Y CHOCOLATES', x: 450, y: 300, width: 100, height: 100 },
      ];

      useEffect(()=>{
        const actualizarTamano=()=>{
            if(responsivoRef.current){
                setTamaño({
                    width: responsivoRef.current.offsetWidth,
                    height: responsivoRef.current.offsetHeight,
                });
            }
        }
        actualizarTamano();
        window.addEventListener('resize', actualizarTamano);
        return()=>{
            window.removeEventListener('resize',actualizarTamano);
        };
      },[]);
  return (
    <>
    <div className='mapa-container' ref={responsivoRef}>
        <Stage width={tamaño.width} height={tamaño.height}>
         <Layer>
            {secciones.map(seccion=>(
                <React.Fragment key={seccion.nombre}>
                    <Rect x={seccion.x} y={seccion.y} width={seccion.width} height={seccion.height} fill="lightblue" stroke="black" strokeWidth={1}/>
                    <Text x={seccion.x} y={seccion.y} width={seccion.width} height={seccion.height} text={seccion.nombre} align='center' verticalAlign='middle' fontSize={14}/>
                </React.Fragment>
            ))}
         </Layer>
        </Stage>
    </div>
    </>
  )
}
