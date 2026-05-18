import { useEffect, useState } from 'react';
import Item from '../common/Item';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('/productos.json')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error("Error cargando productos:", error));
  }, []);

  return (
    <div>
      <h2 style={{ fontFamily: 'sans-serif', color: '#fff', borderBottom: '2px solid #333', paddingBottom: '10px', textTransform: 'uppercase' }}>Merchandising Oficial</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {productos.map(prod => (
          <Item key={prod.id} {...prod} />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;