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
				<CardContent>
					<Box display="flex" justifyContent="center" alignItems="center">
						<Box sx={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
							{word.memorized && <CheckIcon sx={{ color: 'green' }} />}
						</Box>
						<Box sx={{ wordBreak: 'break-word', textAlign: 'center' }}>{word.word}</Box>
					</Box>
					{/* <Typography variant="body2">最終更新日: {word.updatedAt}</Typography>
							<Typography variant="body2">登録日: {word.createdAt}</Typography> */}
				</CardContent>
			</Card>
		</Box>
	);
};

export default Word;
