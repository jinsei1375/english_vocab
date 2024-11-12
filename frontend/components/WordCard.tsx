import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { WordType } from '@/types';
import CheckIcon from '@mui/icons-material/Check';

interface WordCardProps {
	word: WordType;
	handleClick: (
		word: WordType | null,
		setSelectedWord: Dispatch<SetStateAction<WordType | null>>,
		setModalOpen: Dispatch<SetStateAction<boolean>>
	) => void;
	setSelectedWord: Dispatch<SetStateAction<WordType | null>>;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Word: React.FC<WordCardProps> = ({ word, handleClick, setSelectedWord, setModalOpen }) => {
	return (
		<Box
			key={word.id}
			sx={{ width: '100%', margin: '0', cursor: 'pointer' }}
			onClick={() => handleClick(word, setSelectedWord, setModalOpen)}
		>
			<Card sx={{ margin: '0', backgroundColor: 'white', color: '#333' }}>
				<CardContent sx={{ paddingBottom: '16px !important' }}>
					<Box display="flex" justifyContent="center" alignItems="center">
						<Box sx={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
							{word.memorized && <CheckIcon sx={{ color: 'green' }} />}
						</Box>
						<Box
							sx={{
								wordBreak: 'break-word',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 1, // 2行でテキストを省略
							}}
						>
							{word.word}
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Word;
