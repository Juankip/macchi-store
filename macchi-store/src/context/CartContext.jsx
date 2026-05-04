import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, cantidad) => {
    setCart(prev => {
      const itemExiste = prev.find(prod => prod.id === item.id);
      if (itemExiste) {
        return prev.map(prod => 
          prod.id === item.id ? { ...prod, cantidad: prod.cantidad + cantidad } : prod
        );
      }
      return [...prev, { ...item, cantidad }];
    });
  };

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};