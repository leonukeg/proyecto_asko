'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar del localStorage inicial
  useEffect(() => {
    const saved = localStorage.getItem('asko_cart');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCartItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('asko_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (product, size, quantity = 1) => {
    setCartItems(prev => {
      // Verificar si ya existe el mismo producto con la misma talla
      const existingIndex = prev.findIndex(item => item.id === product.id && item.size === size);
      if (existingIndex >= 0) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }
      return [...prev, { ...product, size, quantity }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => {
      if (item.id === productId && item.size === size) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isLoaded
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
