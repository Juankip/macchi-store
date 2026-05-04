import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <Link to="/carrito" style={{ textDecoration: 'none', color: '#5c4d4c', display: 'flex', alignItems: 'center', gap: '5px' }}>
      🛒 <span style={{ fontWeight: 'bold', backgroundColor: '#eaddd7', padding: '2px 8px', borderRadius: '50%' }}>{totalItems}</span>
    </Link>
  );
};

export default CartWidget;