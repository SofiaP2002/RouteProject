import React, { useState} from 'react'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import {  Link, useNavigate} from 'react-router-dom';
import Logo from "../img/logo.png";
export const InicioSesion = () => {

  const [email,setEmail]=useState('');
  const [contrasena,setContrasena]=useState('');
  const navegar = useNavigate();


  const alertaError=()=>{
    swal({
      title: "Envío fallido",
      text:"Llene correctamente los campos ",
      icon: "error",
      button:"Aceptar"
    })
  }

  const alertaContrasena=()=>{
    swal({
      title: "Envío fallido",
      text:"Llene correctamente la contraseña ",
      icon: "error",
      button:"Aceptar"
    })
  }

  async function submit(e) {
    e.preventDefault();

    try {
      const peticion = await fetch("${window.location.origin}/api/iniciarSesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,contrasena
        }),
      });
      const res = await peticion.json();
      if(res.status==='éxito'){
      
      navegar('/lista');}
      else{
      if(res.status==='incorrecto'){
        alertaContrasena();
        console.log('Error al enviar datos ');
      }

      else{
        alertaError();
      }
    }

    } catch (error) {
      
      console.error('Error al enviar datos ');
    }
  }
  return (

 
    <>
    
   
    
    <Container className="mt-5">
          <Row className="justify-content-center" >
          
            <Col md={8}>
              <div className="card mt-4 border-primary color-base">
              <div className='card-body text-primary color-base' >
      <h3 className='text-center'>Inicio de Sesión</h3>
   </div>
   <img
          
          src={Logo}
          alt="logo"
        />
                <div className="card-body ">
                  

                  <Form >
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email"onChange={(e)=>{setEmail(e.target.value)}} placeholder="Ingresa tu email" />
                    </Form.Group>

                    <Form.Group controlId="password">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control type="password" onChange={(e)=>{setContrasena(e.target.value)}}placeholder="Ingresa tu contraseña" />
                    </Form.Group>

                    
                    
                    
                    
                    
                    
                  </Form>
                  
                </div>
                <Button className="boton" type='submit' onClick={submit}>
                      Iniciar Sesión
                    </Button>
                < Link to="/registro" >Registrar</Link>
                    
              </div>
            </Col>
          </Row>

        </Container>
        
        
</>
  )
}
