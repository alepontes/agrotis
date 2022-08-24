import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Logo, Toolbar } from './style';

export default function Nav() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="regular" color="background" >
                <Toolbar>
                    <Logo src="/logo.png" />
                </Toolbar>
            </AppBar>
        </Box>
    );
}