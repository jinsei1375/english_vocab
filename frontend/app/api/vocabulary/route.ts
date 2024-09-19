import { Word } from '@/types';
import { getServerSession } from 'next-auth';
import { fetchUser } from '../user/route';
import { useSession } from 'next-auth/react';

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
		const data: Word[] = await response.json();
		return data;
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

// 単語の追加
export async function addVocabulary(word: Omit<Word, 'id'>): Promise<Word> {
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
		const data: Word = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
			throw error; // エラー時には例外を投げる
		} else {
			console.error('An unknown error occurred');
			throw new Error('An unknown error occurred'); // エラー時には例外を投げる
		}
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
			console.log('Failed to fetch user vocabularies', response);
			throw new Error('Failed to fetch vocabularies');
		}
		const vocabularies = await response.json();
		return vocabularies;
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
