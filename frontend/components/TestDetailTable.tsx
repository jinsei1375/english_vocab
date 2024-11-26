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
import { handleCloseModal, handleEditClick, handleWordClick } from '@/utils/modal';
import WordFormDialog from './WordFormDialog';
import { getUserId } from '@/utils/auth';
import { showFlashMessage } from '@/utils/flashMessage';

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

	// 新しい単語を追加→編集時の処理
	const handleAddOrEditWord = async (newWord: WordType) => {
		try {
			const userId = await getUserId();
			const isEdit = newWord.id ? true : false;
			const url = isEdit ? `${apiUrl}/api/vocabularies/${newWord.id}` : `${apiUrl}/api/vocabularies`;
			const method = isEdit ? 'PUT' : 'POST';
			const response = await fetch(url, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...newWord, userId }),
			});
			if (!response.ok) {
				throw new Error('Failed to add vocabulary');
			}
			const addedOrUpdateWord = await response.json();

			if (isEdit) {
				setVocabularies(
					vocabularies.map((vocabulary) =>
						vocabulary.id === addedOrUpdateWord.id ? addedOrUpdateWord : vocabulary
					)
				);
			} else {
				setVocabularies([addedOrUpdateWord, ...vocabularies]);
			}

			// フラッシュメッセージを表示
			const message = isEdit ? '単語が更新されました' : '単語が追加されました';
			showFlashMessage(message, setFlashMessage);
		} catch {
			throw new Error('Failed to add vocabulary');
		}
		handleCloseModal(setOpenForm, setModalOpen, setSelectedWord, setShowDetails, setOpenDelteConfirm);
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
				handleEditClick={() => handleEditClick(setOpenForm)}
				showDetails={showDetails}
				setShowDetails={setShowDetails}
				setOpenDelteConfirm={setOpenDelteConfirm}
				setVocabularies={setVocabularies}
				setFlashMessage={setFlashMessage}
				vocabularies={vocabularies}
			/>
			<WordFormDialog
				open={openForm}
				onClose={() =>
					handleCloseModal(
						setOpenForm,
						setModalOpen,
						setSelectedWord,
						setShowDetails,
						setOpenDelteConfirm
					)
				}
				onAddWord={handleAddOrEditWord}
				initialWord={selectedWord}
			/>
			<Snackbar open={!!flashMessage} autoHideDuration={3000} onClose={() => setFlashMessage(null)}>
				<Alert onClose={() => setFlashMessage(null)} severity="success" sx={{ width: '100%' }}>
					{flashMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
