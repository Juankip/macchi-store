import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#111', color: '#fff', borderRadius: '8px', border: '1px solid #333', marginTop: '20px' }}>
      <h1 style={{ fontSize: '56px', fontFamily: 'sans-serif', textTransform: 'uppercase', marginBottom: '15px', color: '#c1121f', letterSpacing: '2px' }}>
        Bienvenidos a Gen Rockero
      </h1>
      <p style={{ fontSize: '22px', color: '#aaa', marginBottom: '50px', maxWidth: '700px', margin: '0 auto 50px auto', lineHeight: '1.6' }}>
        El mejor merchandising oficial. Remeras, buzos, musculosas y estampados de alta calidad para llevar tu música a todos lados.
      </p>
      <Link 
        to="/productos" 
        style={{ padding: '18px 36px', backgroundColor: '#c1121f', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}
      >
        Ver Catálogo Completo 🎸
      </Link>
    </div>
  );
};

export default Home;