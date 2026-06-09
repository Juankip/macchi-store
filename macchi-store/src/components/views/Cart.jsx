import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart, removeProduct, getTotalPrice } = useContext(CartContext);

  // Vista 1: Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff', maxWidth: '600px', margin: '40px auto', border: '1px solid #333' }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <p style={{ color: '#aaa', marginBottom: '30px' }}>¡Es hora de sumar algo de rock a tu placard!</p>
        <Link to="/productos" style={{ padding: '12px 24px', backgroundColor: '#c1121f', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  // Vista 2: Si hay productos en el carrito
  return (
    <div style={{ padding: '30px', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff', maxWidth: '800px', margin: '40px auto', border: '1px solid #333' }}>
      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
        Tu Carrito de Compras
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {cart.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#222', padding: '15px', borderRadius: '8px', border: '1px solid #444', flexWrap: 'wrap', gap: '15px' }}>
            
            {/* Imagen y Detalles principales */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img src={item.imagen} alt={item.nombre} style={{ width: '80px', borderRadius: '4px', border: '1px solid #555' }} />
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontFamily: 'sans-serif' }}>{item.nombre}</h3>
                
                {/* Acá mostramos el talle con un color destacado */}
                <p style={{ margin: '0', color: '#aaa', fontSize: '15px' }}>
                  Talle: <strong style={{ color: '#fff', backgroundColor: '#333', padding: '2px 8px', borderRadius: '4px', marginLeft: '5px' }}>{item.talleElegido}</strong>
                </p>
                
                <p style={{ margin: '8px 0 0 0', color: '#c1121f', fontWeight: 'bold', fontSize: '16px' }}>
                  ${item.precio.toLocaleString('es-AR')} <span style={{ color: '#aaa', fontWeight: 'normal', fontSize: '14px' }}>x {item.quantity} un.</span>
                </p>
              </div>
            </div>

            {/* Subtotal y Botón de eliminar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>
                ${(item.precio * item.quantity).toLocaleString('es-AR')}
              </p>
              <button 
                onClick={() => removeProduct(item.id, item.talleElegido)}
                style={{ padding: '8px 12px', backgroundColor: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Eliminar 🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen Final de la compra */}
      <div style={{ marginTop: '30px', borderTop: '2px solid #333', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <h3 style={{ fontSize: '24px', margin: '0', fontFamily: 'sans-serif' }}>
          Total: <span style={{ color: '#c1121f' }}>${getTotalPrice().toLocaleString('es-AR')}</span>
        </h3>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={clearCart} 
            style={{ padding: '12px 20px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            Vaciar Carrito
          </button>
          <Link 
            to="/checkout" 
            style={{ padding: '12px 20px', backgroundColor: '#c1121f', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            Terminar Compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;