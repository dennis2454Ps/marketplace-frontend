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
  
  // Obtener todas las compras desde Express node-js
  /*useEffect(() => {
      axios.get('http://localhost:5001/compras')
          .then(res => setCompras(res.data))
          .catch(err => console.error(err));
  }, []);
  */
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
    if (nuevaResena.productoId && nuevaResena.usuario && nuevaResena.comentario) {
        axios.post('http://localhost:5001/resenas', nuevaResena)
            .then(res => {
                console.log('Reseña agregada:', res.data);

                // Después de agregar la reseña, hacemos la solicitud GET para obtener todas las reseñas del servidor
                axios.get(`http://localhost:5001/resenas/${nuevaResena.productoId}`)
                    .then(response => {
                        console.log('Reseñas actualizadas:', response.data);  // Verifica las reseñas cargadas
                        setResenasProducto(response.data);  // Actualizamos el estado con las reseñas del servidor
                    })
                    .catch(err => console.error('Error al cargar reseñas:', err));
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



  const [mostrarModal, setMostrarModal] = useState(false);
  const [resenasProducto, setResenasProducto] = useState([]);

  const abrirModalResenas = (productoId) => {
    axios.get(`http://localhost:5001/resenas/${productoId}`)
        .then(res => {
            console.log('Reseñas cargadas:', res.data);  // Verificar que las reseñas se cargan
            setResenasProducto(res.data);  // Actualizamos el estado con las reseñas
            setMostrarModal(true);  // Mostramos el modal
        })
        .catch(err => console.error(err));
};


// Función para cerrar el modal
const cerrarModal = () => {
    setMostrarModal(false);
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





 {/* Restosdf del código */}

 <h2 className="text-2xl font-bold mb-4">Productos Disponibles</h2>
        <ul>
            {productos.map(producto => (
                <li key={producto.id} className="border p-4 mb-2">
                    <h3 className="text-xl font-bold">{producto.nombre}</h3>
                    <p>{producto.descripcion}</p>
                    <p className="text-green-500">${producto.precio}</p>
                    <button
                        onClick={() => abrirModalResenas(producto.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Ver Reseñas
                    </button>
                </li>
            ))}
        </ul>

        

        {/* Modal de reseñas */}
        {mostrarModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Reseñas del Producto</h2>
            <button onClick={cerrarModal} className="mb-4 text-red-500">Cerrar</button>
            <ul>
                {resenasProducto.length > 0 ? (
                    resenasProducto.map(resena => (
                        <li key={resena.id} className="border p-2 mb-2">
                            <p><strong>Usuario:</strong> {resena.usuario}</p>
                            <p><strong>Comentario:</strong> {resena.comentario}</p>
                        </li>
                    ))
                ) : (
                    <p>No hay reseñas para este producto</p>
                )}
            </ul>
        </div>
    </div>
)}

    




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
    onChange={(e) => {
        console.log('Producto seleccionado:', e.target.value);  // Verifica si el valor del producto se está capturando correctamente
        setNuevaResena({ ...nuevaResena, productoId: e.target.value });
    }}
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
<h2 className="text-2xl font-bold mb-4">Lista de Compras</h2>
<ul>
    {compras.map(compra => (
        <li key={compra.id} className="border p-4 mb-2">
            <p>Producto ID: {compra.productoId}</p>
            <p>Usuario: {compra.usuario}</p>
            <p>Cantidad: {compra.cantidad}</p>
        </li>
    ))}
</ul>



</>
      
  );
}

export default App;













