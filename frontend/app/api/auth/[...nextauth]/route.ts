import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			name: string;
			email: string;
		};
	}
}

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async signIn({ profile }) {
			const email = profile?.email;
			const name = profile?.name;
			const google_id = profile?.sub;
			if (!email || !name || !google_id) {
				return false;
			}

			try {
				// バックエンドのAPIエンドポイントにユーザー情報を送信
				const response = await fetch(`${apiUrl}/api/users`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ google_id, name, email }),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
			} catch {
				return false;
			}

			return true;
		},
		async session({ session, token }) {
			if (token?.id && session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24, // 1 day
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
