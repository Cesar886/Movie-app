// src/index.js
import '@mantine/core/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App'; // Correct import for default export
import { Props } from "./utils/props";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Props />
  </React.StrictMode>
);
