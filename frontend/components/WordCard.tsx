import React from 'react';
import { TableRow, TableCell, Card, CardContent, Box } from '@mui/material';
import { WordType } from '@/types';
import CheckIcon from '@mui/icons-material/Check';
import { formatDate } from '@/utils/formatDate';

interface WordCardProps {
	word: WordType;
	handleClick: (word: WordType) => void;
}

const Word: React.FC<WordCardProps> = ({ word, handleClick }) => {
	const handleCardClick = () => {
		handleClick(word);
	};
	return (
		<Box
			key={word.id}
			sx={{ width: '100%', margin: '0px', cursor: 'pointer' }}
			onClick={handleCardClick}
		>
			<Card sx={{ margin: '8px', backgroundColor: 'white', color: '#333' }}>
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
