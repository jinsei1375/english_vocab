import '../app/globals.css';
import React from 'react';
import Head from 'next/head';
import { CssBaseline, Box } from '@mui/material';
import SideNav from '@/components/SideNav';
import Header from '@/components/Header';

const drawerWidth = 240;
const headerHeight = 64; // ヘッダーの高さを指定

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
				/>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			</Head>
			<body style={{ background: '#000000' }}>
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
						<Header />
					</Box>
					<Box
						component="nav"
						sx={{
							position: 'fixed',
							top: `${headerHeight}px`,
							left: 0,
							width: `${drawerWidth}px`,
							height: `calc(100% - ${headerHeight}px)`,
							zIndex: 1000, // サイドバーが他の要素の上に表示されるようにする
						}}
					>
						<SideNav />
					</Box>
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							marginLeft: `${drawerWidth}px`,
							marginTop: `${headerHeight}px`,
							padding: 3,
						}}
					>
						{children}
					</Box>
				</Box>
			</body>
		</html>
	);
}
