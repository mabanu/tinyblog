import React from 'react';
import './App.css';
import { CssVarsProvider } from '@mui/joy/styles';
import NavBar from './components/navBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';

function App() {
    return (
        <CssVarsProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<HomePage /> } />
                </Routes>
            </BrowserRouter>            
        </CssVarsProvider>
    );
}

export default App;
