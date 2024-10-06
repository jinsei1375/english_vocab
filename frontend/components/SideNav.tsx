import React, { useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Box, ListItemButton } from '@mui/material';
import Link from 'next/link';
import SideNavLink from './SideNavLink';

const drawerWidth = 240;
const headerHeight = 64; // ヘッダーの高さを指定

interface SideNavProps {
	drawerOpen: boolean;
	toggleDrawer: (open: boolean) => void;
	isMdUp: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ drawerOpen, toggleDrawer, isMdUp }) => {
	const drawerContent = (
		<Box>
			<List>
				<SideNavLink href={'/'} text={'ホーム'} icon={''} toggleDrawer={toggleDrawer} />
				<SideNavLink href={'/vocabulary'} text={'単語一覧'} icon={''} toggleDrawer={toggleDrawer} />
			</List>
			<Divider />
			<List>
				<SideNavLink href={'/report'} text={'記録'} icon={''} toggleDrawer={toggleDrawer} />
				<SideNavLink href={'/settings'} text={'設定'} icon={''} toggleDrawer={toggleDrawer} />
			</List>
		</Box>
	);

	return (
		<Drawer
			variant={isMdUp ? 'permanent' : 'temporary'}
			anchor="left"
			open={drawerOpen}
			onClose={() => toggleDrawer(false)}
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
					marginTop: `${headerHeight}px`,
				},
			}}
		>
			{drawerContent}
		</Drawer>
	);
};

export default SideNav;
