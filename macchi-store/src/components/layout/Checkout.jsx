import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const [datos, setDatos] = useState({ nombre: '', email: '', telefono: '' });

  const handleInputChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const finalizarCompra = async (e) => {
    e.preventDefault();
    
    // Objeto de la orden que enviaremos a Firebase
    const orden = {
      comprador: datos,
      items: cart,
      total: getTotalPrice(),
      fecha: serverTimestamp()
    };

    try {
      // Creamos la colección 'ordenes' automáticamente
      const ordenesRef = collection(db, "ordenes");
      const docRef = await addDoc(ordenesRef, orden);
      
      // Guardamos el ID para mostrarlo al usuario
      setOrderId(docRef.id);
      
      // Limpiamos el carrito tras el éxito
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden en Firebase:", error);
      alert("Hubo un error al procesar tu compra. Intentá de nuevo.");
    }
  };

  // Si ya tenemos ID, mostramos mensaje de éxito
  if (orderId) {
    return (
      <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>
        <h2>¡Gracias por tu compra, {datos.nombre}! 🤘</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
        <p>En breve nos pondremos en contacto contigo.</p>
      </div>
    );
  }

  // Formulario de Checkout
  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', color: 'white' }}>
      <h2 style={{ fontFamily: 'sans-serif' }}>Finalizar Compra</h2>
      <form onSubmit={finalizarCompra} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input name="nombre" placeholder="Nombre completo" onChange={handleInputChange} required style={{ padding: '10px' }} />
        <input name="email" type="email" placeholder="Email" onChange={handleInputChange} required style={{ padding: '10px' }} />
        <input name="telefono" type="tel" placeholder="Teléfono" onChange={handleInputChange} required style={{ padding: '10px' }} />
        <button type="submit" style={{ backgroundColor: '#c1121f', color: 'white', padding: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          CONFIRMAR PEDIDO
        </button>
      </form>
    </div>
  );
};

export default Checkout;