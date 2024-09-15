'use client';

import React, { useState } from 'react';
import Header from './Header';
import SideNav from './SideNav';

const Layout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <SideNav drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Layout;
