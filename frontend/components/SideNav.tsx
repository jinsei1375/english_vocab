import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 240;
const headerHeight = 64; // ヘッダーの高さを指定

const SideNav: React.FC = () => {
	const drawerContent = (
		<div>
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
			variant="permanent"
			anchor="left"
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
