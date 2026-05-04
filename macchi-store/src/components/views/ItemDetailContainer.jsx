import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  // Mock de producto para el ejemplo. En un proyecto real, harías un fetch por ID a tu archivo JSON o API.
  const productoMock = { id: Number(id), nombre: "Producto Seleccionado", precio: 15000 };

  return (
    <div>
      <h2 style={{ fontFamily: 'serif' }}>Detalle del Producto #{id}</h2>
      <button 
        onClick={() => addToCart(productoMock, 1)}
        style={{ padding: '10px 20px', backgroundColor: '#eaddd7', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'serif' }}
      >
        Agregar al Carrito
      </button>
    </div>
  );
};

export default ItemDetailContainer;