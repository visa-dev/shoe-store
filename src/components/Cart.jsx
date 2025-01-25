import React, { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';
import { useNavigate } from "react-router-dom";
import ApiService from "../Api/ApiService";
import Swal from "sweetalert2";
const Cart = () => {

  const api = new ApiService();

  // State to manage cart items
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cartItems from localStorage if present
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [jwt,setJwt]= useState("");

  const { clearCart } = useCart();
  const navigater = useNavigate();
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
    setJwt(localStorage.getItem("token"));
  }, [cartItems]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const goToHome = () => {
    navigater('/dashboard');
  }

  const createOrder = async () => {
    const orderId = `ORD-${Date.now()}`;
    const username = localStorage.getItem("username");


    const orderItemList = cartItems.map(item => ({
      orderId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      statu:"Pending"
    }));

    const orderRequest = {
      orderId,
      username,
      orderItemList,
      totalPrice,
      status:"Pending"
    };

    console.log(orderRequest);
    try {
      const response = await api.post("/api/auth/order/create", orderRequest, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log(response);

      if (response.orderId) {
        Swal.fire({
          title: 'Success!',
          text: 'Order placed successfully!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem("cartItems",null)
          window.location.href = '/dashboard';
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Network error. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };


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
                      Rs {item.price * item.quantity}.00
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center mt-4 border-t pt-4">
              <h3 className="text-xl font-semibold text-gray-800">Total:</h3>
              <p className="text-lg font-semibold text-gray-900">Rs {totalPrice}.00</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button onClick={createOrder} className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none">
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
