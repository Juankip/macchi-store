import { Link, NavLink } from 'react-router-dom';
import CartWidget from '../common/CartWidget';

const Header = () => {
  // Estilo base para los links
  const linkStyle = ({ isActive }) => ({
    textDecoration: 'none',
    color: isActive ? '#c1121f' : '#aaa', // Rojo si está activo, gris si no
    fontFamily: 'sans-serif',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    borderBottom: isActive ? '2px solid #c1121f' : 'none' // Subrayado extra si está activo
  });

  return (
    <header style={{ backgroundColor: '#1a1a1a', padding: '20px 40px', borderBottom: '2px solid #c1121f', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ fontFamily: 'sans-serif', color: '#fff', margin: 0, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '2px' }}>Gen Rockero</h1>
      </Link>
      
      <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0, flexWrap: 'wrap' }}>
          <li><NavLink to="/productos" style={linkStyle}>Todo</NavLink></li>
          <li><NavLink to="/categoria/rock" style={linkStyle}>Rock</NavLink></li>
          <li><NavLink to="/categoria/buzos" style={linkStyle}>Buzos</NavLink></li>
          <li><NavLink to="/categoria/remeras-dama" style={linkStyle}>Dama</NavLink></li>
          <li><NavLink to="/categoria/remeras-sin-mangas" style={linkStyle}>Sin Mangas</NavLink></li>
        </ul>
        
        <CartWidget />
      </nav>
    </header>
  );
};

export default Header;