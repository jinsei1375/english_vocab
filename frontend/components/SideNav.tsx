import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';

interface SideNavProps {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const SideNav: React.FC<SideNavProps> = ({ drawerOpen, toggleDrawer }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerContent = (
    <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <Link href="/" passHref>
          <ListItem component="span">
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link href="/vocabulary" passHref>
          <ListItem component="span">
            <ListItemText primary="Vocabulary" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href="/settings" passHref>
          <ListItem component="span">
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>
        <Link href="/profile" passHref>
          <ListItem component="span">
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      sx={{ width: 240, '& .MuiDrawer-paper': { width: 240 } }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default SideNav;
