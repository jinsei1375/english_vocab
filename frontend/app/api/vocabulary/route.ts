import { PartOfSpeech, WordType } from '@/types';
import { getServerSession } from 'next-auth';
import { fetchUser } from '../user/route';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// 単語の取得
export async function getAllVocabularies() {
	try {
		const response = await fetch(`${apiUrl}/api/vocabularies`, {
			cache: 'no-store', // ssr
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data: WordType[] = await response.json();
		return data;
	} catch {
		throw new Error('Failed to fetch vocabularies');
	}
}

// 単語の追加
export async function addVocabulary(word: Omit<WordType, 'id'>): Promise<WordType> {
	try {
		const response = await fetch(`${apiUrl}/api/vocabulary/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(word),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data: WordType = await response.json();
		return data;
	} catch {
		throw new Error('Failed to add vocabulary');
	}
}

// 特定ユーザーの単語の取得
export async function getUserVocabularies() {
	try {
		// セッション情報からユーザーのメールアドレスを取得
		const session = await getServerSession();
		if (!session || !session.user || !session.user.email) {
			throw new Error('User is not authenticated');
		}
		const email = session.user.email;

		// バックエンドのAPIエンドポイントにユーザーのメールアドレスを送信してユーザー情報を取得
		const user = await fetchUser(email);
		const userId = user.id;

		const response = await fetch(`${apiUrl}/api/vocabularies/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch vocabularies');
		}
		const vocabularies = await response.json();
		return vocabularies;
	} catch {
		throw new Error('Failed to fetch vocabularies');
	}
}

// 品詞カテゴリの取得
export async function fetchPartOfSpeech(): Promise<PartOfSpeech[]> {
	try {
		const response = await fetch(`${apiUrl}/api/parts-of-speech`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data: PartOfSpeech[] = await response.json();
		return data;
	} catch {
		throw new Error('Failed to fetch part of speech');
	}
}

// 覚えたステータスの更新
export async function updateMemorized(id: number, memorized: boolean): Promise<void> {
	try {
		const response = await fetch(`${apiUrl}/api/vocabulary/update-memorized`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id, memorized }),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
	} catch {
		throw new Error('An unknown error occurred');
	}
}
