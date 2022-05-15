import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

import {fireApp, db} from './scripts/firebaseInit';
import {fireDebug} from "./config";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);