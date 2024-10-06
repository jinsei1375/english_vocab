import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import SessionButtons from './SessionButtons';
import BurgerIcon from './BurgerIcon';

interface HeaderProps {
	toggleDrawer: (open: boolean) => void;
	session: any;
}

export default function Header({ toggleDrawer, session }: HeaderProps) {
	return (
		<AppBar position="static" sx={{ height: '100%' }}>
			<Toolbar>
				<BurgerIcon toggleDrawer={toggleDrawer} />
				<Typography variant="h6" style={{ flexGrow: 1 }}>
					<Link href="/" passHref>
						English Vocab
					</Link>
				</Typography>
				<SessionButtons session={session} />
			</Toolbar>
		</AppBar>
	);
}
