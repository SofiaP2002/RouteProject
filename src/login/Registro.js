import React, { useState} from 'react'
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import {  useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
export const Registro = () => {
  const [nombre,setNombre]=useState('');
  const [apellido,setApellido]=useState('');
  const [email,setEmail]=useState('');
  const [contrasena,setContrasena]=useState('');
  const [error, setError] = useState({});

  const navegar = useNavigate();

  const alertaError=()=>{
    swal({
      title: "Envío fallido",
      text:"Llene correctamente los campos ",
      icon: "error",
      button:"Aceptar"
    })
  }
  
  const validarForm = (nombre,apellido,email,contrasena) => {
    const errores = {};

    if (nombre.length < 2) {
        errores.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (apellido.length < 2) {
      errores.apellido = 'El apellido debe tener al menos 2 caracteres';
  }

    if (!/\S+@\S+\.\S+/.test(email)) {
        errores.email = 'Email inválido';
    }

    if (contrasena.length < 6) {
        errores.contrasena = 'La contrasena debe tener al menos 6 caracteres';
    }

    

    return errores;
};

  async function submit(e) {
    e.preventDefault();
    const nuevosErrores = validarForm(nombre,apellido,email,contrasena);
        setError(nuevosErrores);
        if (Object.keys(nuevosErrores).length === 0) {
          
          
      
    try {
      const peticion = await fetch("${window.location.origin}/api/ingresarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          email: email,
          contrasena: contrasena
        }),
      });
      const res = await peticion.json();

      if(res.status==='éxito'){
      
        console.log(res);
        navegar('/inicio');
      }
      else{
        alertaError();
      }  
        
  
        
      
      
    } catch (error) {
      console.error('Error al enviar datos ');
    }
  }

  else {
    console.log('Form submission failed due to validation errors.');
}
  }
 

  return (
    <> 
    
    <Container className="mt-5">
          <Row className="justify-content-center">
            <Col md={8}>
            <div className="card mt-4 border-primary color-base">
              <div className='card-body text-primary color-base' >
      <h3 className='text-center'>Registro de usuario</h3>
   </div>
              
               
                <div className="card-body">
                  

                  <Form >

                  <Form.Group controlId="nombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="nombre" onChange={(e)=>{setNombre(e.target.value)}} placeholder="Ingresa tu nombre" />
                      {error.nombre && (
                        <span className="error-message">
                            {error.nombre}
                        </span>
                    )}
                    </Form.Group>

                    <Form.Group controlId="apellido">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control type="apellido" onChange={(e)=>{setApellido(e.target.value)}} placeholder="Ingresa tu apellido" />
                      {error.apellido && (
                        <span className="error-message">
                            {error.apellido}
                        </span>
                    )}
                    </Form.Group>

                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Ingresa tu email" />
                      {error.email && (
                        <span className="error-message">
                            {error.email}
                        </span>
                    )}
                    </Form.Group>

                    <Form.Group controlId="password">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control onChange={(e)=>{setContrasena(e.target.value)}} placeholder="La contraseña debe contener al menos 6 caracteres" />
                      {error.contrasena && (
                        <span className="error-message">
                            {error.contrasena }
                        </span>
                    )}
                    </Form.Group>

                    
                    
                    
                  
                    
                    
                  </Form>
                  
                </div>
                <Button className="boton-sig" type='submit' onClick={submit} >
                      Aceptar
                    </Button>
              </div>
              
            </Col>
          </Row>

        </Container>


</>
  )
}
