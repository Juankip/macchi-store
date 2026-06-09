import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 1. Agregar al carrito (Verificando ID y TALLE para no mezclar)
  const addToCart = (item, quantity) => {
    setCart(prev => {
      // Buscamos si ya existe el MISMO producto con el MISMO talle
      const itemExiste = prev.find(prod => prod.id === item.id && prod.talleElegido === item.talleElegido);
      
      if (itemExiste) {
        return prev.map(prod => 
          (prod.id === item.id && prod.talleElegido === item.talleElegido)
            ? { ...prod, quantity: prod.quantity + quantity } 
            : prod
        );
      }
      // Si no existe, lo agregamos como nuevo
      return [...prev, { ...item, quantity }];
    });
  };

  // 2. Eliminar un producto específico (teniendo en cuenta su ID y su TALLE)
  const removeProduct = (id, talleElegido) => {
    const nuevoCarrito = cart.filter(prod => !(prod.id === id && prod.talleElegido === talleElegido));
    setCart(nuevoCarrito);
  };

  // 3. Vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  // 4. Obtener el precio total de la compra
  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
  };

  // 5. Obtener la cantidad total de items (Ideal para la burbujita roja del menú)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeProduct, clearCart, getTotalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};