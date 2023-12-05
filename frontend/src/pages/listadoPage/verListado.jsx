import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './verListado.css';

export const VerListado = (props) => {
  const [materialesList, setMaterialesList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/insumos/pedidos/lista')
      .then(response => response.json())
      .then(data => setMaterialesList(data.reverse()))
      .catch(error => console.error('Error fetching materials:', error));
  }, []);

  const handleEstadoButtonClick = (index, estado, color) => {
    const updatedMaterialesList = [...materialesList];
    updatedMaterialesList[index].pedidoEstado = estado;
    updatedMaterialesList[index].contenedorColor = color;
    setMaterialesList(updatedMaterialesList);
  };

  return (
    <div className="ver-listado-container">
      <header>
        <h1>Estado del Pedido</h1>
        <Link to="/new">
          <button className="hacer-pedido-button">Hacer Pedido</button>
        </Link>
      </header>
      <section className="listado-section">
        <h2>Materiales para Imprenta Digital</h2>
        <div className="pedido-containers">
          {materialesList.map((material, index) => (
            <div key={index} className="material-container" style={{ backgroundColor: material.contenedorColor }}>
              <h3>{material.nombre}</h3>
              <p>Departamento: {material.departamento}</p>
              <p>Fecha de Solicitud: {material.fechaSolicitud}</p>
              {material.productos && material.productos.length > 0 && (
                <div>
                  <p>Productos:</p>
                  <ul>
                    {material.productos.map((producto, prodIndex) => (
                      <li key={prodIndex}>
                        {producto.cantidad} {producto.medida} {producto.nombre} {producto.centimetros + " cm"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                style={{ backgroundColor: "magenta", color: "black" }}
                onClick={() => handleEstadoButtonClick(index, 'cotizando', '#ff00ff')}
                className={`button ${material.pedidoEstado === 'cotizando' && 'selected'}`}
              >
                Cotizando
              </button>
              <button
                style={{ backgroundColor: "cyan", color: "black" }}
                onClick={() => handleEstadoButtonClick(index, 'pagado', '#00ffff')}
                className={`button ${material.pedidoEstado === 'pagado' && 'selected'}`}
              >
                Pagado
              </button>
              <button
                style={{ backgroundColor: "yellow", color: "black" }}
                onClick={() => handleEstadoButtonClick(index, 'viajando', '#ffff00')}
                className={`button ${material.pedidoEstado === 'viajando' && 'selected'}`}
              >
                Transporte
              </button>
              <button
                style={{ backgroundColor: "green", color: "black" }}
                onClick={() => handleEstadoButtonClick(index, 'llego', '#008000')}
                className={`button ${material.pedidoEstado === 'llego' && 'selected'}`}
              >
                Ya llegó
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
