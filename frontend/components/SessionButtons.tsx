'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
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
				<Box display="flex" alignItems="center" gap={2}>
					<Typography>{session.user?.name}</Typography>
					<Button variant="contained" color="primary" onClick={() => signOut()}>
						ログアウト
					</Button>
				</Box>
			) : (
				<Button variant="contained" color="primary" onClick={() => signIn()}>
					ログイン
				</Button>
			)}
		</>
	);
};

export default SessionButtons;
