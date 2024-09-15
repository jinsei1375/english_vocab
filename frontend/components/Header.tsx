'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SessionButtons from './SessionButtons';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';

interface HeaderProps {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            English Vocab
          </Link>
        </Typography>
        <SessionProvider>
          <SessionButtons />
        </SessionProvider>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
