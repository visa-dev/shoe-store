import React, { createContext, useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const [cartItems, setCartItems] = useState(storedCart);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.some(cartItem => cartItem.id === item.id);

      if (itemExists) {
        Swal.fire({
          title: "Item Present"
        });
        return prevItems;
      }

      const updatedItems = [...prevItems, item];
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      window.location.reload();

      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]); // Clear the cart items state
    localStorage.removeItem('cartItems'); // Remove the cart from localStorage
    Swal.fire({
      title: "Cart Cleared",
      text: "Your cart has been cleared!",
      icon: "success"
    });
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
