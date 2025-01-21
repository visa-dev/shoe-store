import React, { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';
import { useNavigate } from "react-router-dom";
const Cart = () => {
  // State to manage cart items
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cartItems from localStorage if present
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const {clearCart} = useCart();
  const navigater= useNavigate();
  // Handle quantity change
  const handleQuantityChange = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const goToHome=()=>{
    navigater('/');
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4 mb-4"
                >
                  <div className="flex items-center">
                    <div className="text-lg font-medium text-gray-700">
                      {item.name}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                    >
                      +
                    </button>
                    <span className="text-gray-700 ml-4">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <h3 className="text-xl font-semibold text-gray-800">Total:</h3>
              <p className="text-lg font-semibold text-gray-900">${totalPrice}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button onClick={alert("need to devolop")} className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none">
                Checkout
              </button>
              <button onClick={clearCart} className="w-full md:w-auto bg-black hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none">
                Clear Cart
              </button>
              <button onClick={goToHome} className="w-full md:w-auto bg-green-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md focus:outline-none">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
