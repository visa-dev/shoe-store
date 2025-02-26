import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import App from "./App";
import { Dashboard, Invoices, Form } from "./scenes";
import Cart from "./components/Cart";

import Register from "./scenes/Auth/Register";
import Login from "./scenes/Auth/Login";
import OrderSummary from "./components/OrderSummery";


const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
    
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path="/" element={<PrivateRoute element={<App />} />}>
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/order/summery" element={<PrivateRoute element={<OrderSummary />} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
