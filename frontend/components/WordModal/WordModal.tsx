import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from '@mui/material';
import { WordType } from '@/types';
import Link from 'next/link';
import CheckIcon from '@mui/icons-material/Check';
import './WordModal.css';

interface WordModalProps {
	open: boolean;
	onClose: () => void;
	word: WordType | null;
	setSelectedWord: React.Dispatch<React.SetStateAction<WordType | null>>;
	handleMemorizedClick: (word: WordType) => void;
	handleEditClick: () => void;
	showDetails: boolean;
	setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const WordModal: React.FC<WordModalProps> = ({
	open,
	onClose,
	word,
	setSelectedWord,
	handleMemorizedClick,
	handleEditClick,
	showDetails,
	setShowDetails,
}) => {
	const handleClose = () => {
		setShowDetails(false);
		setSelectedWord(null);
		onClose();
	};

	const handleUpdateMemorized = (word: WordType) => {
		handleMemorizedClick(word);
	};
	if (!word) return null;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					minWidth: '400px',
					minHeight: '200px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					backgroundColor: 'transparent',
				}, // Paperコンポーネントにスタイルを適用
			}}
		>
			<DialogContent>
				<Box className={`card ${showDetails ? 'is-flipped' : ''}`}>
					<Box className={`card-inner`}>
						<Box
							className={`card-element ${showDetails ? 'is-flipped' : ''}`}
							sx={{ backgroundColor: 'white' }}
						>
							{!showDetails ? (
								<Box className="card-front-element" sx={{ backgroundColor: 'white', minHeight: '300px' }}>
									<DialogTitle sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
										<Box display="flex" justifyContent="center" alignItems="center">
											<Box sx={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
												{word.memorized && <CheckIcon sx={{ color: 'green' }} />}
											</Box>
											<Box sx={{ flexGrow: 1, wordBreak: 'break-word', textAlign: 'center' }}>{word.word}</Box>
										</Box>
									</DialogTitle>
									<Box display="flex" justifyContent="center">
										<Button onClick={handleClose}>閉じる</Button>
										<Button onClick={() => setShowDetails(true)}>訳をみる</Button>
									</Box>
								</Box>
							) : (
								<Box className={`card-back-element`} sx={{ padding: '20px' }}>
									<DialogTitle sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
										<Box display="flex" justifyContent="center" alignItems="center">
											<Box sx={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
												{word.memorized && <CheckIcon sx={{ color: 'green' }} />}
											</Box>
											<Box sx={{ flexGrow: 1, wordBreak: 'break-word', textAlign: 'center' }}>{word.word}</Box>
										</Box>
									</DialogTitle>
									<Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
										意味: {word.meaning}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										品詞: {word.partOfSpeechId}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										発音記号: {word.pronunciation}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										例文: {word.exampleSentence}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										類義語: {word.synonyms}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										対義語: {word.antonyms}
									</Typography>
									{word.url && (
										<Typography variant="body2" color="text.secondary">
											URL:{' '}
											<Link href={word.url} passHref>
												<a target="_blank" rel="noopener noreferrer">
													{word.url}
												</a>
											</Link>
										</Typography>
									)}
									<Box display="flex" justifyContent="center" mb={1}>
										<Button color="primary" onClick={() => handleUpdateMemorized(word)}>
											{word.memorized ? 'チェック外す' : '覚えた'}
										</Button>
										<Button color="primary" onClick={handleEditClick}>
											編集する
										</Button>
									</Box>
									<Box display="flex" justifyContent="center">
										<Button onClick={handleClose}>閉じる</Button>
										<Button onClick={() => setShowDetails(false)}>戻る</Button>
									</Box>
								</Box>
							)}
						</Box>
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default WordModal;
