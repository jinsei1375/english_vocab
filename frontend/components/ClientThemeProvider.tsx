'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import dynamic from 'next/dynamic';

// Layout を動的にインポート
const Layout = dynamic(() => import('./Layout'), { ssr: false });

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#dc004e',
		},
	},
});

const ClientThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Layout />
			{children}
		</ThemeProvider>
	);
};

export default ClientThemeProvider;
