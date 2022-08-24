import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';

let theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#00725c',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f3f2f1',
    },
    text: {
      primary: '#717b82',
    },
    divider: 'rgba(0,0,0,0.12)',
    shadows: [
      'none',
      'rgba(0, 0, 0, 10.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    ]
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
