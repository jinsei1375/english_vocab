import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from '@mui/material';
import { WordType } from '@/types';
import Link from 'next/link';
import CheckIcon from '@mui/icons-material/Check';

interface WordModalProps {
	open: boolean;
	onClose: () => void;
	word: WordType | null;
	handleMemorizedClick: (word: WordType) => void;
}

const WordModal: React.FC<WordModalProps> = ({ open, onClose, word, handleMemorizedClick }) => {
	const [showDetails, setShowDetails] = useState(false);

	const handleClose = () => {
		setShowDetails(false);
		onClose();
	};

	const handleUpdateMemorized = (word: WordType) => {
		handleMemorizedClick(word);
		handleClose();
	};
	if (!word) return null;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: { minWidth: '400px' }, // Paperコンポーネントにスタイルを適用
			}}
		>
			<DialogTitle sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
				{word.memorized && <CheckIcon sx={{ color: 'green' }} />}
				{word.word}
			</DialogTitle>
			<DialogContent>
				{showDetails ? (
					<>
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
						</Box>
						<Box display="flex" justifyContent="center">
							<Button onClick={handleClose}>閉じる</Button>
							<Button onClick={() => setShowDetails(false)}>戻る</Button>
						</Box>
					</>
				) : (
					<Box display="flex" justifyContent="center" gap={2}>
						<Button onClick={handleClose}>閉じる</Button>
						<Button onClick={() => setShowDetails(true)}>訳をみる</Button>
					</Box>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default WordModal;
