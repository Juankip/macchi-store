import { Link } from 'react-router-dom';
import CartWidget from '../common/CartWidget';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#1a1a1a', padding: '20px 40px', borderBottom: '2px solid #c1121f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ fontFamily: 'sans-serif', color: '#fff', margin: 0, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '2px' }}>Gen Rockero</h1>
      </Link>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '30px', margin: 0, padding: 0 }}>
          <li><Link to="/" style={{ textDecoration: 'none', color: '#aaa', fontFamily: 'sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Inicio</Link></li>
          <li><Link to="/productos" style={{ textDecoration: 'none', color: '#aaa', fontFamily: 'sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Productos</Link></li>
        </ul>
        <CartWidget />
      </nav>
    </header>
  );
};

export default Header;