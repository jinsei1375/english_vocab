import '../app/globals.css';
import React from 'react';
import { getServerSession } from 'next-auth';
import ClientRootLayout from '@/components/ClientRootLayout';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession();

	return (
		<html lang="ja" className={roboto.className}>
			<body style={{ background: '#000000' }}>
				<ClientRootLayout session={session}>{children}</ClientRootLayout>
			</body>
		</html>
	);
}
