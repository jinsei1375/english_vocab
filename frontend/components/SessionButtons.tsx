'use client';

import React from 'react';
import { Button, Typography } from '@mui/material';
import { signIn, signOut } from 'next-auth/react';

interface SessionButtonsProps {
	session: {
		user?: {
			name?: string;
		};
	} | null;
}

const SessionButtons: React.FC<SessionButtonsProps> = ({ session }) => {
	return (
		<>
			{session ? (
				<>
					<Typography>{session.user?.name}</Typography>
					<Button variant="contained" color="primary" onClick={() => signOut()}>
						Sign out
					</Button>
				</>
			) : (
				<Button variant="contained" color="primary" onClick={() => signIn()}>
					Sign in
				</Button>
			)}
		</>
	);
};

export default SessionButtons;
