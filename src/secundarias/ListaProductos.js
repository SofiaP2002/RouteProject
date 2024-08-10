import React, { useRef, useState, useEffect } from 'react'
import Slider from 'react-slick';
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
  
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          /*infinite: true,
          dots: true*/
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
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

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

      const productoAgrupado= listaProductos.reduce((grupo,producto)=>{
        grupo[producto.seccion]=grupo[producto.seccion] || [];
        grupo[producto.seccion].push(producto);
        return grupo;
      },{})
      
  return (
    
 <>
 <div className='card mt-4 border-primary color-base'>
      <div className='card-body text-primary color-base' >
        <h3 className='text-center'>Lista de productos</h3>
     </div>
      </div>
      
 <div className='carousel '>
 
    <Slider {...settings}>
    {Object.keys(productoAgrupado).map(seccion =>(
      <div className='card' key={seccion}>
        <h3 className='text-center text-primary color-base' >{seccion}</h3>
        {productoAgrupado[seccion].map((producto,categoria)=>(
         <div className='card-body' key={categoria}>
          <img src={producto.imagen} alt='' className='w-100'/>
   
        <h6>Nombre: {producto.nombre_producto}</h6>
        <h6>Pasillo: {producto.pasillo}</h6>
      </div>))}
      </div>
    ))}
    </Slider>
    </div>
      </>
    
  
  )
}
