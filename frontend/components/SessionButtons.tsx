import React from 'react';
import { Button, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';

const SessionButtons: React.FC = () => {
  const { data: session } = useSession();

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
