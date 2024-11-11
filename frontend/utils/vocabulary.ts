import { WordType } from '@/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// 覚えたステータス更新
export const updateMemorizedStatus = async (word: WordType) => {
	try {
		const response = await fetch(`${apiUrl}/api/vocabularies/${word.id}/memorized`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ memorized: !word.memorized }),
		});
		if (!response.ok) {
			throw new Error('Failed to update memorized status');
		}
		return await response.json();
	} catch {
		throw new Error('Failed to update memorized status');
	}
};
