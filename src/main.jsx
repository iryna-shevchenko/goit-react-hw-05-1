import React from 'react';
import ReactDOM from 'react-dom/client';
// Імпорт ReactRouter
import { BrowserRouter } from 'react-router-dom';
// Import modern-normalize
import 'modern-normalize';
import App from './components/App/App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
