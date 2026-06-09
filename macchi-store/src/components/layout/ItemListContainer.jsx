import { useEffect, useState } from 'react';
import Item from '../common/Item';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}productos.json`)
      .then(res => res.json())
      .then(data => {
        setProductos(data || []);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error cargando productos:', err);
        setProductos([]);
        setCargando(false);
      });
  }, []);

  if (cargando) return <h2 style={{ color: '#eee', textAlign: 'center' }}>Cargando productos...</h2>;
  if (!productos.length) return <h2 style={{ color: '#eee', textAlign: 'center' }}>No hay productos para mostrar.</h2>;

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', padding: '30px' }}>
      {productos.map(p => (
        <Item key={p.id} id={p.id} nombre={p.nombre} precio={p.precio} imagen={p.imagen} />
      ))}
    </div>
  );
};

export default ItemListContainer;