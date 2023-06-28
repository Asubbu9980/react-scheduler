
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
import React from 'react'
import { render } from 'react-dom'

import App from './App'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
const theme = {};
render(

    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  document.getElementById('root')
)  
