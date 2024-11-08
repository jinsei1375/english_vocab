'use client';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Paper,
	Snackbar,
	Alert,
} from '@mui/material';
import WordModal from './WordModal/WordModal';
import { useEffect, useState } from 'react';
import { WordType } from '@/types';

interface TestDetailTableProps {
	testHistory: any;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function TestDetailTable({ testHistory }: TestDetailTableProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const [openForm, setOpenForm] = useState(false);
	const [vocabularies, setVocabularies] = useState<WordType[]>([]);
	const [selectedWord, setSelectedWord] = useState<WordType | null>(null);
	const [flashMessage, setFlashMessage] = useState<string | null>(null);
	const [showDetails, setShowDetails] = useState(false);
	const [openDeleteConfirm, setOpenDelteConfirm] = useState(false);

	useEffect(() => {
		if (testHistory && testHistory.testResults) {
			const vocabularies = testHistory.testResults.map((result: any) => result.vocabulary);
			setVocabularies(vocabularies);
		}
	}, [testHistory]);

	// 覚えたボタンをクリック
	const handleMemorizedClick = async (word: WordType) => {
		try {
			const response = await fetch(`${apiUrl}/api/vocabularies/${word.id}/memorized`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ memorized: !word.memorized }),
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
		} catch {
			throw new Error('Failed to update memorized status');
		}
	};

	// 詳細をクリック
	const handleClick = (word: WordType) => {
		setSelectedWord(word);
		setModalOpen(true);
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
		setOpenDelteConfirm(false);
	};

	return (
		<>
			<TableContainer component={Paper} sx={{ maxWidth: '700px', margin: '0 auto' }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>番号</TableCell>
							<TableCell>単語</TableCell>
							<TableCell>正解/不正解</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{testHistory.testResults.map((result: any, index: number) => (
							<TableRow key={result.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{result.vocabulary.word}</TableCell>
								<TableCell>{result.isCorrect ? '◯' : '✖️'}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color="primary"
										sx={{ height: '40px' }}
										component="a"
										onClick={() => handleClick(result.vocabulary)}
									>
										詳細
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<WordModal
				open={modalOpen}
				onClose={handleCloseModal}
				word={selectedWord}
				setSelectedWord={setSelectedWord}
				handleMemorizedClick={handleMemorizedClick}
				handleEditClick={handleEditClick}
				showDetails={showDetails}
				setShowDetails={setShowDetails}
				setOpenDelteConfirm={setOpenDelteConfirm}
				vocabularies={vocabularies}
			/>
			<Snackbar open={!!flashMessage} autoHideDuration={3000} onClose={() => setFlashMessage(null)}>
				<Alert onClose={() => setFlashMessage(null)} severity="success" sx={{ width: '100%' }}>
					{flashMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
