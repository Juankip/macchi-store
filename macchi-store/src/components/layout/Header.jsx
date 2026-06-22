import { Link } from 'react-router-dom';
import CartWidget from '../common/CartWidget';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#1a1a1a', padding: '20px 40px', borderBottom: '2px solid #c1121f', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ fontFamily: 'sans-serif', color: '#fff', margin: 0, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '2px' }}>Gen Rockero</h1>
      </Link>
      
      <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        {/* LINKS DE CATEGORÍAS */}
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0, flexWrap: 'wrap' }}>
          <li><Link to="/productos" style={{ textDecoration: 'none', color: '#aaa', fontFamily: 'sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Todo</Link></li>
          <li><Link to="/categoria/rock" style={{ textDecoration: 'none', color: '#aaa', fontFamily: 'sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Rock</Link></li>
          <li><Link to="/categoria/buzos" style={{ textDecoration: 'none', color: '#aaa', fontFamily: 'sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Buzos</Link></li>
          <li><Link to="/categoria/remeras-dama" style={{ textDecoration: 'none', color: '#aaa', fontFamily: 'sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Dama</Link></li>
          <li><Link to="/categoria/remeras-sin-mangas" style={{ textDecoration: 'none', color: '#aaa', fontFamily: 'sans-serif', textTransform: 'uppercase', fontWeight: 'bold' }}>Sin Mangas</Link></li>
        </ul>
        
        <CartWidget />
      </nav>
    </header>
  );
};

export default Header;