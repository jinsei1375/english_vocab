'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddWordDialog from '@/components/AddWordDialog';
import WordList from '@/components/WordList';
import { useUser } from '@/components/SessionProviderWrapper';

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
	const response = await axios.get<Word[]>(`${apiUrl}/api/vocabularies`);
	return response.data;
}

export default function Vocabulary() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const [open, setOpen] = useState(false);
	const { user } = useUser();
	const [words, setWords] = useState<Word[]>([]);

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
			const response = await axios.post<Word>(`${apiUrl}/api/word/add`, {
				word,
				meaning,
				userId: user.id,
			});

			console.log('Response from backend:', response);

			const data: Word = response.data;
			console.log('新しい単語が登録されました:', data);
			setWords((prevWords) => [...prevWords, data]);
		} catch (error) {
			console.error('単語の登録に失敗しました:', error);
		}
	};

	return (
		<div>
			<p>単語一覧</p>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				単語を追加
			</Button>
			<WordList words={words} />
			<AddWordDialog open={open} onClose={handleClose} onAddWord={handleAddWord} />
		</div>
	);
}
