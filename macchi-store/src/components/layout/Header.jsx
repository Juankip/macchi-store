import { Link } from 'react-router-dom';
import CartWidget from '../common/CartWidget';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#fdfbf7', padding: '20px 40px', borderBottom: '1px solid #eaddd7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ fontFamily: 'serif', color: '#5c4d4c', margin: 0, fontSize: '24px' }}>Macchi</h1>
      </Link>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '30px', margin: 0, padding: 0 }}>
          <li><Link to="/" style={{ textDecoration: 'none', color: '#8a7977', fontFamily: 'serif' }}>Inicio</Link></li>
          <li><Link to="/productos" style={{ textDecoration: 'none', color: '#8a7977', fontFamily: 'serif' }}>Productos</Link></li>
        </ul>
        <CartWidget />
      </nav>
    </header>
  );
};

export default Header;