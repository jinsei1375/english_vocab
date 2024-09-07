'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    router.push('/api/auth/google');
  };

  return (
    <main>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
    </main>
  );
}
