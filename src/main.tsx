import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import UseContext from './context/UseContext';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <UseContext>
      <App />
    </UseContext>
  </React.StrictMode>
);
