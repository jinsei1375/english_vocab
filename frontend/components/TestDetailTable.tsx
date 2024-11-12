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
import { updateMemorizedStatus } from '@/utils/vocabulary';
import { showFlashMessage } from '@/utils/flashMessage';
import { handleCloseModal, handleEditClick, handleWordClick } from '@/utils/modal';

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

	// 共通処理はまとめる1

	// 覚えたボタンをクリック
	const handleMemorizedClick = async (word: WordType) => {
		try {
			const updatedWord = await updateMemorizedStatus(word);

			// 更新された単語をローカルの状態に反映
			const updatedVocabularies = vocabularies.map((vocabulary) =>
				vocabulary.id === updatedWord.id ? updatedWord : vocabulary
			);
			setVocabularies(updatedVocabularies);
			setSelectedWord(updatedWord);
			// フラッシュメッセージを表示
			showFlashMessage('覚えたステータスを更新しました', setFlashMessage);
		} catch {
			throw new Error('Failed to update memorized status');
		}
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
										onClick={() => handleWordClick(result.vocabulary, setSelectedWord, setModalOpen)}
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
				onClose={() =>
					handleCloseModal(
						setOpenForm,
						setModalOpen,
						setSelectedWord,
						setShowDetails,
						setOpenDelteConfirm
					)
				}
				word={selectedWord}
				setSelectedWord={setSelectedWord}
				handleMemorizedClick={handleMemorizedClick}
				handleEditClick={() => handleEditClick(setOpenForm)}
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
