import React, { useState } from 'react';
import Header from './Header';
import SideNav from './SideNav';
import { getServerSession } from 'next-auth';

export default async function Layout() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const session = await getServerSession();

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setDrawerOpen(open);
	};

	return (
		<>
			<Header toggleDrawer={toggleDrawer} session={session} />
			{/* <SideNav drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} /> */}
		</>
	);
}
