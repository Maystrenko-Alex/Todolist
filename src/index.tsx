import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppWithRedux } from './AppWithRedux';

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
<Provider store={store}>
  <ThemeProvider theme={newTheme}>
  <AppWithRedux />
  </ThemeProvider>
</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
