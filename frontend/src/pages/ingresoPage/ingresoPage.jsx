import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ingresoPage.css';

const IngresoPage = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registroData, setRegistroData] = useState({
    name: '',
    departamento: '',
    email: '',
    password: '',
  });

  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/insumos/login', loginData);

      
      console.log('Respuesta completa del servidor:', response);

      // aqui puse la respuesta del servidor
      if (response.data && (response.data.success !== undefined ? response.data.success : response.data) === true) {
        
        navigate('/listado');
      } else {
        // aqui busque dos tipos de alerta
        if (response.data && response.data.message === 'Contraseña incorrecta') {
          
        } else {
          alert('Inicio de sesión fallido. Por favor, verifica tu mail o contraseña.');
        }
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  const handleRegistroSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/insumos/register', registroData);

      console.log('Respuesta del registro:', response.data);

      setRegistroExitoso(true);
      setRegistroData({
        name: '',
        departamento: '',
        email: '',
        password: '',
      });
    } catch (error) {
      console.error('Error en el registro:', error.response.data);
      
    }
  };

  const handleInputChange = (e, formDataSetter) => {
    const { name, value } = e.target;
    formDataSetter((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="ingreso-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input type="email" name="email" value={loginData.email} onChange={(e) => handleInputChange(e, setLoginData)} required />

          <label>Password:</label>
          <input type="password" name="password" value={loginData.password} onChange={(e) => handleInputChange(e, setLoginData)} required />

          <button type="submit">Ingresar</button>
        </form>
      </div>

      <div className="registro-form">
        <h2>Registro</h2>
        <form onSubmit={handleRegistroSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={registroData.name} onChange={(e) => handleInputChange(e, setRegistroData)} required />

          <label>Departamento:</label>
          <input type="text" name="departamento" value={registroData.departamento} onChange={(e) => handleInputChange(e, setRegistroData)} required />

          <label>Email:</label>
          <input type="email" name="email" value={registroData.email} onChange={(e) => handleInputChange(e, setRegistroData)} required />

          <label>Password:</label>
          <input type="password" name="password" value={registroData.password} onChange={(e) => handleInputChange(e, setRegistroData)} required />

          <button type="submit">Registrarse</button>
        </form>
        {registroExitoso && (
          <div className="registro-alert">
            Registro exitoso, ahora puedes ingresar logueándote!!!
          </div>
        )}
      </div>
    </div>
  );
};

export default IngresoPage;
