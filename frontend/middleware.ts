import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

	if (!token) {
		const url = req.nextUrl.clone();
		url.pathname = '/';
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/vocabulary/:path*',
		'/report/:path*',
		'/settings/:path*',
		'/api/vocabularies/:path*',
		'/api/reports/:path*',
		'/api/settings/:path*',
	], // 認証が必要なパスを指定
};
