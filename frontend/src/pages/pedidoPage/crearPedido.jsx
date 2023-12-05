import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './crearPedido.css';

const CrearPedido = () => {
  const navigate = useNavigate();

  const [pedidoData, setPedidoData] = useState({
    nombre: '',
    departamento: '',
    fechaSolicitud: '',
    productos: [
      { cantidad: "", nombre: '', medida: '', centimetros: "", urgente: false },
      /* si quiero puedo partir con 2 para obligarlos a tener un minimo de compra,
      debo no dejar parentesis vacios si quiero que quede escrito algo.
      { cantidad: 0, nombre: '', medida: 'cm', centimetros: 0, urgente: false },*/
    ],
  });

  const departamentosPredefinidos = ['Plotter', 'Konica', 'Taller', 'ventas'];
  const productosPredefinidos = ['Adhesivo matte', 'Adhesivo brillante', 'Pvc matte','Pvc brillante','Tinta', 'Sintetico', 'Roller', 'Hojas', 'Sintra', 'Aluminio'];
  const medidasPredefinidas = ['unidades', 'rollos', 'cajas', 'planchas'];
  const centimetrosPredefinidos = [0, 90, 100, 107, 127, 137, 152, 160]

  const handleInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedProductos = [...pedidoData.productos];
      updatedProductos[index][name] = checked;
      setPedidoData({ ...pedidoData, productos: updatedProductos });
    } else {
      setPedidoData({ ...pedidoData, [name]: value });
    }
  };

  const handleProductoInputChange = (e, index) => {
    const { name, value, type, checked } = e.target;

    const updatedProductos = [...pedidoData.productos];
    if (type === 'checkbox') {
      updatedProductos[index][name] = checked;
    } else {
      updatedProductos[index][name] = value;
    }

    setPedidoData({ ...pedidoData, productos: updatedProductos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/insumos/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        alert('Pedido creado exitosamente');
        //le agregue esto para limpiar el formulario
        setPedidoData({
          nombre: '',
          departamento: '',
          fechaSolicitud: '',
          productos: [{ cantidad: 0, nombre: '', medida: 'cm', centimetros: 0, urgente: false }],
        });
        // le puse esto para que me lleve a la pagina de listado
        navigate('/listado');
      } else {
        console.error('Error al crear el pedido');
        
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="crear-pedido-container">
      <Link to="/listado">
      <button className= "botonC" type="submit">Volver</button>
      </Link>
      <h1>Crear Nuevo Pedido</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={pedidoData.nombre} onChange={handleInputChange} required />
        </label>
        <label>
          Departamento:
          <select name="departamento" value={pedidoData.departamento} onChange={handleInputChange} required>
            <option value="" disabled>Selecciona un departamento</option>
            {departamentosPredefinidos.map((departamento) => (
              <option key={departamento} value={departamento}>{departamento}</option>
            ))}
          </select>
        </label>
        <label>
          Fecha de Solicitud:
          <input type="date" name="fechaSolicitud" value={pedidoData.fechaSolicitud} onChange={handleInputChange} required />
        </label>
        <label>
          Productos:
          {pedidoData.productos.map((producto, index) => (
            <div key={index} className="producto-container">
              <label>
                Cantidad:
                <input type="number" name="cantidad" value={producto.cantidad} onChange={(e) => handleProductoInputChange(e, index)} required />
              </label>
              <label>
                Medida:
                <select name="medida" value={producto.medida} onChange={(e) => handleProductoInputChange(e, index)} required>
                  <option value="" disabled>Selecciona una medida</option>
                  {medidasPredefinidas.map((medida) => (
                    <option key={medida} value={medida}>{medida}</option>
                  ))}
                </select>
              </label>
              <label>
                Nombre del Producto:
                <select name="nombre" value={producto.nombre} onChange={(e) => handleProductoInputChange(e, index)} required>
                  <option value="" disabled>Selecciona un producto</option>
                  {productosPredefinidos.map((producto) => (
                    <option key={producto} value={producto}>{producto}</option>
                  ))}
                </select>
              </label>
              <label>
                Tamaño:
                <select name="centimetros" value={producto.centimetros} onChange={(e) => handleProductoInputChange(e, index)} required>
                  <option value="" disabled>tamaño en centimetros</option>
                  {centimetrosPredefinidos.map((producto) => (
                    <option key={producto} value={producto}>{producto}</option>
                  ))}
                </select>
              </label>
              <label className="urgente-label">
                Urgente:
                <input type="checkbox" name="urgente" checked={producto.urgente} onChange={(e) => handleProductoInputChange(e, index)} />
              </label>
            </div>
          ))}
        </label>
            <button className="botonA" type="button" onClick={() => setPedidoData(prevData => ({ ...prevData, productos: [...prevData.productos, { cantidad: 0, nombre: '', medida: 'cm', centimetros: 0, urgente: false }] }))}>
                 Agregar Producto
            </button>
            
          <button className= "botonB" type="submit">Enviar Pedido</button>
       
        
      </form>
    </div>
  );
};

export default CrearPedido;
