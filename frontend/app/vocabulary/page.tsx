'use client';
import React, { useEffect, useState } from 'react';
import WordList from '@/components/WordList';
import PageTitle from '@/components/PageTitle';
import AddButton from '@/components/AddButton';
import { WordType } from '@/types';
import { Alert, Box, CircularProgress, Snackbar } from '@mui/material';
import { getUserId } from '@/utils/auth';
import WordModal from '@/components/WordModal/WordModal';
import WordFormDialog from '@/components/WordFormDialog';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Vocabulary() {
	const [openForm, setOpenForm] = useState(false);
	const [vocabularies, setVocabularies] = useState<WordType[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedWord, setSelectedWord] = useState<WordType | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [flashMessage, setFlashMessage] = useState<string | null>(null);
	const [showDetails, setShowDetails] = useState(false);

	// クライアントサイドでデータをフェッチ
	useEffect(() => {
		const fetchVocabularies = async () => {
			try {
				const userId = await getUserId();

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
				let vocabularies: WordType[] = await vocabulariesResponse.json();
				vocabularies = vocabularies.sort(
					(a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
				);
				setVocabularies(vocabularies);
			} catch (error) {
				if (error instanceof Error) {
					console.error(error.message);
				} else {
					console.error('An unknown error occurred');
				}
			} finally {
				setLoading(false);
			}
		};
		fetchVocabularies();
	}, []);

	// 新しい単語を追加
	const handleAddWord = async (newWord: WordType) => {
		try {
			console.log(newWord);
			const userId = await getUserId();
			const isEdit = newWord.id ? true : false;
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
			setVocabularies([addedWord, ...vocabularies]);
			// フラッシュメッセージを表示
			const message = isEdit ? '単語が更新されました' : '単語が追加されました';
			setFlashMessage(message);
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('An unknown error occurred');
			}
		}
		handleCloseModal();
	};

	// 単語カードをクリック
	const handleCardClick = (word: WordType) => {
		console.log(word);
		setSelectedWord(word);
		setModalOpen(true);
	};

	// 覚えたボタンをクリック
	const handleMemorizedClick = async (word: WordType) => {
		try {
			const response = await fetch(`${apiUrl}/api/vocabulary/memorized`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: word.id, memorized: !word.memorized }),
			});
			if (!response.ok) {
				throw new Error('Failed to update memorized status');
			}
			const updatedWord = await response.json();

			// 更新された単語をローカルの状態に反映
			const updatedVocabularies = vocabularies.map((vocabulary) =>
				vocabulary.id === updatedWord.id ? updatedWord : vocabulary
			);
			setVocabularies(updatedVocabularies);
			setSelectedWord(updatedWord);
			// フラッシュメッセージを表示
			setFlashMessage('覚えたステータスが更新されました');
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error('An unknown error occurred');
			}
		}
	};

	// 編集するボタンクリック
	const handleEditClick = () => {
		setOpenForm(true);
	};

	// モーダルを閉じる
	const handleCloseModal = () => {
		setOpenForm(false);
		setModalOpen(false);
		setSelectedWord(null);
		setShowDetails(false);
	};

	return (
		<>
			<PageTitle title="単語一覧" />
			{/* 単語追加 */}
			<AddButton onClick={() => setOpenForm(true)} label="単語追加" />
			{/* 単語一覧 */}
			{loading ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '50px',
						height: '100vh',
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<WordList words={vocabularies} handleClick={handleCardClick} />
			)}
			<WordFormDialog
				open={openForm}
				onClose={handleCloseModal}
				onAddWord={handleAddWord}
				initialWord={selectedWord}
			/>
			<WordModal
				open={modalOpen}
				onClose={handleCloseModal}
				word={selectedWord}
				setSelectedWord={setSelectedWord}
				handleMemorizedClick={handleMemorizedClick}
				handleEditClick={handleEditClick}
				showDetails={showDetails}
				setShowDetails={setShowDetails}
			/>
			<Snackbar open={!!flashMessage} autoHideDuration={3000} onClose={() => setFlashMessage(null)}>
				<Alert onClose={() => setFlashMessage(null)} severity="success" sx={{ width: '100%' }}>
					{flashMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
