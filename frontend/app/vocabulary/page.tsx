'use client';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddWordDialog from '@/components/AddWordDialog';
import { useUser } from '@/components/SessionProviderWrapper';

export default function Vocabulary() {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const [open, setOpen] = useState(false);
	const { user } = useUser();

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
				body: JSON.stringify({ word, meaning, userId: user.id }), // TODO ログインユーザーのIDを取得する
			});

			console.log('Response from backend:', response);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log('新しい単語が登録されました:', data);
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
			<AddWordDialog open={open} onClose={handleClose} onAddWord={handleAddWord} />
		</div>
	);
}
