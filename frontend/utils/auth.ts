import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUserId(): Promise<number> {
	const session = await getSession();
	if (!session || !session.user || !session.user.email) {
		throw new Error('User is not authenticated');
	}
	const email = session.user.email;

	// ユーザー情報を取得
	const userResponse = await fetch(`${apiUrl}/api/users?email=${email}`);
	if (!userResponse.ok) {
		throw new Error('Failed to fetch user information');
	}
	const user = await userResponse.json();
	return user.id;
}

export async function getUserIdBySsr(req?: NextApiRequest, res?: NextApiResponse): Promise<number> {
	const session = await getServerSession();
	if (!session || !session.user || !session.user.email) {
		throw new Error('User is not authenticated');
	}
	const email = session.user.email;

	// ユーザー情報を取得
	const userResponse = await fetch(`${apiUrl}/api/users?email=${email}`);
	if (!userResponse.ok) {
		throw new Error('Failed to fetch user information');
	}
	const user = await userResponse.json();
	return user.id;
}
