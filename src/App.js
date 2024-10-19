import React, { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  const [productos, setProductos] = useState([]);
  const [compras, setCompras] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', descripcion: '', precio: 0 });
  //--------------------------------------------
  const [nuevaCompra, setNuevaCompra] = useState({ productoId: '', usuario: '', cantidad: 1 });
  const [nuevaResena, setNuevaResena] = useState({ productoId: '', usuario: '', comentario: '' });
  
  // Obtener todas las compras desde Express
  useEffect(() => {
      axios.get('http://localhost:5001/compras')
          .then(res => setCompras(res.data))
          .catch(err => console.error(err));
  }, []);
  const registrarCompra = () => {
    // Verifica si todos los campos tienen valores correctos
    if (nuevaCompra.productoId && nuevaCompra.usuario && nuevaCompra.cantidad > 0) {
        axios.post('http://localhost:5001/compras', nuevaCompra)
            .then(res => {
                // Actualiza el estado de compras y muestra el resultado
                setCompras([...compras, res.data]);
                console.log('Compra registrada:', res.data);
            })
            .catch(err => {
                console.error('Error al registrar la compra:', err);
            });
    } else {
        console.log("Faltan datos para registrar la compra");
    }
};

const agregarResena = () => {
  // Verifica si todos los campos tienen valores correctos
  if (nuevaResena.productoId && nuevaResena.usuario && nuevaResena.comentario) {
      axios.post('http://localhost:5001/resenas', nuevaResena)
          .then(res => {
              // Actualiza el estado de reseñas y muestra el resultado
              setResenas([...resenas, res.data]);
              console.log('Reseña agregada:', res.data);
          })
          .catch(err => {
              console.error('Error al agregar la reseña:', err);
          });
  } else {
      console.log("Faltan datos para agregar la reseña");
  }
};


  // Registrar una nueva compra
  /*const registrarCompra = () => {
      axios.post('http://localhost:5001/compras', nuevaCompra)
          .then(res => setCompras([...compras, res.data]))
          .catch(err => console.error(err));
  };*/
  
  /*/ Agregar una reseña
  const agregarResena = () => {
      axios.post('http://localhost:5001/resenas', nuevaResena)
          .then(res => setResenas([...resenas, res.data]))
          .catch(err => console.error(err));
  };*/
//--------------------------------------------  


  // Obtener la lista de productos desde Flask
  useEffect(() => {
      axios.get('http://localhost:5000/productos')
          .then(res => setProductos(res.data))
          .catch(err => console.error(err));
  }, []);

  // Manejar la creación de un nuevo producto
  const crearProducto = () => {
      axios.post('http://localhost:5000/productos', nuevoProducto)
          .then(res => setProductos([...productos, res.data]))
          .catch(err => console.error(err));
  };

  return (
    <>
      <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Marketplace de Productos</h1>
          {/* Formulario para agregar nuevos productos */}
          <div className="mb-6">
              <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={nuevoProducto.nombre}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                  className="border p-2 mr-2"
              />
              <input
                  type="text"
                  placeholder="Descripción"
                  value={nuevoProducto.descripcion}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                  className="border p-2 mr-2"
              />
              <input
                  type="number"
                  placeholder="Precio"
                  value={nuevoProducto.precio}
                  onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: Number(e.target.value) })}
                  className="border p-2 mr-2"
              />
              <button
                  onClick={crearProducto}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                  Agregar Producto
              </button>
          </div>

          {/* Listar productos */}
          <h2 className="text-2xl font-bold mb-4">Productos Disponibles</h2>
          <ul>
              {productos.map(producto => (
                  <li key={producto.id} className="border p-4 mb-2">
                      <h3 className="text-xl font-bold">{producto.nombre}</h3>
                      <p>{producto.descripcion}</p>
                      <p className="text-green-500">${producto.precio}</p>
                  </li>
              ))}
          </ul>
      </div>



<div className="mb-6">
    <h2 className="text-2xl font-bold mb-4">Registrar Compra</h2>
    <select
        value={nuevaCompra.productoId}
        onChange={(e) => setNuevaCompra({ ...nuevaCompra, productoId: e.target.value })}
        className="border p-2 mr-2"
    >
        <option value="">Selecciona un producto</option>
        {productos.map(producto => (
            <option key={producto.id} value={producto.id}>
                {producto.nombre}
            </option>
        ))}
    </select>
    <input
        type="text"
        placeholder="Usuario"
        value={nuevaCompra.usuario}
        onChange={(e) => setNuevaCompra({ ...nuevaCompra, usuario: e.target.value })}
        className="border p-2 mr-2"
    />
    <input
        type="number"
        placeholder="Cantidad"
        value={nuevaCompra.cantidad}
        onChange={(e) => setNuevaCompra({ ...nuevaCompra, cantidad: Number(e.target.value) })}
        className="border p-2 mr-2"
    />
    <button
        onClick={registrarCompra}
        className="bg-green-500 text-white px-4 py-2 rounded"
    >
        Registrar Compra
    </button>
</div>




<div className="mb-6">
    <h2 className="text-2xl font-bold mb-4">Agregar Reseña</h2>
    <select
        value={nuevaResena.productoId}
        onChange={(e) => setNuevaResena({ ...nuevaResena, productoId: e.target.value })}
        className="border p-2 mr-2"
    >
        <option value="">Selecciona un producto</option>
        {productos.map(producto => (
            <option key={producto.id} value={producto.id}>
                {producto.nombre}
            </option>
        ))}
    </select>
    <input
        type="text"
        placeholder="Usuario"
        value={nuevaResena.usuario}
        onChange={(e) => setNuevaResena({ ...nuevaResena, usuario: e.target.value })}
        className="border p-2 mr-2"
    />
    <input
        type="text"
        placeholder="Comentario"
        value={nuevaResena.comentario}
        onChange={(e) => setNuevaResena({ ...nuevaResena, comentario: e.target.value })}
        className="border p-2 mr-2"
    />
    <button
        onClick={agregarResena}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
    >
        Agregar Reseña
    </button>
</div>




</>
      
  );
}

export default App;













