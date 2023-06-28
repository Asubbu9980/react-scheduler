import React, {  useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();


const MyTheme = ({children}) => {

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default MyTheme;