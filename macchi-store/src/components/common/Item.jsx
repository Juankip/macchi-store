import { Link } from 'react-router-dom';

const Item = ({ id, nombre, precio, imagen }) => {
  const precioFormateado = "$" + precio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ border: '1px solid #eaddd7', padding: '15px', borderRadius: '8px', backgroundColor: '#faf6f3', textAlign: 'center', width: '200px' }}>
      <img src={imagen} alt={nombre} style={{ width: '100%', borderRadius: '4px' }} />
      <h3 style={{ fontFamily: 'serif', color: '#5c4d4c', fontSize: '18px', margin: '10px 0' }}>{nombre}</h3>
      <p style={{ color: '#8a7977', margin: '0 0 15px 0' }}>{precioFormateado}</p>
      <Link to={`/producto/${id}`} style={{ backgroundColor: '#eaddd7', color: '#5c4d4c', padding: '8px 15px', textDecoration: 'none', borderRadius: '4px', fontFamily: 'serif' }}>
        Ver detalle
      </Link>
    </div>
  );
};

export default Item;