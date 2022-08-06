import React, { useMemo, useReducer } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.scss'
import Routes from "./routes";
import { LocalDataContext } from './core/context';
import localDataReducer from './core/reducers/localData';

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

  const [store, dispatch] = useReducer(localDataReducer, {});
  const contextValue = useMemo(() => ({ store, dispatch }), [store, dispatch]);

  return (
    <LocalDataContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </LocalDataContext.Provider>

  );
}

export default App;
