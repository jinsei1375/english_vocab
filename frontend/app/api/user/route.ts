const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUser(email: string) {
	const response = await fetch(`${apiUrl}/api/users?email=${email}`);
	if (!response.ok) {
		throw new Error('Failed to fetch user information');
	}
	const user = await response.json();
	return user;
}
