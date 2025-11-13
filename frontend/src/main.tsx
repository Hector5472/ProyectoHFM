import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, type ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff',
    },
    secondary: {
      main: '#ffb853',
    },
    error: {
      main: '#FA0000',
    },
    success: {
      main: '#00FF00',
    },
    background: {
      default: '#101010',
      paper: '#000000',
    },
  },
};

const theme = createTheme(themeOptions);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
