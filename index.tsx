import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // We'll create this for global styles

// Create root element and render App
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);