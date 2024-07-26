
// import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import { CssBaseline } from '@mui/material';

// Create a root for the React app
const root = createRoot(document.getElementById('root')!);

// Render the App component
root.render(
  // <React.StrictMode>
    // <CssBaseline />
    <App />
  // </React.StrictMode>
);

