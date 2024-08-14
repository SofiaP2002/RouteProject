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
   
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          initialSlide: 0,
          slidesToShow: 3,
          slidesToScroll: 3,
          /*infinite: true,
          dots: true*/
        }
      },
      {
        breakpoint: 768,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          slidesToScroll: 1
          
        }
      },
      
    ]
  }

      const fetchProductos = async () => {
        console.log('obteniendo lista')
        const res = await fetch('https://deploy-back-six.vercel.app/api/obtenerProductos');
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
      <div className='card-carousel' key={seccion}>
        <h3 className='text-center color-base' >{seccion}</h3>
        {productoAgrupado[seccion].map((producto,categoria)=>(
         <div className='card-body' key={categoria} >
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
