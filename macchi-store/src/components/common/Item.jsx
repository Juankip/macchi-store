import { Link } from 'react-router-dom';

const Item = ({ id, nombre, precio, imagen }) => {
  const precioFormateado = "$" + precio.toLocaleString('es-AR', { minimumFractionDigits: 2 });

  return (
    <div style={{ border: '1px solid #333', padding: '15px', borderRadius: '8px', backgroundColor: '#222', textAlign: 'center', width: '200px' }}>
      <img src={imagen} alt={nombre} style={{ width: '100%', borderRadius: '4px' }} />
      <h3 style={{ fontFamily: 'sans-serif', color: '#eee', fontSize: '18px', margin: '10px 0', textTransform: 'uppercase' }}>{nombre}</h3>
      <p style={{ color: '#aaa', margin: '0 0 15px 0', fontWeight: 'bold' }}>{precioFormateado}</p>
      <Link to={`/producto/${id}`} style={{ backgroundColor: '#c1121f', color: '#fff', padding: '8px 15px', textDecoration: 'none', borderRadius: '4px', fontFamily: 'sans-serif', fontWeight: 'bold', display: 'inline-block' }}>
        Ver detalle
      </Link>
    </div>
  );
};

export default Item;