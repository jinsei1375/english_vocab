import React from 'react';
import { Button, Typography } from '@mui/material';
import { signIn, signOut } from 'next-auth/react';

import { useUser } from '@/components/SessionProviderWrapper';

const SessionButtons: React.FC = () => {
	const { user } = useUser();

	return (
		<>
			{!user ? (
				<Button color="inherit" onClick={() => signIn('google')}>
					Googleでログイン
				</Button>
			) : (
				<>
					<Typography variant="body1" style={{ marginRight: '1rem' }}>
						{user.name}
					</Typography>
					<Button color="inherit" onClick={() => signOut()}>
						ログアウト
					</Button>
				</>
			)}
		</>
	);
};

export default SessionButtons;
