'use client';

import React, { useState } from 'react';
import { CssBaseline, Box, useMediaQuery } from '@mui/material';
import SideNav from '@/components/SideNav';
import Header from '@/components/Header';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;
const headerHeight = 64; // ヘッダーの高さを指定

interface ClientRootLayoutProps {
	children: React.ReactNode;
	session: any;
}

export default function ClientRootLayout({ children, session }: ClientRootLayoutProps) {
	const theme = useTheme();
	const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (open: boolean) => {
		setDrawerOpen(open);
	};

	return (
		<>
			<CssBaseline />
			<Box sx={{ display: 'flex' }}>
				<Box
					component="header"
					sx={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: `${headerHeight}px`,
						zIndex: 1100, // ヘッダーが他の要素の上に表示されるようにする
					}}
				>
					<Header toggleDrawer={toggleDrawer} session={session} />
				</Box>
				<Box
					component="nav"
					sx={{
						position: 'fixed',
						top: `${headerHeight}px`,
						left: 0,
						width: { sm: drawerWidth },
						flexShrink: { sm: 0 },
						height: `calc(100% - ${headerHeight}px)`,
						zIndex: 1000, // サイドバーが他の要素の上に表示されるようにする
					}}
				>
					<SideNav drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} isMdUp={isMdUp} />
				</Box>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						marginLeft: { md: `${drawerWidth}px` }, // mdサイズ以上でマージンを追加
						marginTop: `${headerHeight}px`,
						padding: 3,
					}}
				>
					{children}
				</Box>
			</Box>
		</>
	);
}
