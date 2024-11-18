'use client';

import PageTitle from '@/components/PageTitle';
import WordModal from '@/components/WordModal/WordModal';
import { WordType } from '@/types';
import { getUserId } from '@/utils/auth';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Start() {
	const [testWords, setTestWords] = useState<WordType[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [results, setResults] = useState<{ wordId: number; isCorrect: boolean }[]>([]);
	const [modalOpen, setModalOpen] = useState(true);
	const [showDetails, setShowDetails] = useState(false);
	const [flashMessage, setFlashMessage] = useState<string | null>(null);

	// テスト用の単語を取得
	useEffect(() => {
		const fetchWords = async () => {
			try {
				const userId = await getUserId();
				const response = await fetch(`${apiUrl}/api/users/${userId}/vocabularies/test/`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (!response.ok) {
					throw new Error('Failed to fetch words');
				}
				const words: WordType[] = await response.json();
				setTestWords(words);
			} catch {
				throw new Error('Failed to fetch words');
			}
		};
		fetchWords();
	}, []);

	// テストの回答を処理
	const handleTestAnswer = (isCorrect: boolean) => {
		const newResults = [...results, { wordId: testWords[currentIndex].id!, isCorrect }];
		setResults(newResults);
		setCurrentIndex(currentIndex + 1);
		setShowDetails(false);
		if (currentIndex < 9) {
			setModalOpen(true);
		} else {
			setModalOpen(false);
			saveTestResults(newResults);
			console.log(results);
		}
	};

	const saveTestResults = async (
		results: {
			wordId: number;
			isCorrect: boolean;
		}[]
	) => {
		try {
			const userId = await getUserId();
			const response = await fetch(`${apiUrl}/api/users/${userId}/testResults`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ results }),
			});
			if (!response.ok) {
				throw new Error('Failed to save test results');
			}
			const data = await response.json();
			console.log('Test results saved:', data);
		} catch (error) {
			console.error('Error saving test results:', error);
		}
	};

	const handleOpenModal = () => setModalOpen(true);
	const handleCloseModal = () => setModalOpen(false);

	return (
		<Box>
			{currentIndex < 10 ? (
				<>
					<PageTitle title="テスト" />
					<WordModal
						open={modalOpen}
						onClose={() => {}}
						word={testWords[currentIndex]}
						setSelectedWord={() => {}}
						handleEditClick={() => {}}
						showDetails={showDetails}
						setShowDetails={setShowDetails}
						setOpenDelteConfirm={() => {}}
						vocabularies={testWords}
						setVocabularies={setTestWords}
						setFlashMessage={setFlashMessage}
						isTestMode={true}
						handleTestAnswer={handleTestAnswer}
					/>
					<Snackbar open={!!flashMessage} autoHideDuration={3000} onClose={() => setFlashMessage(null)}>
						<Alert onClose={() => setFlashMessage(null)} severity="success" sx={{ width: '100%' }}>
							{flashMessage}
						</Alert>
					</Snackbar>
				</>
			) : (
				<Box>
					{/* レイアウト調整 */}
					<PageTitle title="テスト結果" />
					{results.map((result, index) => (
						<Typography key={index} variant="body1">
							{testWords[index].word}: {result.isCorrect ? '◯' : '✖️'}
						</Typography>
					))}
				</Box>
			)}
		</Box>
	);
}
