import { Word } from '@/types';
import { NextResponse } from 'next/server';

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
export async function addVocabulary(req: Request) {
	try {
		const word: Omit<Word, 'id'> = await req.json();
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
			return [];
		} else {
			console.error('An unknown error occurred');
			return [];
		}
	}
}
