'use client';

import { Drawer } from '@mui/material';

interface SpDrawerProps {
	drawerOpen: boolean;
	toggleDrawer: (open: boolean) => void;
	drawerContent: React.JSX.Element;
}

export default function SpDrawer({ drawerOpen, toggleDrawer, drawerContent }: SpDrawerProps) {
	return (
		<Drawer
			variant="temporary"
			anchor="left"
			open={drawerOpen}
			onClose={() => toggleDrawer(false)}
			sx={{
				display: { xs: 'block', md: 'none' }, // mdサイズ未満で表示
				'& .MuiDrawer-paper': {
					width: 240,
					boxSizing: 'border-box',
				},
			}}
		>
			{drawerContent}
		</Drawer>
	);
}
