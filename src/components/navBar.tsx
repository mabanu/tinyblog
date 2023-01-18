import * as React from 'react';
import Box from '@mui/joy/Box';
import { useNavigate } from 'react-router-dom';
import { Button, ColorPaletteProp, Divider, IconButton, Input } from '@mui/joy';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';

interface IPropColor {
    color: ColorPaletteProp;
    onPropColor: (prop: ColorPaletteProp) => void;
}

function NavBar(props: IPropColor) {
    const navigate = useNavigate();

    return (
        <Box sx={{p: 2} }>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                    variant="soft"
                    size="sm"
                    onClick={() => {
                        const colors: ColorPaletteProp[] = [
                            'primary',
                            'neutral',
                            'danger',
                            'info',
                            'success',
                            'warning',
                        ];
                        const nextColor = colors.indexOf(props.color);
                        props.onPropColor(colors[nextColor + 1] ?? colors[0]);
                    }}
                    sx={{ borderRadius: '50%' }}
                >
                    <ColorLensIcon />
                </IconButton>
                <Divider orientation="vertical" />
                <IconButton variant="plain" onClick={() => navigate('/')}>
                    <HomeIcon />
                </IconButton>
                <IconButton variant="plain" onClick={() => navigate('/posts')}>
                    <BookIcon />
                </IconButton>
                <IconButton variant="plain" onClick={() => navigate('/about')}>
                    <InfoIcon />
                </IconButton>
                <Input
                    variant="soft"
                    placeholder="Search"
                    type="search"
                    name="search"
                    endDecorator={
                        <Button variant="soft" aria-label="search">
                            <SearchIcon />
                        </Button>
                    }
                    sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' } }}
                />
            </Box>
            <Divider sx={{ my: 2 }} />
        </Box>
    );
}


export default NavBar;
