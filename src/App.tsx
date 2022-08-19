import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.scss'
import Routes from "./routes";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#16ABF8',
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          sizeMedium: '20px'
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
