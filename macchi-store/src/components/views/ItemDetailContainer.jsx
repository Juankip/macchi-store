import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const productoMock = { id: Number(id), nombre: "Remera de Rock Seleccionada", precio: 25000 };

  return (
    <div style={{ backgroundColor: '#222', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
      <h2 style={{ fontFamily: 'sans-serif', textTransform: 'uppercase' }}>Detalle del Producto #{id}</h2>
      <p style={{ color: '#aaa', marginBottom: '20px' }}>Estampado en DTF. 100% Algodón.</p>
      <button 
        onClick={() => addToCart(productoMock, 1)}
        style={{ padding: '12px 24px', backgroundColor: '#c1121f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 'bold', textTransform: 'uppercase' }}
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default ItemDetailContainer;