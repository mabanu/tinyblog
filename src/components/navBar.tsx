import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { NavLink } from 'react-router-dom';
import { Button, ColorPaletteProp, Divider, IconButton, Input } from '@mui/joy';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';

interface IPropColor {
    color: ColorPaletteProp;
    onPropColor: (prop: ColorPaletteProp) => void;
}

function NavBar(props: IPropColor) {
    const [index, setIndex] = React.useState(0);

    return (
        <Box>
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
                    <img alt="" src="/static/branding/pricing/block-green.svg" />
                </IconButton>
                <Divider orientation="vertical" />
                <IconButton variant="plain">
                    <FacebookRoundedIcon />
                </IconButton>
                <IconButton variant="plain">
                    <GitHubIcon />
                </IconButton>
                <Input
                    variant="soft"
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    endDecorator={
                        <Button variant="soft" aria-label="subscribe">
                            <SendIcon />
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
