import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, teal, yellow } from '@mui/material/colors';
import { dark } from '@mui/material/styles/createPalette';

const newTheme = createTheme({
  palette: {
    primary: {
      main: '#4db6ac',
    },
    secondary: yellow,
    mode: 'light'
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<ThemeProvider theme={newTheme}>
<App />
</ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
