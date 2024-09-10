'use client';

import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSession, signIn, signOut } from 'next-auth/react';

const SessionButtons: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <Button color="inherit" onClick={() => signIn('google')}>
          Googleでログイン
        </Button>
      ) : (
        <>
          <Typography variant="body1" style={{ marginRight: '1rem' }}>
            {session.user?.name}
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
