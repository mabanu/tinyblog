import React from 'react';
import * as styles from '@mui/joy/styles';
import { ColorPaletteProp } from '@mui/joy/styles';
import NavBar from './components/navBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostsPage from './components/PostsPage';
import PostPage from './components/PostPage';
import About from './components/About';
import HomePage from './components/HomePage';
import { Sheet } from '@mui/joy';

function RandomColor() {
    const colors: styles.ColorPaletteProp[] = [
        'primary',
        'neutral',
        'danger',
        'info',
        'success',
        'warning',
    ];
    return colors[Math.floor(Math.random() * 6)]
}


function App() {

    const [color, setColor] = React.useState<ColorPaletteProp>(RandomColor);

    const setPropColor = (prop: ColorPaletteProp) => { setColor(prop) }

    return (

        <BrowserRouter>
            <Sheet
                variant="solid"
                color={color}
                invertedColors
                sx={{
                    ...(color !== 'warning' && {
                        bgcolor: `${color}.800`,
                    }),
                    flexGrow: 1,
                    m: -1
                }}
            >
                <NavBar color={color} onPropColor={setPropColor} />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/posts' element={<PostsPage />} />
                    <Route path='/posts/:id' element={<PostPage />} />
                    <Route path='/about' element={<About />} />
                </Routes>
            </Sheet>
        </BrowserRouter>

    );
}

export default App;
