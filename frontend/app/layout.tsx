import '../app/globals.css';
import React from 'react';
import Head from 'next/head';
import { getServerSession } from 'next-auth';
import ClientRootLayout from '@/components/ClientRootLayout';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession();

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
				<ClientRootLayout session={session}>{children}</ClientRootLayout>
			</body>
		</html>
	);
}
