import React from 'react';
import './App.css';
import { CssVarsProvider } from '@mui/joy/styles';
import NavBar from './components/navBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostsPage from './components/PostsPage';
import PostPage from './components/PostPage';
import About from './components/About';
import HomePage from './components/HomePage';

function App() {
    return (
        <CssVarsProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/posts' element={<PostsPage />} />
                    <Route path='/posts/:id' element={<PostPage />} />
                    <Route path='/about' element={ <About />} />
                </Routes>
            </BrowserRouter>            
        </CssVarsProvider>
    );
}

export default App;
