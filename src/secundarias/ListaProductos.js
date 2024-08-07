import React, { useRef, useState, useEffect } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

export const ListaProductos = () => {
  
  const [listaProductos,setlistaProductos] = useState([]);
  const [productos, setProductos] = useState({
    nombre_producto: '',
    seccion:'',
    pasillo:'',
    imagen:''
  });

  const referenciaBox= useRef(null);

  const [indiceActual, setIndiceActual] = useState(0);

  const siguienteBox= ()=>{
    referenciaBox.current.slickNext();
  }

  const anteriorBox= ()=>{
    referenciaBox.current.slickPrev();
  }

  
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        afterChange: (actual) => setIndiceActual(actual),
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };


      const fetchProductos = async () => {
        console.log('obteniendo lista')
        const res = await fetch('http://localhost:3900/api/obtenerProductos');
        const data = await res.json();
        console.log(data);
        setlistaProductos(data);
    
      };
    
      useEffect(() => {
    
 
        fetchProductos();
      }, []); 
    
      
  return (
    <>
 <div className="container">
      <div className='card mt-4 border-primary color-base'>
      <div className='card-body text-primary color-base' >
        <h3 className='text-center'>Lista de productos</h3>
     </div>
      </div>
      </div>    
   
    <div className="carousel">
      <Slider ref={referenciaBox} {...settings}>
      {listaProductos.map(producto =>(
        <div className='box borde' key={producto._id}>
        <h3>{producto.seccion}:</h3>
        <div className='d-flex mb-3'>
          <div className="d-flex flex-column mb-3">
            <div className="me-auto p-2"><p>{producto.nombre_producto}</p></div>
            <div className="p-2"><p>{producto.imagen}</p></div>
          </div>
          <div className='d-flex justify-content-center '> 
          <div className="d-flex flex-column mb-3">
           <div className="me-auto p-2"><p></p></div>
           <div className="p-2"><p></p></div>
           <div className="p-2"><p>Pasillo: {producto.pasillo} </p></div>
           <div className="p-2"><p>Cantidad: 1 </p></div>
           </div>
         </div>
         
      </div>
      {(indiceActual!==0 &&
      <button onClick={anteriorBox} className="boton-sig">Anterior</button>
      )}  
      {(indiceActual!==7 &&
      <button onClick={siguienteBox} className="boton-sig">Siguiente</button>
      )}
      
          
        </div>))}
       
      </Slider>

      <button  className="boton">Ver Mapa</button>
      
    </div>
    
  </>
  )
}