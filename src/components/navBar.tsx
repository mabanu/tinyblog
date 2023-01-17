import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { NavLink } from 'react-router-dom';

function NavBar() {
    const [index, setIndex] = React.useState(0);
    return (
        <Box
            sx={{
                bgcolor: 'background.body',
                flexGrow: 1,
                m: -3,
                overflowX: 'hidden',
                borderRadius: 'md',
            }}
        >
            <Tabs
                aria-label="Pipeline"
                value={index}
                onChange={(event, value) => setIndex(value as number)}
                sx={{ '--Tabs-gap': '0px' }}
            >
                <TabList
                    variant="plain"
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        mx: 'auto',
                        pt: 2,
                        alignSelf: 'flex-end',
                        [`& .${tabClasses.root}`]: {
                            bgcolor: 'transparent',
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: 'transparent',
                            },
                            [`&.${tabClasses.selected}`]: {
                                color: 'primary.plainColor',
                                fontWeight: 'lg',
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    zIndex: 1,
                                    bottom: '-1px',
                                    left: 'var(--List-item-paddingLeft)',
                                    right: 'var(--List-item-paddingRight)',
                                    height: '3px',
                                    borderTopLeftRadius: '3px',
                                    borderTopRightRadius: '3px',
                                    bgcolor: 'primary.500',
                                },
                            },
                        },
                    }}
                >
                    <NavLink to='/' className='active'>
                        <Tab variant="soft" color={index === 0 ? 'primary' : 'neutral'}>
                            Home {' '}                           
                        </Tab>
                    </NavLink>
                    <NavLink to='/posts'>
                        <Tab>
                            Posts{' '}
                            <Chip
                                size="sm"
                                variant="soft"
                                color={index === 1 ? 'primary' : 'neutral'}
                                sx={{ ml: 1 }}
                            >
                                30
                            </Chip>
                        </Tab>
                    </NavLink>
                    <NavLink to='/about'>
                        <Tab>About{' '}</Tab>
                    </NavLink>
                </TabList>
                
            </Tabs>
        </Box>
    );
}


export default NavBar;
