'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <>
          <button onClick={() => signIn('google')}>Googleでログイン</button>
        </>
      ) : (
        <>
          <p>こんにちは、{session.user?.name}さん</p>
          <button onClick={() => signOut()}>ログアウト</button>
        </>
      )}
    </div>
  );
}
