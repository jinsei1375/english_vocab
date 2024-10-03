import { getServerSession } from 'next-auth';
import { fetchUser } from '../user/route';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// 単語の取得
export async function fetchReportData() {
	try {
		// セッション情報からユーザーのメールアドレスを取得
		const session = await getServerSession();
		if (!session || !session.user || !session.user.email) {
			throw new Error('User is not authenticated');
		}
		const email = session.user.email;
		const user = await fetchUser(email);
		const userId = user.id;

		const response = await fetch(`${apiUrl}/api/users/${userId}/report`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			console.log('Failed to fetch user reports', response);
			throw new Error('Failed to fetch reports');
		}
		const reports = await response.json();
		return reports;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			return [];
		} else {
			console.error('An unknown error occurred');
			return [];
		}
	}
}
