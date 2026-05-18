import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <Link to="/carrito" style={{ textDecoration: 'none', color: '#eee', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
      🤘 <span style={{ fontWeight: 'bold', backgroundColor: '#c1121f', color: '#fff', padding: '2px 8px', borderRadius: '50%', fontSize: '14px' }}>{totalItems}</span>
    </Link>
  );
};

export default CartWidget;