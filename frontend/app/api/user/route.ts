import { getUserId, getUserIdBySsr } from '@/utils/auth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUser(email: string) {
	const response = await fetch(`${apiUrl}/api/users?email=${email}`);
	if (!response.ok) {
		throw new Error('Failed to fetch user information');
	}
	const user = await response.json();
	return user;
}

export async function getTestHistories() {
	try {
		const userId = await getUserIdBySsr();
		const response = await fetch(`${apiUrl}/api/users/${userId}/testHistory`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch test histories');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching test histories:', error);
	}
}

export async function getTestHistory(testHistoryId: number) {
	try {
		const userId = await getUserIdBySsr();
		const response = await fetch(`${apiUrl}/api/users/${userId}/testHistory/${testHistoryId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch test history');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching test history:', error);
	}
}
