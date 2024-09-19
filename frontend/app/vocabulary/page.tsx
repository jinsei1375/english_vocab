'use client';
import React, { useEffect, useState } from 'react';
import AddWordDialog from '@/components/AddWordDialog';
import WordList from '@/components/WordList';
import PageTitle from '@/components/PageTitle';
import AddButton from '@/components/AddButton';
import { getSession } from 'next-auth/react';
import { Word } from '@/types';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Vocabulary() {
	const [open, setOpen] = useState(false);
	const [vocabularies, setVocabularies] = useState<Word[]>([]);

	// クライアントサイドでデータをフェッチ
	useEffect(() => {
		const fetchVocabularies = async () => {
			try {
				const session = await getSession();
				if (!session || !session.user || !session.user.email) {
					throw new Error('User is not authenticated');
				}
				const email = session.user.email;

				// ユーザー情報を取得
				const userResponse = await fetch(`${apiUrl}/api/users/me?email=${email}`);
				if (!userResponse.ok) {
					throw new Error('Failed to fetch user information');
				}
				const user = await userResponse.json();
				const userId = user.id;

				// 単語一覧を取得
				const vocabulariesResponse = await fetch(`${apiUrl}/api/vocabularies/${userId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (!vocabulariesResponse.ok) {
					throw new Error('Failed to fetch vocabularies');
				}
				const vocabularies = await vocabulariesResponse.json();
				setVocabularies(vocabularies);
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error('An unknown error occurred');
				}
			}
		};
		fetchVocabularies();
	}, []);

	const handleAddWord = async (newWord: Word) => {
		try {
			const session = await getSession();
			if (!session || !session.user || !session.user.email) {
				console.error('User is not authenticated');
				return;
			}
			const email = session.user.email;

			// ユーザー情報を取得
			const userResponse = await fetch(`${apiUrl}/api/users/me?email=${email}`);
			if (!userResponse.ok) {
				throw new Error('Failed to fetch user information');
			}
			const user = await userResponse.json();
			const userId = user.id;

			// 新しい単語をバックエンドに追加
			const response = await fetch(`${apiUrl}/api/vocabulary/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...newWord, userId }),
			});
			if (!response.ok) {
				throw new Error('Failed to add vocabulary');
			}
			const addedWord = await response.json();

			// 新しい単語をローカルの状態に追加
			setVocabularies([...vocabularies, addedWord]);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('An unknown error occurred');
			}
		}
		setOpen(false);
	};

	return (
		<>
			<PageTitle title="単語一覧" />
			{/* 単語追加 */}
			<AddButton onClick={() => setOpen(true)} label="単語追加" />
			{/* 単語一覧 */}
			{/* ToDo読み込み時はローディング表示 */}
			<WordList words={vocabularies} />
			<AddWordDialog open={open} onClose={() => setOpen(false)} onAddWord={handleAddWord} />
		</>
	);
}
