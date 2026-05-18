import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase', borderBottom: '2px solid #333', paddingBottom: '10px' }}>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p style={{ color: '#aaa' }}>No agregaste ninguna remera todavía 🎸</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map((item, index) => (
            <li key={index} style={{ marginBottom: '10px', padding: '15px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold', color: '#fff' }}>{item.nombre}</span>
              <span style={{ color: '#aaa' }}>Cantidad: {item.cantidad}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;