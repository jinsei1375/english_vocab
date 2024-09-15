'use client';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddWordDialog from '@/components/AddWordDialog';
import WordList from '@/components/WordList';
import PageTitle from '@/components/PageTitle';

interface Word {
	id: number;
	word: string;
	meaning: string;
	partOfSpeech: string;
	pronunciation: string;
	exampleSentence: string;
	synonyms: string;
	antonyms: string;
	url: string;
	memorized: boolean;
}

async function fetchWords(): Promise<Word[]> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const response = await fetch(`${apiUrl}/api/vocabularies`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	});
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	const data = await response.json();
	return data;
}

export default function Vocabulary() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const [open, setOpen] = useState(false);
	const [words, setWords] = useState<Word[]>([]);
	const user = { id: 1, name: 'test', email: '' };

	React.useEffect(() => {
		fetchWords().then(setWords).catch(console.error);
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddWord = async (word: string, meaning: string) => {
		if (!user) {
			console.error('ユーザー情報が取得できませんでした。');
			return;
		}
		try {
			const response = await fetch(`${apiUrl}/api/word/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					word,
					meaning,
					userId: 1,
				}),
			});

			console.log('Response from backend:', response);

			const data: Word = await response.json();
			console.log('新しい単語が登録されました:', data);
			setWords((prevWords) => [...prevWords, data]);
		} catch (error) {
			console.error('単語の登録に失敗しました:', error);
		}
	};

	return (
		<>
			<PageTitle title="単語一覧" />
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				単語を追加
			</Button>
			<WordList words={words} />
			<AddWordDialog open={open} onClose={handleClose} onAddWord={handleAddWord} />
		</>
	);
}
