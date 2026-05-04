import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <h2 style={{ fontFamily: 'serif' }}>Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cart.map((item, index) => (
            <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eaddd7', borderRadius: '4px' }}>
              {item.nombre} - Cantidad: {item.cantidad}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;