import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import SessionButtons from './SessionButtons';

export default async function Header2() {
	const session = await getServerSession();

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton>
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
