import './App.css';
import * as React from 'react';
import {CssBaseline} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from './Composants/Dashboard';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f73378',
        },
        secondary: {
            main :'#f50057',
        },
        divider: '#d5bdff',
        background: {
            default: '#1c1828',
            paper: '#211a3a',
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Dashboard/>
        </ThemeProvider>
    );
}

export default App;