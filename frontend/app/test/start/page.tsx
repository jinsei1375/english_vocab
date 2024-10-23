'use client';

import PageTitle from '@/components/PageTitle';
import WordModal from '@/components/WordModal/WordModal';
import { WordType } from '@/types';
import { getUserId } from '@/utils/auth';
import { useEffect, useState } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Start() {
	const [testWords, setTestWords] = useState<WordType[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [results, setResults] = useState<{ wordId: number; isCorrect: boolean }[]>([]);
	const [modalOpen, setModalOpen] = useState(true);
	const [showDetails, setShowDetails] = useState(false);

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
			console.log(results);
		}
	};

	const handleOpenModal = () => setModalOpen(true);
	const handleCloseModal = () => setModalOpen(false);

	return (
		<>
			<PageTitle title="テスト" />
			<WordModal
				open={modalOpen}
				onClose={() => {}}
				word={testWords[currentIndex]}
				setSelectedWord={() => {}}
				handleMemorizedClick={() => {}}
				handleEditClick={() => {}}
				showDetails={showDetails}
				setShowDetails={setShowDetails}
				setOpenDelteConfirm={() => {}}
				vocabularies={testWords}
				isTestMode={true}
				handleTestAnswer={handleTestAnswer}
			/>
		</>
	);
}
