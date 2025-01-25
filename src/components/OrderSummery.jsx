import React, { useEffect, useState } from 'react';
import ApiService from '../Api/ApiService';
import Swal from 'sweetalert2';
import { useTheme } from '@mui/material/styles';

const OrderSummary = () => {
  const api = new ApiService();
  const username = localStorage.getItem('username');
  const jwt = localStorage.getItem('token');
  const [orders, setOrders] = useState([]);
  
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark'; // Check if dark mode is active

  const data = {
    username,
  };

  useEffect(() => {
    getOrderByUserName();
  }, [username]);

  const getOrderByUserName = async () => {
    try {
      const response = await api.post('/api/auth/order/summery', data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    
      if (response) {
        setOrders(response);
        console.logre
      } else {
        Swal.fire({
          title: 'Waring!',
          text: 'No Orders',
          icon: 'warning',
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, orderIndex) => (
            order?.orderItemList?.map((item, itemIndex) => (
              <tr key={`${orderIndex}-${itemIndex}`}>
                <td className="px-4 py-2" style={{ color: isDarkMode ? 'blue' : 'black' }}>
                  {item.name}
                </td>
                <td className="px-4 py-2" style={{ color: isDarkMode ? 'blue' : 'black' }}>
                  {item.quantity}
                </td>
                <td className="px-4 py-2" style={{ color: isDarkMode ? 'blue' : 'black' }}>
                  Rs {item.price}
                </td>
                <td className="px-4 py-2" style={{ color: isDarkMode ? 'blue' : 'black' }}>
                  Rs {(item.quantity * item.price).toFixed(2)}
                </td>
                <td className="px-4 py-2" style={{ color: isDarkMode ? 'blue' : 'black' }}>
                 {(item.status)}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummary;
