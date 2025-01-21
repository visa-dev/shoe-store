import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Invoices,
  Form,

} from "./scenes";
import Cart from "./components/Cart";
import Requests from "./components/Requests";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/requests" element={<Requests />} />
     
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
