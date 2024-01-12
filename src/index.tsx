import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { mainTheme } from './utils/styles/initTheme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={mainTheme}>
        <App /> 
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
