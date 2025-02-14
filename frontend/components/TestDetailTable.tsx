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
import { addOrEditVocabulary } from '@/utils/vocabulary';
import { getUserId } from '@/utils/auth';
import { getUserSettings } from '@/utils/userSettings';

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
	const [userSettings, setUserSettings] = useState<Record<string, boolean>>({});
	const [userId, setUserId] = useState<number | null>(null);

	useEffect(() => {
		const fetchUserId = async () => {
			const id = await getUserId();
			setUserId(id);
		};
		fetchUserId();
	}, []);

	useEffect(() => {
		const fetchSettings = async () => {
			if (userId !== null) {
				try {
					const settings = await getUserSettings(userId);
					setUserSettings(settings);
				} catch {
					throw new Error('Failed to fetch user settings');
				}
			}
		};
		fetchSettings();
	}, [userId]);

	useEffect(() => {
		if (testHistory && testHistory.testResults) {
			const vocabularies = testHistory.testResults.map((result: any) => result.vocabulary);
			setVocabularies(vocabularies);
		}
	}, [testHistory]);

	// 新しい単語を追加→編集時の処理
	const handleAddOrEditWord = async (newWord: WordType) => {
		addOrEditVocabulary(newWord, vocabularies, setVocabularies, setFlashMessage);
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
				userSettings={userSettings}
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
				userSettings={userSettings}
			/>
			<Snackbar open={!!flashMessage} autoHideDuration={3000} onClose={() => setFlashMessage(null)}>
				<Alert onClose={() => setFlashMessage(null)} severity="success" sx={{ width: '100%' }}>
					{flashMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
