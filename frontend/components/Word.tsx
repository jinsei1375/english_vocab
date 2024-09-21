import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { WordType } from '@/types';
import CheckIcon from '@mui/icons-material/Check';
import { formatDate } from '@/utils/formatDate';

interface WordProps {
	word: WordType;
	handleClick: (word: WordType) => void;
}

const Word: React.FC<WordProps> = ({ word, handleClick }) => {
	return (
		<TableRow
			key={word.id}
			sx={{
				boxSizing: 'border-box',
				cursor: 'pointer',
				color: 'white',
			}}
			onClick={() => handleClick(word)}
		>
			<TableCell>{word.memorized && <CheckIcon sx={{ color: 'green' }} />}</TableCell>
			<TableCell
				sx={{
					color: 'white',
					maxWidth: '300px',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}
			>
				{word.word}
			</TableCell>
			<TableCell sx={{ color: 'white' }}>{formatDate(word.updatedAt)}</TableCell>
			<TableCell sx={{ color: 'white' }}>{formatDate(word.createdAt)}</TableCell>
		</TableRow>
	);
};

export default Word;
