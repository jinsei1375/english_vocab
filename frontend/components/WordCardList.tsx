import React from 'react';
import { Box } from '@mui/material';
import { WordType } from '@/types';

import WordCard from './WordCard';

interface WordCardListProps {
	words: WordType[];
	handleClick: (word: WordType) => void;
}

const WordList: React.FC<WordCardListProps> = ({ words, handleClick }) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: {
					sm: '1fr',
					md: '1fr 1fr',
					lg: '1fr 1fr 1fr',
				},
				gap: 2,
				width: '100%',
				maxWidth: '1200px',
				margin: 'auto',
			}}
		>
			{words.map((word) => (
				<WordCard key={word.id} word={word} handleClick={handleClick}></WordCard>
			))}
		</Box>
	);
};

export default WordList;
