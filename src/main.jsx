import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Router';
import './index.css';
import Footer from './components/Footer';
import Register from './scenes/Auth/Register';
import { Route, Router, Routes } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppRouter />
        <Footer/>
    </React.StrictMode>
);