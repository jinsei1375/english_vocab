const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUserSettings(userId: number | null): Promise<Record<string, boolean>> {
	const response = await fetch(`${apiUrl}/api/users/${userId}/settings/display`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (!response.ok) {
		throw new Error('Failed to fetch user settings');
	}
	const data = await response.json();
	return data;
}
