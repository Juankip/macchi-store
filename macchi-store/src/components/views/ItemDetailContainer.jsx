import { useParams, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [talleSeleccionado, setTalleSeleccionado] = useState('');

  // Buscamos el producto exacto en el JSON usando el ID de la URL
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}productos.json`)
      .then(response => response.json())
      .then(data => {
        // Intentamos hacer la búsqueda tolerante a tipos (número/string)
        const prodEncontrado = data.find(p => p.id == id || String(p.id) === String(id));
        console.log('Buscando producto id=', id, 'productos en JSON=', data.length, 'encontrado=', !!prodEncontrado);
        setProducto(prodEncontrado);
        setCargando(false);
      })
      .catch(error => {
        console.error("Error buscando el diseño:", error);
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <h2 style={{ color: '#eee', textAlign: 'center' }}>Cargando diseño... 🎸</h2>;
  }

  if (!producto) {
    return (
      <div style={{ color: '#eee', textAlign: 'center' }}>
        <h2>Uy, no encontramos esta prenda.</h2>
        <p style={{ color: '#aaa' }}>Revisá que la URL contenga el id correcto o volvé al catálogo.</p>
        <div style={{ marginTop: '12px' }}>
          <Link to="/productos" style={{ color: '#c1121f', textDecoration: 'none', fontWeight: 'bold' }}>← Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  const precioFormateado = "$" + producto.precio.toLocaleString('es-AR', { minimumFractionDigits: 2 });

  // Función para validar que haya elegido un talle antes de comprar
  const handleAgregar = () => {
    if (talleSeleccionado === '') {
      alert("¡Epa! Acordate de elegir un talle antes de sumar al carrito 🤘");
      return;
    }
    
    // Le pasamos al carrito el producto con el talle específico
    const productoConTalle = { ...producto, talleElegido: talleSeleccionado };
    addToCart(productoConTalle, 1);
    alert(`¡${producto.nombre} (Talle ${talleSeleccionado}) agregada al carrito!`);
  };

  return (
    <div style={{ backgroundColor: '#222', padding: '40px', borderRadius: '8px', border: '1px solid #333', display: 'flex', gap: '40px', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Lado Izquierdo: Imagen en grande */}
      <div style={{ flex: '1 1 300px' }}>
        <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', borderRadius: '8px', border: '1px solid #444' }} />
      </div>

      {/* Lado Derecho: Detalles, Talle y Compra */}
      <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Link to="/productos" style={{ color: '#aaa', textDecoration: 'none', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold' }}>
          ← Volver al catálogo
        </Link>

        <h2 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', color: '#fff', fontSize: '28px', marginTop: 0 }}>{producto.nombre}</h2>
        <p style={{ color: '#c1121f', fontSize: '24px', fontWeight: 'bold', margin: '10px 0 20px 0' }}>{precioFormateado}</p>
        
        <p style={{ color: '#aaa', marginBottom: '10px' }}>
          Categoría: <span style={{ textTransform: 'capitalize', color: '#eee' }}>{producto.categoria.replace(/-/g, ' ')}</span>
        </p>

        {/* Selector de Talle */}
        <div style={{ marginBottom: '30px', marginTop: '20px' }}>
          <label style={{ display: 'block', color: '#eee', marginBottom: '10px', fontWeight: 'bold' }}>Elegí tu talle:</label>
          <select 
            value={talleSeleccionado} 
            onChange={(e) => setTalleSeleccionado(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', fontSize: '16px', fontFamily: 'sans-serif', cursor: 'pointer' }}
          >
            <option value="" disabled>Seleccioná un talle</option>
            <option value="S">S - Small</option>
            <option value="M">M - Medium</option>
            <option value="L">L - Large</option>
            <option value="XL">XL - Extra Large</option>
            <option value="XXL">XXL - Doble Extra Large</option>
          </select>
        </div>

        <button 
          onClick={handleAgregar}
          style={{ padding: '15px 24px', backgroundColor: '#c1121f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '16px' }}
        >
          Agregar al Carrito 🛒
        </button>
      </div>
    </div>
  );
};

export default ItemDetailContainer;