import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const [comprador, setComprador] = useState({ nombre: '', email: '', telefono: '' });
  const [ordenId, setOrdenId] = useState(null);

  const manejarCambio = (e) => {
    setComprador({
      ...comprador,
      [e.target.name]: e.target.value
    });
  };

  const confirmarCompra = (e) => {
    e.preventDefault();
    
    // Validación básica para que no manden el formulario vacío
    if (!comprador.nombre || !comprador.email || !comprador.telefono) {
      alert("¡Epa! Por favor, completá todos los datos para enviar el pedido 🎸");
      return;
    }

    // Simulamos la creación de un ID de orden único
    const nuevaOrdenId = "GR-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    setOrdenId(nuevaOrdenId);
    clearCart(); // Vaciamos el carrito automáticamente al comprar
  };

  // VISTA 1: Si ya hay una orden generada, mostramos el ticket de éxito
  if (ordenId) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff', maxWidth: '600px', margin: '40px auto', border: '1px solid #333' }}>
        <h2 style={{ color: '#c1121f', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>¡Gracias por tu compra, {comprador.nombre}! 🤘</h2>
        <p style={{ fontSize: '18px', color: '#aaa', marginTop: '20px' }}>Tu pedido ya se está preparando en nuestro taller.</p>
        
        <div style={{ margin: '30px 0', padding: '20px', backgroundColor: '#222', borderRadius: '8px', border: '1px dashed #555' }}>
          <p style={{ margin: 0, fontSize: '16px', color: '#eee' }}>Tu número de seguimiento es:</p>
          <h3 style={{ margin: '10px 0 0 0', fontSize: '28px', color: '#fff', letterSpacing: '2px' }}>{ordenId}</h3>
        </div>

        <Link to="/" style={{ padding: '12px 24px', backgroundColor: '#c1121f', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Volver al Inicio
        </Link>
      </div>
    );
  }

  // VISTA 2: Si el carrito está vacío y trataron de entrar directo al checkout
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff', maxWidth: '600px', margin: '40px auto', border: '1px solid #333' }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <p style={{ color: '#aaa', marginBottom: '30px' }}>Agregá algo de ropa antes de venir a pagar.</p>
        <Link to="/productos" style={{ padding: '12px 24px', backgroundColor: '#c1121f', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  // VISTA 3: El formulario de pago normal
  return (
    <div style={{ padding: '40px', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff', maxWidth: '600px', margin: '40px auto', border: '1px solid #333' }}>
      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', textTransform: 'uppercase', fontFamily: 'sans-serif', textAlign: 'center' }}>
        Completá tu pedido
      </h2>
      
      <form onSubmit={confirmarCompra} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Nombre completo:</label>
          <input 
            type="text" 
            name="nombre"
            value={comprador.nombre}
            onChange={manejarCambio}
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', fontSize: '16px' }}
            placeholder="Ej: JuanSe Macchi"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Correo electrónico:</label>
          <input 
            type="email" 
            name="email"
            value={comprador.email}
            onChange={manejarCambio}
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', fontSize: '16px' }}
            placeholder="tucorreo@email.com"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#aaa' }}>Teléfono:</label>
          <input 
            type="tel" 
            name="telefono"
            value={comprador.telefono}
            onChange={manejarCambio}
            style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', fontSize: '16px' }}
            placeholder="11 1234-5678"
          />
        </div>

        <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '4px', marginTop: '10px', textAlign: 'center', border: '1px solid #444' }}>
          <p style={{ margin: 0, fontSize: '18px', color: '#aaa' }}>Total a pagar:</p>
          <h3 style={{ margin: '5px 0 0 0', fontSize: '28px', color: '#c1121f' }}>${getTotalPrice().toLocaleString('es-AR')}</h3>
        </div>

        <button 
          type="submit"
          style={{ padding: '15px', backgroundColor: '#c1121f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '18px', marginTop: '10px' }}
        >
          Confirmar Compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;