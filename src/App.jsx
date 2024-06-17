import React from 'react'
import ReduxSagaCrud from './pages/ReduxSagaCrud'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const theme = createTheme({
    typography: {
      fontFamily: '"Nunito", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
         @font-face {
            font-family: 'Nunito';
            font-style: normal;
            // font-weight: 100!important;
            font-display: swap;
            src: local('Nunito Regular'), local('Nunito-Regular'), 
             url(https://fonts.gstatic.com/s/nunito/v11/XRXV3I6Li01BKofINeaBTMnFcQ.woff2) 
             format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, 
              U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, 
              U+2215, U+FEFF, U+FFFD;
          }
        `,
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReduxSagaCrud />
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App